---
name: Lumière Editorial
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#3d627b'
  on-secondary: '#ffffff'
  secondary-container: '#bce2ff'
  on-secondary-container: '#40657e'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1c1c'
  on-tertiary-container: '#858383'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#c8e6ff'
  secondary-fixed-dim: '#a5cbe8'
  on-secondary-fixed: '#001e2e'
  on-secondary-fixed-variant: '#244b63'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  ny-gray: '#e2e2e2'
  ny-light: '#f4f4f4'
  white: '#ffffff'
  error-red: '#dc2626'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '900'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '900'
    lineHeight: '1.1'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '900'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.4'
  body-italic:
    fontFamily: Playfair Display
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.08em
  ui-medium:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
  ui-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.4'
  metadata:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
spacing:
  base: 4px
  container-max: 1024px
  sidebar-width: 288px
  gutter-md: 20px
  margin-lg: 48px
  section-gap: 40px
---

## Brand & Style

The design system is built upon a **"Print-to-Digital"** philosophy, moving away from the common "gamification" of language learning toward a refined, intellectual, and authoritative editorial experience. It mimics the aesthetic of a prestige broadsheet newspaper, such as *Le Monde* or *The New York Times*, positioning the user as a scholar or a reader rather than a player.

The visual style is **Modern Brutalist Minimalism**. It rejects the soft, rounded trends of modern SaaS in favor of a rigid grid, heavy horizontal rules, and high-contrast typography. The emotional response should be one of focus, sophistication, and academic rigor.

**Key Stylistic Pillars:**
- **Monochromatic Foundation:** A strict black, white, and off-white base to simulate newsprint.
- **Architectural Hierarchy:** Deep reliance on borders (1px and 4px) to define space instead of shadows or depth.
- **High-Density Information:** Utilizing small, sharp UI labels and metadata to create a detailed, data-rich environment.

## Colors

The color strategy is almost entirely achromatic, using **NY Off-White (#fcfcfc)** as the page surface to reduce the harshness of pure white while maintaining a "paper" feel. 

- **Primary (NY Black):** Reserved for headlines, borders, and heavy call-to-action fills.
- **Secondary (French Blue):** Used with extreme intentionality as an "interactive layer." It highlights progress, active links, and selection states.
- **Neutral:** Multi-tiered grays facilitate the high-density UI without breaking the monochromatic aesthetic. 

**Color Rules:**
- Avoid using the accent blue for static elements; it must signify "movement" or "action."
- Grayscale filters should be applied to user avatars and images by default to maintain the editorial tone, only revealing full color on hover or active interaction.

## Typography

The system utilizes a sharp contrast between **Playfair Display** (a high-contrast serif) and **Inter** (a utilitarian sans-serif). 

- **Playfair Display** handles all "Editorial" content—headlines, titles, and expressive italic captions. It should feel heavy and authoritative.
- **Inter** is the "Utility" workhorse—handling all navigation, labels, and metadata. 

**Typesetting Instructions:**
- **Headlines:** Use tight line heights for large display text to mimic newspaper headers.
- **Utility Labels:** Always use `label-caps` for section tags (e.g., "DAILY LESSON") to create a distinct functional contrast from body text.
- **Captions:** Use the italic variant of Playfair Display for "scholar" notes or B1/C1 level indicators to add a premium, literary touch.

## Layout & Spacing

The layout is a **Fixed-Width Grid** on desktop, centered to resemble a page layout. It uses a rigorous 4px base unit to ensure alignment across all components.

**Layout Structure:**
- **Sidebar:** A fixed 288px (w-72) sidebar acts as the primary navigation, separated by a 1px vertical border.
- **Main Column:** A centered 1024px (5xl) max-width container.
- **Guttering:** 20px (p-5) padding within cards and 40px–48px gaps between major editorial sections.

**Mobile Reflow:**
- Sidebar collapses into a slide-out drawer with a blurred backdrop.
- Horizontal padding reduces to 16px.
- Grid-based card layouts stack vertically.

## Elevation & Depth

This design system is strictly **Flat and Architectural**. Hierarchy is communicated through line weight and color fills rather than shadows.

- **Borders as Depth:** A 1px border (`ny-gray`) is used for standard grouping. A 4px border (`ny-black`) is used to denote "Primary" importance—specifically on the top of featured cards or the bottom of the main logo area.
- **Tonal Surfaces:** Components use `white` surfaces against the `ny-offwhite` background to create a subtle "layered paper" effect.
- **Interaction States:** Hovering over a card or interactive element should not result in a shadow or lift. Instead, use a subtle background color shift to `ny-light` or a border color change.
- **Overlays:** The only use of transparency is for mobile modal backdrops, using a 40% opacity black with a small backdrop blur to maintain legibility.

## Shapes

The shape language is **Strictly Rectangular (Sharp)**. 

- **Corners:** 0px radius for all buttons, input fields, cards, and containers. This reinforces the "printed" aesthetic.
- **Exceptions:** Circles are used *exclusively* for functional indicators that are not containers, such as status dots (online/offline), accent pulses, or progress bar caps.
- **Dividers:** Use horizontal rules (`hr`) frequently to separate news items. Use 4px rules for section headers and 1px rules for sub-items.

## Components

### Buttons
- **Primary:** Solid `ny-black` background, `white` text, sharp corners. No shadow.
- **Secondary:** Transparent background, 1px `ny-black` border, sharp corners.
- **Ghost:** No border or background, `ny-dark` text. Use `ui-bold` typography.

### Cards
- Editorial cards use a `border-t-4 border-ny-black` to signal importance.
- Secondary cards use a `1px border border-ny-gray`.
- All cards feature a `white` background and sharp 0px corners.

### Input Fields
- Underline-style inputs or full-box inputs with 1px `ny-black` borders. 
- Use `Inter` at 14px for user input.
- Error states use `red-600` for the border and a small `label-caps` error message below.

### Progress Indicators
- Linear bars only. The track is `ny-light` and the fill is `ny-accent` (French Blue). 
- Ends are rounded (full) to distinguish functional UI from the content grid.

### Lists & Navigation
- Sidebar links use `ui-medium` typography.
- Active states are marked by a `ny-accent` text color and a small 4px vertical "tab" on the edge of the sidebar.

### Interactive "Daily Edition" Header
- A specific component featuring the current date (preferably in French) and the "Lumière" logo in `display-lg`, flanked by heavy horizontal rules. This acts as the anchor for the entire application.
