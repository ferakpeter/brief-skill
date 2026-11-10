# Install

Pick your agent below. Not listed? Ask your agent to install
[`skills/brief/SKILL.md`](skills/brief/SKILL.md) as a skill. Which files map to which agent:
[Agent portability](docs/agent-portability.md).

`ferakpeter/brief-skill` below is the GitHub repository this folder is published as. Replace
`ferakpeter` with that account.

Nothing here runs code on your machine: there are no lifecycle hooks, only one skill. No Node,
Python or anything else is needed to use it. Every install is skill tier only; there is no
always-on rules file, because `/brief` is meant to be asked for.

## Claude Code

```
/plugin marketplace add ferakpeter/brief-skill
```
```
/plugin install brief@brief
```

Send them as two separate prompts. The plugin skill runs as `/brief:brief <request>`. For the bare
`/brief`, copy it instead: `cp -r skills/brief ~/.claude/skills/`. The Claude Code Desktop app's
Code tab takes the same two commands. CodeBuddy reads the same Claude manifests.

## Codex

```bash
codex plugin marketplace add ferakpeter/brief-skill
codex plugin add brief@brief
```

Start a new thread. The same install covers the Codex desktop app after a restart.

## GitHub Copilot CLI

```bash
copilot plugin marketplace add ferakpeter/brief-skill
copilot plugin install brief@brief
```

## Gemini CLI

```bash
gemini extensions install https://github.com/ferakpeter/brief-skill
```

Qwen Code installs the same extension: `qwen extensions install ferakpeter/brief-skill:brief`.

## Devin CLI

```bash
devin plugins install ferakpeter/brief-skill
```

The skill is available as `/brief:brief`.

## Kimi Code

Run `/plugins install https://github.com/ferakpeter/brief-skill`, then `/reload` or start a new
session. The skill doubles as `/brief`.

## Qoder

`qodercli plugins install <path-to-checkout>`.

## Grok Build

```bash
grok plugin install ferakpeter/brief-skill --trust
```

Enable it (off by default) in `/plugins`, or in `~/.grok/config.toml`:

```toml
[plugins]
enabled = ["brief"]
```

Start a new session and verify with `grok inspect`.

## Antigravity CLI

```bash
agy plugin install https://github.com/ferakpeter/brief-skill
```

## Goose

```bash
goose plugin install https://github.com/ferakpeter/brief-skill.git
```

Imports the skill as `brief:brief`.

## Hermes Agent

```bash
hermes plugins install ferakpeter/brief-skill --enable
```

If the install check refuses the manifest, clone it in by hand; Hermes loads it from `plugin.yaml`:

```bash
git clone https://github.com/ferakpeter/brief-skill.git ~/.hermes/plugins/brief
hermes plugins enable brief
```

Restart Hermes. The skill registers as `brief:brief`.

## Pi agent harness and Oh My Pi

```bash
pi install git:github.com/ferakpeter/brief-skill
```

Pi reads the `pi.skills` key in `package.json`. omp installs through the Claude marketplace:
`omp plugin marketplace add ferakpeter/brief-skill`, then `omp plugin install brief@brief`.

## OpenClaw

Copy [`.openclaw/skills/brief`](.openclaw/skills/) into `~/.openclaw/skills/`. That copy is
generated from `skills/` with a one-line description, as OpenClaw requires.

## OpenCode, Kilo Code, Kiro, Factory Droid and other skill-folder agents

Copy `skills/brief/` into `.agents/skills/` (project) or `~/.agents/skills/` (global). Kiro:
`~/.kiro/skills/`.

## Skills CLI

The [skills CLI](https://skills.sh) copies the skill into the skills folder of many agents:

```bash
npx skills add ferakpeter/brief-skill
```

Pick the agent with `--agent`, and add `--global` to install for your user instead of the project.

## Uninstall

| Host | Command |
|------|---------|
| Claude Code | `/plugin remove brief` |
| Codex | `codex plugin remove brief` |
| Devin CLI | `devin plugins remove brief` |
| Grok Build | `grok plugin uninstall brief` |
| Pi agent | `pi uninstall brief` |
| Kimi Code | `/plugins` in Kimi Code, then remove brief |
| Skills CLI | `npx skills remove brief` (same `--agent` / `--global` flags as the install) |
| Copied skill folder | Delete the copied folder |

Nothing is written outside the plugin's own files, so there is nothing else to clean up.
