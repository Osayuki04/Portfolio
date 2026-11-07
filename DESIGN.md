# Design

The developer as a collage of what he shipped. A print-poster gallery on black: oversized grotesk headlines, real product screenshots as the material, and one green ink. Built from the user's seven reference screenshots (Nov 2026).

## Colour

All-black, single theme (no light mode). Tokens live in `src/app/globals.css` under `@theme`; names are kept from the previous system so every route inherits them.

| Token | Value | Role |
|---|---|---|
| `background` | `#070908` | page ground |
| `surface` | `#0d110f` | quiet band (About statement) |
| `card` | `#121714` | image wells, covers |
| `footer` | `#040605` | footer ground |
| `deep` | `#0b2a1c` | deep-green field |
| `content` | `#edf2ee` | text, white pills |
| `muted` | `#a3ada7` | secondary text |
| `faint` | `#7d8982` | indices, meta |
| `accent` (= `mexo`, `highlight`) | `#3ccb7f` | brand green: CTAs, bars, open rows, Support band |
| `accent-strong` | `#5fe09a` | hover on green |
| `on-accent` | `#03140b` | text on green |
| `border` / `border-strong` | content at 12% / 28% | hairlines, pill outlines |

Green is used as fields (buttons, open rows, whole sections, underline bars), never as glow.

### Section tones

Each homepage section is a full-width panel with one shared minimum height (`max(100dvh, 72rem)` on desktop, the height of the Projects section). Every panel after the hero rides 40–48px up over the previous one with 2–3rem rounded top corners. A tone class in `globals.css` re-points the colour tokens for everything inside it, and every section has its own tone:

Section backgrounds are only black (`tone-ink` `#070908`) and dark green (`tone-deep` `#0b2a1c`), alternating:

Hero ink → Projects deep → Services ink → Experience deep → About ink → Content deep → Tools ink → Contact deep → Support ink → Footer deep.

Bright green (`tone-green` `#3ccb7f`) is never a section background; it survives as the accent and on nested cards (the Experience panel is `tone-green`; the Contact channel list is a nested `tone-ink`). Every tone defines its full token set so it can be nested.

### Auto-advancing panels

Projects (4.5s per card), Services and Experience (6s per item) move on by themselves through `useAutoCycle` (`src/components/motion/useAutoCycle.tsx`). Each pauses on hover or keyboard focus and while off screen, is off for reduced-motion users, and shows pagination: one segment per item with the active one filling, a counter, and previous / next.

## Type

- **Archivo** (variable, `wdth` 62–125) for everything. Every section heading uses the ABOUT ME treatment through `BigHeading` (`src/components/ui/BigHeading.tsx`): condensed (72%) black capitals. From 640px up every section heading is set at one shared size (the largest at which the widest heading fits); titles are written at 16–18 characters so each runs nearly edge to edge. On phones each line fills the width on its own, with an optional line break. The footer's LET'S TALK opts out (`fill`) and always spans the full width. `.font-semiwide` (112%) for small uppercase captions; `.font-wide` (125%) remains available for expanded titles on subpages.
- **Geist Mono** only for numbers and indices (`.tabular`), including the outline experience index (`.text-outline`, slashed zero).
- No eyebrow labels above headings.

## Components

- Buttons: full-round pills. Primary is green fill with `on-accent` text; secondary is a `border-strong` outline that fills green on hover.
- Lists: hairline-divided rows with mono indices on the right (Experience, Contact).
- "What I do": number circle, label pill and arrow circle; the open row fills green.
- Image tiles: square-cornered in the hero mosaic, 16px radius for project cards and content covers.

## Layout & motion

- Full width (no max-width), gutters 16/24/40px (`.container-px`), every section at least one viewport tall.
- Hero: three columns (quote / bust mosaic / name and actions) that stack on phones (name first).
- Motion: mosaic tiles reveal with a clip-path on load and drift apart on scroll; otherwise only `Reveal` fade-ups and an expo ease-out (`cubic-bezier(0.16,1,0.3,1)`). Reduced motion is respected.
