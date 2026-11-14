---
name: document-feature
description: "Document what was just implemented in `docs/features/`: one folder per feature with a README, technical notes, Mermaid diagrams, concrete examples, and a CHANGELOG tracing every change to its spec and tickets. Use at the end of an implementation, after code-review, once the operator confirms; or when the user asks to document a feature."
---

Update the target repository's feature documentation so it describes the system as it now is, and record which spec and tickets changed it.

The issue tracker should have been provided to you. If not, read `docs/agents/issue-tracker.md`; if it is missing, tell the user the repo is not configured for this workflow (see the dev-workflow repo).

Layout, frontmatter, and templates: [FORMAT.md](./FORMAT.md). Choosing and drawing visuals: [DIAGRAMS.md](./DIAGRAMS.md).

## Process

### 1. Gather what was built

Use both sources; neither is enough alone.

- **Intent**: the spec issue, its milestone, and its tickets. If the user didn't name the spec, infer it from the branch or recent commits (`Closes #n`, `Refs #n`) and confirm.
- **Reality**: the diff since the base, `git diff $(git merge-base HEAD main)...HEAD` (use the integration branch base for `implement-spec`).

When intent and reality disagree, document the code and list the divergence in the final report.

### 2. Read what exists

Read `docs/features/README.md`, every feature folder the change might touch, `GLOSSARY.md`, and the ADRs in the area. If `docs/features/` doesn't exist, create it with its index.

### 3. Map the change to features

Decide which feature folders the work creates or changes. A spec can create one feature, extend several, or add an internal section to one. Name folders in kebab-case using the glossary's vocabulary. State the mapping to the user in one or two lines and continue unless they object.

### 4. Write the docs

- Describe **current behaviour**, not the story of the change. The history goes in `CHANGELOG.md`. Rewrite sections the change made outdated and delete what is no longer true.
- `README.md` is required and `CHANGELOG.md` is required at the feature root. `technical.md` is the usual home for implementation detail. Create any other file or subfolder the feature needs (see FORMAT.md); these are the common ones, not a fixed set.
- Every `README.md` has at least one diagram and one example with concrete data. Use visuals wherever they explain faster than prose (see DIAGRAMS.md).
- Link to ADRs and glossary terms instead of restating them. Reference modules by name; inline code only for contracts (payloads, types, schemas), never implementation.
- Write in the language the repo's docs already use.

### 5. Record the change

- Add an entry at the top of the feature's `CHANGELOG.md`: today's date, spec, milestone, tickets, and what changed for the reader.
- Update the `README.md` frontmatter (`updated`, `spec`, `status`) to match that entry; set `created` only on a new feature.
- Update the row in `docs/features/README.md`.

Do this for every feature folder the work touched.

### 6. Report and commit

Tell the user:

- The files created or changed.
- Divergences between the spec and the code.
- Decisions or terms that look worth recording but aren't in the ADRs or glossary. Suggest `domain-modeling`; don't write them yourself.

Commit to the current branch as `docs(<feature>): <description>`, with the spec and tickets in the footer (`Refs #n`).
