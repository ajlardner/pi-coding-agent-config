import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import TurndownService from 'turndown';
import { tables, strikethrough } from 'turndown-plugin-gfm';

// Exercise the private implementation without loading Pi or adding a public API.
const source = readFileSync(new URL('../web.ts', import.meta.url), 'utf8');
const converterSource = source.slice(source.indexOf('function htmlToMarkdown('), source.indexOf('// ---------- GitHub'))
  .replace('html: string, base: string): string', 'html, base)')
  .replace('target: string | null): string | null', 'target)');
const fetchSource = source.slice(source.indexOf('const contentType = res.headers'), source.indexOf('const truncated = markdown.length'));
const context = vm.createContext({ TurndownService, tables, strikethrough, URL });
vm.runInContext(`${converterSource}\nasync function responseMarkdown(res, params) { ${fetchSource} return markdown; }`, context);
const md = (html) => context.htmlToMarkdown(html, 'https://example.org/articles/page');

test('headings, formatting, decoded relative URLs and images', () => {
  assert.equal(md(`<h2>Title</h2><p><strong>Bold</strong> <em>italic</em> <a href='../guide?a=1&amp;b=2'>Guide</a> <img src='/photo.png' alt='photo'></p>`),
    '## Title\n\n**Bold** _italic_ [Guide](https://example.org/guide?a=1&b=2) ![photo](https://example.org/photo.png)');
});

test('ordered and nested lists retain structure', () => {
  const output = md('<ol start="3"><li>Third<ul><li>Nested<ol><li>Deep</li></ol></li></ul></li><li>Fourth</li></ol>');
  assert.match(output, /^3\.\s+Third/m);
  assert.match(output, /^\s+-\s+Nested/m);
  assert.match(output, /^\s+1\.\s+Deep/m);
  assert.match(output, /^4\.\s+Fourth/m);
});

test('pre blocks preserve entities, backticks, indentation and blank lines', () => {
  const code = '  <tag>\n\n\n\tvalue  \n```\n';
  assert.equal(md(`<pre><code class="language-html">${code.replace('<tag>', '&lt;tag&gt;')}</code></pre>`),
    `\`\`\`\`html\n${code}\`\`\`\``);
  assert.equal(md('<pre>  one\n\n\n  two  </pre>'), '```\n  one\n\n\n  two  \n```');
});

test('tables use structural GFM, including headerless, uneven and malformed tables', () => {
  assert.equal(md('<table><tr><th>Name</th><th>Value</th></tr><tr><td><b>A</b></td><td>B|C</td></tr></table>'),
    '| Name | Value |\n| --- | --- |\n| **A** | B\\|C |');
  assert.equal(md('<table><tr><td>A<td>B<tr><td>C</table>'),
    '|  |  |\n| --- | --- |\n| A | B |\n| C |  |');
  assert.equal(md('<table></table>'), '');
});

test('strikethrough and removal of non-content, but not header/aside', () => {
  const unwanted = ['script', 'style', 'noscript', 'svg', 'template', 'head', 'iframe', 'nav']
    .map(tag => `<${tag}>unwanted</${tag}>`).join('');
  const output = md(`${unwanted}<header>Heading text</header><aside>Article text</aside><p><del>old</del></p>`);
  assert.doesNotMatch(output, /unwanted/);
  assert.match(output, /Heading text/);
  assert.match(output, /Article text/);
  assert.match(output, /~~old~~/);
});

test('unsafe and irrelevant link schemes retain text only', () => {
  for (const target of ['javascript:alert(1)', 'java&#x73;cript:alert(1)', 'java&#10;script:alert(1)', 'data:text/html,no', 'vbscript:no', 'mailto:a@example.org', 'tel:123']) {
    assert.equal(md(`<a href='${target}'>label</a>`), 'label');
  }
  assert.equal(md('<img src="data:image/png,no" alt="label">'), 'label');
  assert.doesNotThrow(() => md('<p>&#999999999999; &#x110000; &#0; &amp;</p>'));
});

test('actual fetch conversion branch detects fragments/documents and preserves plain markdown', async () => {
  const response = (body, type) => ({ url: 'https://redirect.example/final/page', headers: { get: () => type }, text: async () => body });
  const fetchMarkdown = (body, type) => context.responseMarkdown(response(body, type), { url: 'https://original.example/' });
  assert.equal(await fetchMarkdown('<p><a href="next">Next</a></p>', 'text/html; charset=utf-8'),
    '[Next](https://redirect.example/final/next)');
  assert.equal(await fetchMarkdown('<p>fragment</p>', 'application/xhtml+xml'), 'fragment');
  for (const type of ['', 'text/plain']) {
    assert.equal(await fetchMarkdown('\ufeff  <!DOCTYPE html><html><body><h1>Title</h1></body></html>', type), '# Title');
    assert.equal(await fetchMarkdown('<html><body><p>document</p></body></html>', type), 'document');
  }
  const plain = '# Markdown\n\n<code>leave it</code>\n\n\n  spaces  \n';
  assert.equal(await fetchMarkdown(plain, 'text/plain'), plain);
  assert.equal(await fetchMarkdown('<p>not a document</p>', 'text/plain'), '<p>not a document</p>');
});
