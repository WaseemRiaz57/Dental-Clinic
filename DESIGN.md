# Design system — Enamel & Gold

**Idea:** a calm, clinical-but-warm identity. Cool porcelain surfaces, deep teal for trust, one gold accent borrowed from dental crowns. The arch (tooth/doorway silhouette) is the single signature shape.

## Colour (tokens in `app/globals.css`)
| Token | Hex | Use |
|---|---|---|
| porcelain | #F4F7F6 | page background |
| enamel | #FFFFFF | cards, alternate sections |
| mist | #E4EDEB | image placeholders, review band |
| line | #CFDCD9 | hairlines |
| ink / ink-soft | #12292A / #46605F | text |
| teal-deep | #0B3B3C | headings, primary buttons, dark sections |
| teal | #1B6B67 | links, icons, hover |
| gold | #C99A3B | the only accent (CTA on dark, badges, focus ring) |
| gold-deep | #8A6212 | gold text on light backgrounds |

## Type
- Display: Bricolage Grotesque 600, tracking -0.02em, line-height ~1.05
- Body: Figtree 400/500/600, 17px, line-height 1.6, measure under 65ch
- Sentence case everywhere; no all-caps labels.

## Shape, depth, motion
- Radius: pills for buttons, 2rem for panels, 1.5rem for gallery tiles, arch (`.arch`) for portraits and service thumbnails.
- Shadows: `--shadow-soft` (resting), `--shadow-lift` (floating).
- Motion: one orchestrated hero entrance (headline rise + arch opening). Elsewhere only responses to input: button press, underline draw, thumbnail zoom, arrow slide. `prefers-reduced-motion` disables all of it.

## Components
`.btn` + `.btn-primary | .btn-gold | .btn-ghost`, `.field` (inputs), `.link-draw`, `.arch`.

## Breakpoints
Tailwind defaults: sm 640, md 768, lg 1024. Mobile gets a sticky Book/WhatsApp bar; nav collapses to a full-height menu.
