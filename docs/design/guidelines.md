# Design guidelines

How the O Que Assistir web UI (`app/web`) looks and why. Follow this when building or changing any screen.

The tokens below are implemented in [`app/web/src/index.css`](../../app/web/src/index.css). If this file and the CSS disagree, fix whichever is wrong; don't let them drift.

## Direction

A light, sharp, SaaS-style interface that feels **technical, clean, intelligent and confident**: editorial-tech, not playful.

- **Conversation first.** The User talks to the Assistant in one centred thread. Everything else (Recommendations, Filters, Alternatives) appears in or around that thread.
- **Movies stand out, the UI recedes.** The chrome is quiet (near-white surfaces, grey borders, dark text) so posters and Recommendation cards carry the colour.
- **One accent.** Lime is the only accent colour, and it is used sparingly.

Do:

- Solid backgrounds, defined 1px borders, small radii (4–10px).
- Minimal, soft shadows, only to lift the one element that matters (the live Recommendation card, a floating composer).
- Mono uppercase labels for metadata and section names.

Don't:

- Purple or blue gradients, neon glows, glassmorphism, blurred backdrops.
- Playful illustrations, emoji as decoration, rounded "bubbly" shapes everywhere.
- A second accent colour. Status colours (error) are the only exception.

## Colour

### Tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#F5F7F3` | Page background |
| `--bg-2` | `#ECF0EA` | Secondary background (bands, pills) |
| `--card` | `#FFFFFF` | Cards, composer, raised surfaces |
| `--elev` | `#E4EAE2` | Pressed or disabled surfaces |
| `--line` | `#D3DBD1` | Borders and dividers |
| `--text` | `#0E120F` | Primary text; also the User's message bubble |
| `--text-2` | `#4A554C` | Secondary text |
| `--muted` | `#687369` | Labels, placeholders, metadata |
| `--lime` | `#B7FF3C` | Accent **fill** |
| `--lime-h` | `#A3F126` | Hover state of a lime fill |
| `--lime-dim` | `rgba(183,255,60,.22)` | Faint lime tint behind accent content |
| `--on-lime` | `#0A0D0B` | Text and icons on a lime fill |
| `--accent` | `#3D6A00` | Accent **ink**: text, links, hairlines, focus ring |
| `--accent-line` | `rgba(61,106,0,.35)` | Accent borders |
| `--danger` / `--danger-bg` / `--danger-line` | `#A3271B` / `#FBE9E6` / `rgba(163,39,27,.3)` | Errors only |

### The lime rule

Lime `#B7FF3C` has a contrast of **1.12:1** on the page background: it is invisible as text. So:

- **Lime is only ever a fill**: primary buttons, the logo mark, the Assistant avatar, accent stripes, small tags. Whatever sits on it uses `--on-lime` (16.2:1).
- **Anything that must be read in the accent colour uses `--accent`** (olive, 6.0:1 on `--bg`): accent labels, links, "inferred" tags, the focus ring.
- Thin lime lines (under 3px) disappear on light surfaces. Use 3px+ lime stripes, or `--accent` for hairlines.

### Contrast

Measured against `--bg` (`#F5F7F3`), WCAG AA needs 4.5:1 for body text:

