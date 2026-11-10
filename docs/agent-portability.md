# Agent Portability

This repo is one skill distributed to many agents. The skill in `skills/brief/` holds the
behavior; every host-specific file is a thin adapter that loads it.

## One source

`skills/brief/SKILL.md` is the only source. `node scripts/build-adapters.js` writes the one copy,
`.openclaw/skills/brief/SKILL.md`, with a one-line description. `--check` writes nothing and fails
when that copy is stale or the manifest versions disagree; CI runs it on every push and pull
request.

There is deliberately no `AGENTS.md` and no generated rules file (Cursor, Windsurf, Cline,
Copilot Chat, Kiro steering). Those load on every turn, and `/brief` is meant to be asked for.

## Supported adapters

| Host | Files |
|---|---|
| Claude Code, CodeBuddy | `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `skills/` |
| Codex | `.codex-plugin/plugin.json`, `skills/` |
| GitHub Copilot CLI | `.github/plugin/`, `skills/` |
| Gemini CLI, Qwen Code | `gemini-extension.json`, `skills/` |
| Devin CLI | `.devin-plugin/plugin.json`, `skills/` |
| Kimi Code | `.kimi-plugin/plugin.json`, `skills/` |
| Qoder | `.qoder-plugin/plugin.json`, `skills/` |
| Grok Build | root `plugin.json`, `.grok-plugin/marketplace.json`, `skills/` |
| Antigravity CLI, Goose | root `plugin.json`, `skills/` |
| Hermes Agent | `plugin.yaml`, `__init__.py`, `skills/` |
| Pi, Oh My Pi | `package.json` (`pi.skills`), `.claude-plugin/marketplace.json` |
| OpenClaw | `.openclaw/skills/` |
| Skills CLI, OpenCode, Kilo Code, Kiro, Factory Droid | `skills/` |

## Adapter rule

Keep adapters thin: each one points at `skills/`. Change the rules in `SKILL.md`, then run the
build.

## Releasing

Bump `version` in every file `scripts/build-adapters.js` lists in `VERSION_FILES` to the same
`X.Y.Z`, run `node scripts/build-adapters.js`, and commit the result.
