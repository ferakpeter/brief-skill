---
name: brief
description: "Turn a short request into a clear engineering brief, critique it, get the user's approval, and only then carry it out. Use when the user runs /brief with a short sentence."
---

# Brief

Turn the request in `$ARGUMENTS` into a short, workable brief, review it, and run it
only after the user approves. Do not edit code or run anything with side effects
before step 5.

## 1. Ground

Read only what the request touches: the files, symbols and screens it names and their
direct call sites, plus CLAUDE.md if present and `git log --oneline -10`. Record facts
as `file:line`. Do not explore broadly. If something named cannot be found, make it an
open question instead of guessing.

## 2. Draft

Write the brief in this form. Drop any section that would be empty.

- **Goal:** one or two sentences: what changes, and why.
- **Context:** what the code does today, with `file:line`. Facts only.
- **Do:** a short ordered list of concrete changes, in files and behaviors, not code.
- **Don't:** what is out of scope or must stay untouched.
- **Done when:** observable checks, including the tests or commands to run.
- **Open questions:** guesses you made and decisions that belong to the user.

Rules:
- Short, plain sentences. A reader should grasp it in under a minute.
- Every line must change what gets built. Cut padding and generic advice.
- Never invent a requirement the user did not state. Put guesses under Open questions.
- Never make a user-owned decision silently.
- Say what you verified and what you did not.

## 3. Critique

Spawn one subagent (Agent tool, `subagent_type: "general-purpose"`, `model: "haiku"`).
Give it only the original request and the draft. Ask it to list: requirements not in
the original request, claims without a `file:line`, silent decisions, padding, and
ambiguity that would let two engineers build different things. Revise once from its
answer. Stop sooner if it finds nothing.

## 4. Gate

Show the user, in this order: their original request verbatim, the open questions,
then the full brief. Ask with AskUserQuestion: **Send**, **Edit** or **Cancel**, and wait.

- **Edit:** apply the user's notes, then show the gate again.
- **Cancel:** stop. Change nothing.

## 5. Send

Only after **Send**: carry out the brief as the task. If an open question still blocks
the work, ask it instead of assuming.