| Pair | Ratio |
|---|---|
| `--text` on `--bg` | 17.5 |
| `--text-2` on `--bg` | 7.2 |
| `--muted` on `--bg` | 4.6 (just passes: don't put it on `--bg-2` or `--elev`) |
| `--accent` on `--bg` | 6.0 |
| `--on-lime` on `--lime` | 16.2 |
| `--danger` on `--card` | 7.3 |

## Typography

- **Sans: Inter Tight** (400, 500, 600, 700) for everything the User reads.
- **Mono: JetBrains Mono** (400, 500, 700) for labels, metadata (year, runtime, rating), tags and the logo mark.
- Both load from Google Fonts in `app/web/index.html`.

| Role | Style |
|---|---|
| Page heading | 36px / 600, letter-spacing −0.02em (28px on mobile) |
| Card title | 22px / 600 |
| Body | 15px / 1.5 |
| Small text | 13–14px |
| Label | Mono 11px / 500, uppercase, letter-spacing 0.08em, `--muted` |
| Metadata | Mono 12px, `--text-2`, items separated by a `/` in `--line` |

UI copy is in **Brazilian Portuguese**. Code, comments and docs stay in English.

## Layout

- One centred column, **max 760px**, with 24px side padding (16px under 720px).
- Sticky top bar (logo left, "+ Nova conversa" right) with a bottom border.
- The composer is docked to the bottom of the column, over a fade from transparent to `--bg`.
- Vertical rhythm: 24px between Messages, 8–12px inside a card.
- Must work at phone width with no horizontal page scroll; rows of chips or pills may scroll horizontally on their own.

## Components

### Built (on `main`)

- **Logo.** A 24px lime square with a mono `?` in `--on-lime`, followed by "O Que Assistir" in 700.
- **Buttons.** 36px high, 6px radius, 600 weight.
  - *Primary*: lime fill, `--on-lime` text, `--lime-h` on hover. One per area.
  - *Outline*: transparent, `--line` border, darker border on hover.
  - Disabled: `--elev` background, `--muted` text.
- **Pill.** 30px, fully rounded, `--bg-2` with a `--line` border. Used for suggestions; the border turns `--accent` on hover.
- **User Message.** Right-aligned bubble in `--text` with `--bg` text, radius `10 10 2 10`, max 520px.
- **Assistant Message.** Left-aligned, no bubble, with a 28px lime avatar showing `?`. Text keeps line breaks (`pre-wrap`).
- **Thinking indicator.** Three small `--accent` squares blinking in sequence plus a mono "pensando". Static when the User prefers reduced motion.
- **Error.** Inline, in place of the Assistant reply: white card with a `--danger-line` border, `--danger` text, an outline "Tentar de novo" button, and a `!` avatar in danger colours.
- **Composer.** White card with a `--line` border and 10px radius; an auto-growing textarea plus a primary "Enviar ↵" button. Enter sends, Shift+Enter adds a line.

### Planned (shown in the prototype, not built yet)

These need structured data from the server. Build them to match the prototype's variant A.

- **Recommendation card.** Sits inside the Assistant Message that recommends it.
  - Layout: white card with the poster on the left (about 112px wide, 2:3 ratio) and the details on the right.
  - Details, top to bottom: an accent "Recomendação" label, the title (with the original title in `--muted`), a metadata row (year / runtime / ★ rating / director), and the "why it fits" text in `--text-2`.
  - Actions: primary "Vou assistir", outline "Já vi · próximo".
  - Emphasis: the **live** card has a 4px lime stripe on its left edge, an `--accent-line` border and a soft shadow. **Past** cards drop to 55% opacity and lose their actions. A **dismissed** card's title is struck through.
- **Alternatives.** At the bottom of the Recommendation card, below a divider: an "Alternativas" label, then the other Movies by name and year only, separated by `·`. No reasoning, no actions.
- **Active Filters strip.** A sticky band under the top bar showing an "Filtros ativos" label and one chip per Filter, each with a small × to remove it.
  - Chips: 28px high, 4px radius. Each shows the attribute in mono `--muted`, then the value.
  - A **Set Filter** has a solid border on white.
  - An **Inferred Filter** has a dashed border, a transparent background, and a small `inferido` tag in `--accent` on `--lime-dim`.
  - The strip ends with a dashed "+ Filtro" chip.
- **Posters.** Use the real Movie Catalog (TMDB) image at a 2:3 ratio, with a 4px radius and a faint border. Until images exist, the prototype's stand-in is a solid colour block with the year, the title and the director.

## Prototype reference

The visual reference for the planned components is the throwaway branch **`prototype/home-ui`** (variant A, `app/web/src/prototype/home/VariantA.tsx`). Run it with `npm run prototype:home` from `app/web` on that branch.

That code was written quickly, with stub data and no tests. Use it to see how a component should look, then build the component properly in `app/web/src/`; never merge or copy the prototype as is. Variants B and C on the same branch were rejected.
