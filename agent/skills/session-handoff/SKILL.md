---
name: session-handoff
description: Create a concise, accurate handoff for any paused conversation or task, preserving decisions, progress, open questions, and important web sources for a later session.
---

# Session handoff

When asked for a handoff or invoked as `/skill:session-handoff`:

1. Review the available conversation and, only if needed, inspect accessible material using read-only tools. Do not assume access to past sessions, files, or systems not visible here. Do not change anything just to make the handoff.
2. Write a self-contained, copyable handoff covering the user's goal and boundaries; relevant background; decisions and reasons; work completed and its observed results; unresolved questions or limitations; and the next useful action, if any. Include technical environment, paths, commands, or recovery details only when relevant.
3. Clearly distinguish observed facts, user reports, sourced claims, and untested ideas. Say who did what when that matters. Do not invent missing context or imply that suggestions were carried out.
4. Include a short **Sources** section with the URLs of important pages actually opened or fetched during the session (including via web-search/web-fetch extensions). For each, give a title or purpose and the key point it supports. Distinguish fetched pages from search results that were only listed; do not present an unfetched result as read or verified. If the browsing history is unavailable, say so rather than guessing URLs. Omit irrelevant links.
5. Do not include credentials, tokens, private keys, or sensitive URLs (including query parameters containing secrets). Avoid unnecessary personal or identifying details. Never ask the user to print secrets.
6. Prefer putting the handoff in the reply. Write to a file only if requested, identifying where that file lives. Keep it concise enough to paste into a new session; avoid a long plan unless requested.
