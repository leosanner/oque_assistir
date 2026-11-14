# Feature docs live in `docs/features/`, one folder per feature

After implementation, the `document-feature` skill documents the work in `docs/features/<feature>/`: a `README.md` for any reader, usually a `technical.md`, any other file the feature needs, and a `CHANGELOG.md` tying each change to its date, spec, and tickets. Docs describe the current behaviour, with Mermaid diagrams and concrete examples, and the changelog carries the history, so a reader can tell both what a feature does and which work shaped it.

The agent asks the operator to run the skill as soon as it finishes implementing the last ticket of a spec, as a step in `docs/dev/workflow.md`, instead of having `implement` and `implement-spec` call it. Those skills are third-party, and keeping them unchanged avoids carrying a local patch through upstream updates.
