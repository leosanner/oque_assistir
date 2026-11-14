# Skill sources

Skills imported from third parties, with their origin and any local changes.

## mattpocock/skills

Upstream: https://github.com/mattpocock/skills at commit `59db609eb1e18aaf59b63284d0e52255aff0c63c`.

| Skill | Upstream path |
|---|---|
| code-review | `skills/engineering/code-review` |
| codebase-design | `skills/engineering/codebase-design` |
| diagnosing-bugs | `skills/engineering/diagnosing-bugs` |
| domain-modeling | `skills/engineering/domain-modeling` |
| grill-with-docs | `skills/engineering/grill-with-docs` |
| grilling | `skills/productivity/grilling` |
| implement | `skills/engineering/implement` |
| implement-spec | `skills/engineering/implement-spec` |
| pr | `skills/engineering/pr` |
| prototype | `skills/engineering/prototype` |
| research | `skills/engineering/research` |
| tdd | `skills/engineering/tdd` |
| to-spec | `skills/engineering/to-spec` |
| to-tickets | `skills/engineering/to-tickets` |

Also adapted: `docs/agents/domain.md` from `skills/engineering/setup-matt-pocock-skills/domain.md`, and `docs/agents/issue-tracker.md` from `issue-tracker-github.md` in the same folder (rewritten: milestones, execution mode, no triage/wayfinder sections).

### Local changes

- `code-review`, `to-spec`, `to-tickets`, `implement-spec`: the "tell the user to run `/setup-matt-pocock-skills`" fallback now points to `docs/agents/issue-tracker.md`, since that setup skill is not imported.
