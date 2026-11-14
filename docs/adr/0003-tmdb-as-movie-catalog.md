# TMDB is the first Movie Catalog, behind our own interface; we don't keep our own

All Movie data (titles, genres, release dates, ratings, posters) comes from an external Movie Catalog, and the first one is The Movie Database (TMDB) API. The server reaches it only through a catalog interface of our own (working name `MovieAPI`), so TMDB can be replaced or joined by another source without touching the conversation logic. We don't import or maintain a local catalog: the Assistant queries the Movie Catalog when it needs Movies, and every Recommendation and Alternative must be a Movie that exists there, never a title the model produced from memory.

## Consequences

- Recommendation quality and availability depend on the catalog behind the interface (TMDB rate limits, outages, data gaps).
- TMDB's terms require attribution in the UI while it is the catalog in use.
- How a Movie is identified independently of TMDB ids, and the exact shape of the interface, are still open and will get their own decision.
