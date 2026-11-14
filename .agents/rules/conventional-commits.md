# Conventional Commits

Every commit message and PR title follows [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).

```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

- **Types**: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`, `build`, `ci`, `style`, `revert`.
- **Description**: imperative mood, lowercase, no trailing period, at most 72 characters.
- **Scope**: the module or area touched, when it helps (`feat(auth): ...`).
- **Breaking changes**: `!` after the type/scope (`feat(api)!: ...`) plus a `BREAKING CHANGE:` footer.
- **Issue references**: in the footer (`Closes #12`, `Refs #34`), so `code-review` can find the spec.
- **Branches**: `<type>/<short-slug>` (e.g. `feat/user-invites`).
- One logical change per commit. Squash fixups before opening the PR.
