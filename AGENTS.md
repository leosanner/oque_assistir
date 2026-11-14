# AGENTS.md

This repository contains no product code. It defines the **standard AI-assisted development workflow** (skills, rules, and decisions) that other repositories copy or reference. The workflow itself is described in [docs/dev/workflow.md](./docs/dev/workflow.md).

`AGENTS.md` is the source of truth for agent instructions.

## Structure

- `.agents/skills/`: one folder per skill, each with a `SKILL.md` (frontmatter with `name` and `description`) and an `agents/openai.yaml` for Codex. This is the directory read by harnesses that follow the `.agents` convention (e.g. Codex).
- `.claude/skills`: symlink to `../.agents/skills` so Claude Code sees the same skills. Do not create files inside it directly.
- `.agents/rules/`: rules every agent must follow when working in a repository that uses this workflow. Read all of them before writing code, commits, or PRs.
- `docs/dev/workflow.md`: the development workflow, step by step.
- `docs/agents/`: configuration the skills read (issue tracker, domain docs).
- `docs/adr/`: decisions about the workflow itself, numbered (`0001-title.md`).

## Conventions

- All content in this repository is written in English.
- One skill per folder, kebab-case name matching the frontmatter `name`.
- Third-party skills keep their original content. Their origin (repo and commit) and every local change are recorded in `.agents/skills/SOURCES.md`.
- When adding, renaming, or removing a skill, update the list in `README.md` and, if it changes the flow, `docs/dev/workflow.md`.
- Changes in workflow direction become an ADR in `docs/adr/`.

## Agent skills

### Issue tracker

GitHub Issues via `gh`, one milestone per spec. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: `GLOSSARY.md` at the root and ADRs in `docs/adr/`. See `docs/agents/domain.md`.

### Rules

Follow every file in `.agents/rules/`.
