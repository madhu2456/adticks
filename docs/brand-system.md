# Adticks Brand System

The Adticks logo is built around a high-contrast black, white, and electric-blue identity. The product UI should use the blue as the primary action and intelligence signal, while keeping the application itself quiet, legible, and operational.

## Core Palette

| Role | Hex | Usage |
| --- | --- | --- |
| Brand blue | `#1070E0` | Primary buttons, active states, selected nav, focus rings, charts |
| Brand blue dark | `#0B56B3` | Hover states, pressed states, dark-mode accents |
| Brand blue light | `#EAF4FF` | Soft backgrounds, selected table rows, subtle callouts |
| Ink black | `#05070A` | App shell, sidebar, high-emphasis text in dark surfaces |
| White | `#FFFFFF` | Logo contrast, cards, page surfaces |
| Mist | `#F5F8FC` | App background in light theme |
| Line | `#D8E2EF` | Borders, dividers, table rules |
| Slate text | `#243244` | Primary body text |
| Muted text | `#66758A` | Secondary labels and metadata |

## Product UI Direction

- Use a mostly light interface with restrained black app-shell elements and electric-blue emphasis.
- Avoid making the dashboard a fully black-and-blue UI; that would look heavier than an enterprise SEO platform should.
- Reserve `#1070E0` for important affordances: primary actions, selected filters, graph highlights, focus, and top-priority audit states.
- Use neutral whites, mists, and slate text for dense tables, crawl logs, findings, and dashboards.
- Use semantic colors sparingly so SEO issue severity is readable and not confused with brand color.

## Semantic Colors

| Role | Hex |
| --- | --- |
| Critical | `#D92D20` |
| Warning | `#F79009` |
| Success | `#12B76A` |
| Info | `#1070E0` |

## Component Defaults

- Border radius: `8px` for cards and panels, `6px` for controls.
- Primary button: brand blue background, white text, darker blue hover.
- Secondary button: white background, line border, slate text.
- Sidebar: ink black background, white logo, blue active indicator.
- Data tables: white surface, mist page background, line dividers, blue only for links and selected state.
- Charts: blue as the main series, with neutral grays and semantic colors for comparison/status.
