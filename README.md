<h1 align="center">Brief</h1>

<p align="center">
  <em>Say it in one sentence. Review the brief. Approve it. Then it gets built.</em>
</p>

---

`/brief` is a skill for AI coding agents. It turns a short request into a grounded engineering
brief, has a subagent critique it, shows it to you with the open questions first, and carries it
out only after you press **Send**. Nothing is edited and nothing with side effects runs before
that.

## How it works

1. **Ground:** reads only what the request touches, records facts as `file:line`.
2. **Draft:** Goal, Context, Do, Don't, Done when, Open questions. Guesses go under Open questions, never into the plan.
3. **Critique:** one cheap subagent looks for invented requirements, unsourced claims, silent decisions, padding and ambiguity. One revision.
4. **Gate:** you see your request verbatim, the open questions, then the brief. **Send**, **Edit** or **Cancel**.
5. **Send:** only now is the brief carried out.

## Use it

```
/brief add retry with backoff to the upload client
/brief the settings screen loses its scroll position on rotate
```

The skill is invoked only when you type `/brief`; the agent never starts it on its own.

## Install

`ferakpeter/brief-skill` is the GitHub repository this folder is published as. Replace `ferakpeter`
with the account you publish it under.

**Claude Code**, as two separate prompts:

```
/plugin marketplace add ferakpeter/brief-skill
```
```
/plugin install brief@brief
```

Then run it as `/brief:brief <request>`. To get the bare `/brief`, copy the skill instead:
`cp -r skills/brief ~/.claude/skills/`.

**Codex:**

```bash
codex plugin marketplace add ferakpeter/brief-skill
codex plugin add brief@brief
```

**Gemini CLI:**

```bash
gemini extensions install https://github.com/ferakpeter/brief-skill
```

**Any other agent:** ask it to install [`skills/brief/SKILL.md`](skills/brief/SKILL.md) as a
skill. Step by step for Copilot, Devin, Kimi, Qoder, Grok, Goose, Hermes, Pi, OpenClaw and the
rest: **[INSTALL.md](INSTALL.md)**. Which file serves which agent:
[docs/agent-portability.md](docs/agent-portability.md).

## Host requirements

The skill is written for Claude Code. Step 3 spawns a subagent (`Agent` tool, `haiku` model) and
step 4 asks with `AskUserQuestion`. On a host without those tools the agent has to do the
critique itself and ask the gate question in plain text; the order of steps still holds.
`disable-model-invocation` is a Claude Code frontmatter key; hosts that ignore it may offer the
skill to the model automatically.

## Contributing

Edit `skills/brief/SKILL.md`, never a copy. Then:

```bash
node scripts/build-adapters.js            # regenerate the OpenClaw copy
node scripts/build-adapters.js --check    # what CI runs: fails on a stale copy or a version mismatch
```

## FAQ

**Does it run anything on my machine?**
No. No hooks and no scripts at runtime: one skill. Node is only for regenerating the OpenClaw copy.

**Why no always-on rules file?**
`/brief` is something you ask for. An `AGENTS.md` or rules-file adapter would load it on every
turn, which is the opposite of the point.
