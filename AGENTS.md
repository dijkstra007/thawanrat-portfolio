# Agent ownership

Split the portfolio so parallel agents can edit without colliding in `app/page.tsx` or `app/globals.css`. Keep behavior, copy, and look the same unless a task says otherwise.

## Layout

- `app/page.tsx` — renders `PortfolioApp` only
- `app/globals.css` — tokens, reset, `.shell`, `.section-pad`, `.eyebrow`, `.button` variants
- `app/layout.tsx` — document shell, font, metadata
- `content/` — copy and lists, no JSX
- `lib/` — shared types and helpers
- `components/<section>/` — section component + CSS module

## Owns / avoid

| Area | Owns | Avoid |
|---|---|---|
| Content | `content/*` | JSX/CSS |
| Hero / header chrome | `components/hero`, `components/header` | other sections |
| Selected work / archive / case study | `components/selected-work`, `components/archive`, `components/case-study`, `content/projects.ts` | About / resume copy |
| About / experience / expertise / education / footer | matching `components/*` folder | `app/globals.css` unless adding a token |
| Shared project thumbnails | `components/visuals` | section layout CSS |
| Tokens / buttons / shell | `app/globals.css` | section spacing |

## Hot files (serialize agents)

Do not edit these in parallel with another agent:

- `components/portfolio/PortfolioApp.tsx`
- `components/header/Header.tsx`
- `lib/types.ts`
- `app/globals.css`

View state lives only in `PortfolioApp`: work menu, mobile nav, archive visibility, category filter, active case study. Pass callbacks down (`onGoHome`, `onOpenProject`, `onRevealArchive`, `onCloseMenus`).

Do not add `/work/[id]` routes in a visual or copy pass.
