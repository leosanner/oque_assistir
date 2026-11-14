# Oque Assistir

A chatbot that helps a User decide what Movie to watch: the User talks to the Assistant, narrows the options with Filters, and gets Recommendations.

## Conversation

**User**:
The person talking to the Assistant to find something to watch.
_Avoid_: Customer, viewer, client

**Assistant**:
The chatbot the User talks to; it interprets what the User wants and produces Recommendations.
_Avoid_: Bot, agent, AI

**Conversation**:
An ordered exchange of Messages between one anonymous User and the Assistant; it ends when the User leaves.
_Avoid_: Chat, session, thread

**Message**:
A single turn in a Conversation, written either by the User or by the Assistant.
_Avoid_: Prompt, reply

## Catalog

**Movie Catalog**:
The external source the Assistant looks Movies up in. TMDB is the first one; the catalog can be replaced.
_Avoid_: Movie database, provider, TMDB (when meaning the role, not the service)

**Movie**:
A film as listed in the Movie Catalog. TV series are not Movies.
_Avoid_: Film, title, item, content

## Recommending

**Filter**:
A constraint a Movie must satisfy to be recommended, such as genre, release year range, or minimum rating.
_Avoid_: Criteria, preference, facet

**Set Filter**:
A Filter the User chose through the filter controls. It takes precedence over any Inferred Filter on the same attribute, and the Assistant tells the User when it does.
_Avoid_: Manual filter, UI filter, hard filter

**Inferred Filter**:
A Filter the Assistant derived from the User's Messages. It only applies where no Set Filter covers the same attribute.
_Avoid_: Chat filter, soft filter, extracted filter

**Active Filters**:
The Filters in effect for a Conversation at a given moment: every Set Filter, plus the Inferred Filters they don't override.
_Avoid_: Current search, query

**Relaxation**:
A change to the Active Filters that the Assistant proposes when no Movie matches them, such as widening the year range; it applies only if the User accepts it.
_Avoid_: Fallback, loosening

**Recommendation**:
The one Movie the Assistant suggests in a reply, together with why it fits. A reply holds at most one Recommendation.
_Avoid_: Suggestion, result, match

**Alternative**:
A Movie the Assistant names in the same reply as a Recommendation, by name only, without the reasoning and details a Recommendation carries.
_Avoid_: Runner-up, also-consider, secondary recommendation

**Dismissed Movie**:
A Movie the User has turned down or already seen in a Conversation; it is never recommended again in that Conversation.
_Avoid_: Rejected movie, blacklist, seen list
