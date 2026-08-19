# Pi Coding Agent Configuration
Harness configs (i.e. AGENTS.md, extensions, skills) and models for my Pi Coding Agent setup

## Installation
Clone or copy this repo to ~/.pi, or wherever your Pi config lives. Uses ENV variables for authentication, giving the agent API keys for various providers. The keys must be available to the agent in the environment it is running in. For example, they must be passed through to a docker or podman container if the agent is sandboxed in that way.
See [the pi docs on providers](https://pi.dev/docs/latest/providers#api-keys) for more details.

I use this configuration in conjunction with my [pi-coding-agent-sandbox repo](https://github.com/ajlardner/pi-coding-agent-sandbox).

## Models I Use
- Anthropic Claude
    - Fable 5
    - Opus 5
- DeepSeek
    - DeepSeek v4 Flash
    - DeepSeek v4 Pro
- Z.AI GLM
    - GLM 5.2
    - GLM 5.3
- Moonshot Kimi
    - Kimi K3

## LLM Disclaimer
This project uses LLM/AI-assisted development tools. See my [LLM usage policy](https://github.com/ajlardner/llm-policy) for details.

### LLM Tools Used
- [Pi Coding Agent](https://github.com/ajlardner/pi-coding-agent-config/)
