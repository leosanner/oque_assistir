# Issue tracker: GitHub

Issues, specs, and tickets live as GitHub issues. Use the `gh` CLI for all operations. Infer the repo from `git remote -v`; `gh` does this automatically inside a clone.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --json number,title,body,labels,milestone,comments`.
- **List issues**: `gh issue list --state open --json number,title,labels,milestone` with `--label`, `--milestone`, and `--state` filters as needed.
- **Sub-issues**: `gh issue create --parent <parent> ...`, or `gh issue edit <parent> --add-sub-issue <child>` afterwards (`gh` 2.94+). Older `gh`: `gh api --method POST repos/<owner>/<repo>/issues/<parent>/sub_issues -F sub_issue_id=<child-db-id>`. Without sub-issues, put `Part of #<parent>` at the top of the child body.
- **Blocking**: use GitHub's native issue dependencies. `gh issue create --blocked-by <n>,<n> ...` or `gh issue edit <child> --add-blocked-by <blocker>` (`gh` 2.94+). Older `gh`: `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`, where the database id comes from `gh api repos/<owner>/<repo>/issues/<n> --jq .id`. Fallback: a `Blocked by: #<n>, #<n>` line at the top of the child body. A ticket is unblocked when every blocker is closed.
- **Count open blockers**: `gh api repos/<owner>/<repo>/issues/<n> --jq .issue_dependencies_summary.blocked_by` (0 means startable).
- **Comment**: `gh issue comment <number> --body "..."`.
- **Labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`. If a label does not exist yet, create it with `gh label create`.
- **Close**: comment with the explanation first, then `gh issue close <number>`.

## Labels

- `ready-for-agent`: fully specified, ready for an agent to pick up. Applied by `to-spec` and `to-tickets`.

## Milestones (one per spec)

A milestone groups one spec and all its tickets. It is the PRD for that piece of work.

- **When a skill publishes a spec**: create a milestone with the spec title (`gh api repos/<owner>/<repo>/milestones -f title="<title>"`), then add the spec issue to it (`gh issue edit <spec> --milestone "<title>"`).
- **Execution mode**: right after the spec is published, ask the operator which skill will implement it, `implement` (one agent, sequential, current branch) or `implement-spec` (parallel subagents on an integration branch). Record the answer in the milestone description using the template below.
- **When a skill publishes tickets for a spec**: create each ticket in the spec's milestone (`gh issue create --milestone "<title>" ...`) and as a sub-issue of the spec. Then fill in the `Order` line of the milestone description.

Milestone description template (keep it this short):

```
Spec: #<spec>
Execution: implement | implement-spec
Branch: <type>/<slug>
Order: #a -> #b, #c -> #d
```

Update it with `gh api --method PATCH repos/<owner>/<repo>/milestones/<milestone-number> -f description="..."`.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Read it as in **Read an issue** above.
