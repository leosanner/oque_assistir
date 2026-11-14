# Feature docs format

## Layout

```
docs/
  features/
    README.md                 # index of every feature
    user-invites/             # one folder per feature, kebab-case
      README.md               # required: what and why
      technical.md            # usual: how it works
      CHANGELOG.md            # required: history of changes
    billing/
      README.md
      technical.md
      CHANGELOG.md            # one per feature, at its root
      api.md                  # any other file the feature needs
      invoices/               # internal section
        README.md
        technical.md
```

## Files

`README.md` and `CHANGELOG.md` are the only fixed files. Everything else depends on the feature: create what makes it easier to understand, name it after its content, and link it from the `README.md`.

| File | Audience | Holds |
|---|---|---|
| `README.md` | anyone, including product | what the feature does, who uses it, main flow diagram, concrete examples, links to the other files |
| `technical.md` | whoever changes the code | modules involved, interactions (sequence), data model, state lifecycles, links to ADRs |
| `CHANGELOG.md` | anyone tracing history | one entry per change, newest first, tied to spec and tickets |
| others (common) | depends | `api.md` (endpoints, payloads, errors), `configuration.md` (flags, env vars, limits), `operations.md` (jobs, monitoring, runbook), `examples/` (larger sample data) |

**Internal sections**: give a part of the feature its own subfolder when it has its own flow or audience, or when a file grows past ~300 lines. A subfolder has its own `README.md` and whatever else it needs, but no `CHANGELOG.md`: history stays in the feature root's changelog, naming the section.

## `README.md`

```md
---
feature: user-invites
status: active            # active | deprecated | removed
created: 2026-10-28       # first documented
updated: 2026-11-04       # matches the top CHANGELOG entry
spec: "#18"               # spec of the latest change
milestone: "Invite expiration"
---

# User invites

{One paragraph: what the feature does and for whom.}

## How it works

{Main flow as a Mermaid diagram, then a few lines walking through it.}

## Example

{Concrete data: a request and response, a table of before/after, a sample record.}

## Rules and limits

{Business rules the reader needs to know, as a short list or table.}

## More

- [Technical details](./technical.md)
- [Changelog](./CHANGELOG.md)
- Related: [ADR-0004](../../adr/0004-...md), glossary terms **Invite**, **Seat**
```

Sections other than the title, summary, a diagram, and an example are optional. Add or drop sections to fit the feature.

## `technical.md`

No fixed template. Typical sections: modules and responsibilities, sequence of interactions, data model, states and transitions, error handling, decisions (as ADR links), known limitations.

## `CHANGELOG.md`

```md
# Changelog: User invites

## 2026-11-04: Invite expiration

- Spec: #18 (milestone "Invite expiration")
- Tickets: #19, #20
- Invites expire 7 days after being sent.
- Expired invites can be resent from the members page.

## 2026-10-28: User invites

- Spec: #12 (milestone "User invites")
- Tickets: #13, #14, #15
- Feature created: admins invite users by email; invitees join on accept.
```

Dates are absolute (`YYYY-MM-DD`), the day the skill runs. Bullets describe the change from the reader's point of view, not the commits. Changes outside a spec (a direct fix) list the issue or the commit instead.

## `docs/features/README.md`

```md
# Features

| Feature | Status | Updated | Latest spec |
|---|---|---|---|
| [User invites](./user-invites/README.md) | active | 2026-11-04 | #18 |
| [Billing](./billing/README.md) | active | 2026-10-15 | #7 |
```
