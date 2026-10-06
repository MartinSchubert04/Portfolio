# DESIGN.md

Design system for Martin Schubert's space portfolio. Format: [awesome-design-md](https://github.com/VoltAgent/awesome-design-md)
(Stitch, nine sections). Agents read this before generating or changing any UI.

## 1. Visual Theme & Atmosphere

A mission control console with a window onto the mission. Behind the page, fixed, a 3D scene: stars,
a sketched Earth with real coastlines, a rocket flying its flight plan and an astronaut floating
close to the glass. In front of it, the content, laid out as instruments. And over all of it, the
glass itself: the page is seen through a curved CRT tube, with scanlines and a little static.

- **Mood:** calm, technical, a little playful. A control room on a quiet shift, not a sci-fi movie poster.
- **Density:** medium-low. One idea per section. Text columns capped at 65 characters.
- **Voice:** plain. Labels say what the thing is ("Skill Groups", "Latest Commits"). The personality
  is in the scene, the materials and the real data, never in clever wording.
- **Three materials, each with one job.** This is the core rule of the system:
  1. **Sketch** is for anything that is a *diagram*: orbits, the flight plan, the globe, the career
     trajectory, leader lines. Thin dashed strokes in mint, slightly wobbled as if drawn by hand,
     with short mono notes. (Conceptual sketch.)
  2. **Console** is for anything you *operate or read off*: the nav, tabs, buttons, panels, readouts,
     the LED calendar. Same color as the page, raised or pressed in with a pair of soft shadows.
     (Neumorphism.)
  3. **Clay** is for anything that is a *body*: the astronaut, the rocket, moons and planets, the
     project cards and the one primary button. Matte, puffy, rounded, lit from the top left.
     (Claymorphism.)
- A new element picks its material by asking which of the three it is. If it is none (plain text),
  it gets no material at all.

## 2. Color Palette & Roles

Taken from the reference project (space-station: mint phosphor, amber, near-black green), with the
mint softened for reading. Dark only.

| Token | Hex | Role |
|---|---|---|
| `hull` | `#0B110F` | Page background and every console surface (neumorphism needs them equal) |
| `hull-hi` | `#1A2722` | Light shadow of the console (top left) |
| `hull-lo` | `#030605` | Dark shadow of the console (bottom right) |
| `well` | `#080D0B` | Pressed-in surfaces: readouts, selected tab, unlit LED |
| `line` | `#24453B` | Hairline borders, inactive waypoint |
| `haze` | `#8FA9A0` | Secondary text: labels, dates, places (7.6:1 on hull) |
| `frost` | `#D9EFE7` | Primary text and display type |
| `mint` | `#5CF2CB` | The ink of the instruments: sketch notes, live values, company names, brightest LED |
| `mint-dim` | `#2BB892` | Sketch strokes |
| `led-1`, `led-2`, `led-3` | `#14493B`, `#1C8468`, `#22BF95` | LED calendar ramp, between `well` and `mint` |
| `amber` | `#FFB02E` | The single accent: selection, links, primary action, the coastlines, the sun |
| `amber-hi`, `amber-lo` | `#FFD68A`, `#B06A08` | Highlight and shade of amber clay |
| `clay`, `clay-hi`, `clay-lo` | `#16332B`, `#24554A`, `#0A1A16` | Dark clay surface, its highlight and its shade |
| `thrust` | `#FF5A4D` | Rocket exhaust only |

Rules:

- **Amber is the only accent.** Mint is not a second accent: it is the color of lines and readings,
  the way ink is the color of text. Amber means "selected", "press this" or "follow this".
- No pure black, no pure white, no purple, no gradient text, no outer glow.
- Data intensity (the LED calendar) is one hue from dark to bright, never a second hue.
- The scene has its own copy of these values in `src/scene/palette.ts`, because three.js cannot read
  CSS variables. Change both.

## 3. Typography Rules

| Family | Source | Use |
|---|---|---|
| **Geist** (variable) | `@fontsource-variable/geist`, OFL | Display and body: everything read as a title or as prose |
| **Geist Mono** (variable) | `@fontsource-variable/geist-mono`, OFL | Everything that is a reading or an annotation: dates, labels, the status bar, stack lists, the commit log |

| Role | Font | Size / line height | Color |
|---|---|---|---|
| Display XL (`h1`) | Geist 650, -0.035em | 52px, 72px from 640px, 88px from 1024px / 1.05 | frost |
| Display L (`h2`) | Geist 650, -0.035em | 36px, 56px from 768px / 1.05 | frost |
| Title (`h3`), figures | Geist 650, -0.035em | 22px / 28px, figures 28px / 36px | frost |
| Lead (hero, contact) | Geist 400 | 17px / 28px | frost |
| Body | Geist 400 | 16px / 26px | frost |
| Secondary | Geist 400 | 16px / 26px | haze |
| Data line (stack, commit log, calendar readout) | Geist Mono 400 | 14 to 15px / 26px | haze, values in frost |
| Instrument label (`.label`) | Geist Mono 400 | 13px / 20px, uppercase, 0.08em | haze |
| Note (`.note`) | Geist Mono 400 | 15px / 24px, 0.02em | mint, or amber when it names the selection |

- One family in two cuts. Sans is for reading, mono is for readings: if the text is a value, a date,
  a label or a list of technologies, it is mono; otherwise it is sans.
- No handwriting or novelty faces. The sketch material is carried by the strokes, not by the type.
- Emphasis in running text is a color change (frost, mint, amber), not bold.
- `.label` lives **inside** consoles and the status bar, as the caption of an instrument. It never
  sits above a section heading: a section is named by its `h2` and nothing else.
- Headings and buttons in Title Case. Ellipsis is `…`. Quotes are curly. No em or en dashes.
- Numbers that update or line up use `tabular-nums`.

## 4. Component Stylings

### Sketch (`.sketch`, `.wobble`, `.note`)
- Stroke `mint-dim`, 1.5px, round caps, dash `7 6`, `vector-effect: non-scaling-stroke`.
  `.sketch-accent` turns it amber (the selected orbit); `.sketch-solid` removes the dash (leader lines).
- `.wobble` applies the shared `#sketch-wobble` filter (`SketchDefs.tsx`): turbulence displaces the
  stroke a few pixels. Only on static artwork; never on something that animates.
- In the 3D scene the same material is `LineDashedMaterial` and `LineSegments`: the globe grid, the
  coastlines, the moon orbits and the rocket's flight plan.

### Console, raised (`.neu`)
Background `hull`, radius 20px, shadows `10px 10px 24px hull-lo` and `-8px -8px 20px hull-hi`. Used
for the nav bar and for the panel of a section (skills console, activity console).

### Console, pressed (`.neu-inset`)
Background `well`, radius 12px, inset shadows `4px 4px 10px hull-lo` and `-3px -3px 8px hull-hi`.
Readouts, the tab panel, waypoint sockets.

### Console button (`.neu-button`) and chip (`.neu-chip`)
- Pill, 48px tall (44px in the tab list), raised like `.neu` with smaller shadows. Label never wraps.
- Hover: text turns mint. Active, `aria-selected` or `aria-current`: it presses in (`well` plus inset
  shadows) and the text turns amber. Focus: 2px amber outline at 4px offset.
- Chips are 40px tall, each one a link; hover turns the text amber.

### Clay (`.clay`, `.clay-button`)
- `.clay`: radius 28px, fill `clay`, inner highlight `inset 6px 6px 14px clay-hi`, inner shade
  `inset -8px -10px 18px clay-lo`, and a soft drop shadow below. Project cards.
- `.clay-button`: pill, 52px tall, fill `amber` with `amber-hi` and `amber-lo` inner shadows, text
  `hull` (10:1). **One per view**: it is "Download Resume" in the hero and in contact.
- Hover lifts 3px with a slight overshoot; active squashes to 96%. Clay is the only material that bounces.
- Images inside clay get an 18px radius (the card's radius minus its padding).
- 3D clay: `MeshStandardMaterial` with `roughness` 0.95 to 1 and `metalness` 0, under a warm key
  light, a pale sky fill and a mint rim light.

### Bars
- Top: fixed, a raised console pill 56px tall, 12px from the top. Name on the left (hidden under
  640px), five section links on the right; the current one is pressed in and amber.
- Bottom: fixed, 32px, `hull` with a `line` hairline. Section position, contributions and streak
  from GitHub, UTC time, and the Pause Motion button. Every field is live.

### Orbit map (`OrbitMap.tsx`)
One dashed ellipse per skill group around an amber clay sun, a clay body on each, moving at speeds
that follow Kepler's third law. The selected orbit and its body turn amber and a mono note
names it, with a leader line. It is a mouse shortcut for the tab list; keyboard and screen readers
use the tabs.

### LED calendar (`LedCalendar.tsx`)
53 weeks by 7 days of 16px LEDs with 4px gaps and 4px radius. Unlit is a `well` socket; lit goes
`led-1`, `led-2`, `led-3`, `mint`. Pointing at a day reads it out below the matrix. A legend
("Less … More") is always shown.

### CRT tube (`CrtOverlay.tsx`, `.crt-*`)
A fixed layer above everything, `pointer-events: none` and `aria-hidden`. It is not a fourth
material: it is the glass the three materials are seen through.
- **Scanlines:** 1px line every 3px, black at 16% alpha. Plain alpha, no `mix-blend-mode`.
- **Static:** a 240px turbulence tile at 12% opacity, shifted in 6 steps every 0.6s. It stops with
  Pause Motion and with `prefers-reduced-motion`.
- **Glass:** a faint highlight from the top left, fading out by 38%.
- **Vignette:** edges darken to 34%, plus a 70px inner shadow. Keep it light: the nav and the
  status bar live at the edges and their text must stay readable.
- **Bezel:** an SVG frame in `hull-lo` whose inner edge bows outward and rounds at the corners.
- **Curvature:** the real warp is a barrel-distortion shader inside the 3D scene
  (`src/scene/TubeWarp.tsx`): the scene renders to a texture and the texture is drawn through the
  shader, one extra draw call. For the content the curve is suggested by bezel and vignette.
  Because the scene is drawn through that pass, its canvas is opaque and filled with `hull`, with
  tone mapping off so the fill matches the page exactly.
- **Layer budget:** scanlines, highlight and vignette are three backgrounds of one element. Three
  layers in total (glass, static, bezel) sit over the canvas.

### Links (`.link`)
Amber, 1px underline at 4px offset. Hover: `amber-hi`.

## 5. Layout Principles

- **Container:** `.shell`, 1280px max, 16px gutters, 32px from 768px.
- **Section rhythm:** 80px above and below (112px from 768px), 40 to 56px between `h2` and content.
- **The scene owns the empty half.** Hero and Contact keep their text in a 560px column on the left
  so the astronaut and the globe have the right side at full strength. In the sections between,
  the scene drops to 38% opacity and the astronaut moves to a corner (`src/scene/choreography.ts`).
- **No cards for plain text.** Career is text on the page. Consoles hold instruments, clay holds projects.
- **Each section has its own layout family; do not repeat one:**
  1. Hero: text column left, scene right.
  2. Career: vertical trajectory with waypoints; each entry is a 260px meta column and a text column.
  3. Skills: orbit map left, console (tabs and panel) right.
  4. Projects: clay cards two per row, widths alternating 7+5, 5+7, 7+5 on a 12-column grid.
  5. Activity: one full-width console: LED calendar, then four readouts beside the commit log.
  6. Contact: text column left over the globe's horizon.
- Layouts use CSS Grid with explicit tracks.

## 6. Depth & Elevation

| Level | What | How |
|---|---|---|
| -1 | The scene | Fixed canvas behind everything, `pointer-events: none` |
| 0 | Text, sketch | Flat on the page |
| 0, pressed | Readouts, selected tab, LEDs | Inset shadow pair |
| 1 | Console panels, buttons, chips | Outer shadow pair, dark bottom right, light top left |
| 2 | Clay | Inner highlight and shade plus a drop shadow; lifts on hover |

Inside the scene, back to front: stars (z ≤ -2), globe (0), rocket (1.4 to 3.1), astronaut (3.5),
camera (8).

Z-index scale, all of it: scene `0`, content `10`, bars `40`, skip link `50`, CRT glass `60`.

## 7. Do's and Don'ts

Do:
- Decide the material first: diagram, instrument or body.
- Keep the light coming from the top left in all three materials, CSS and 3D.
- Let real data fill the instruments: contributions, streaks, commits, UTC.
- Give every interactive element hover, active and focus-visible states.
- Keep the scene decorative: `aria-hidden`, no pointer events, lazy loaded, and the page complete without it.

Don't:
- Don't put a raised console on a background that is not `hull`: the shadow pair stops working.
- Don't nest raised inside raised. Raised panel, pressed readout, and at most a raised chip inside it.
- Don't add a second amber clay button to a view, or use amber for decoration.
- Don't add glow, bloom, glass blur or gradient text, and don't add flicker or glitch bars to the
  CRT layer: it stays a steady picture with static, never a strobing one.
- Don't put a CSS or SVG `filter` on the scene canvas, or on anything that repaints every frame.
  The first CRT version warped the canvas with an SVG displacement filter and the page stuttered:
  the browser rasterizes that on the CPU for every frame. Effects on the scene go in a shader.
- Don't warp text or controls at all: a warp moves the pixels but not the click targets.
- Don't wobble or filter anything that moves, and don't animate anything other than `transform`
  and `opacity` (color on hover is fine).
- Don't use an uppercase label above a heading, number the sections or add scroll cues.
- Don't invent numbers. A figure on the page comes from fetched data or it is not there.
- Don't write themed labels ("Transmission", "Payload"). Say "Contact", "Projects".

## 8. Responsive Behavior

| Breakpoint | Change |
|---|---|
| < 640px | Name hidden in the top bar; links spread across it. Status bar shows section, UTC and Pause. The orbit map loses its note (too small when scaled) |
| >= 640px | 64px `h1`. Streak appears in the status bar |
| >= 768px | 32px gutters, 48px `h2`. Contributions appear in the status bar |
| >= 1024px | Two-column layouts switch on; hero and contact center vertically; 76px `h1` |

- Below 1024px every section is a single column in source order.
- The scene has a second set of poses for portrait screens: smaller, kept to the lower half in the
  hero and contact so it sits under the text instead of behind it.
- The LED calendar keeps its pixel size and scrolls horizontally in a focusable region, starting at
  the newest week.
- Touch targets are at least 40px tall. Fixed bars respect `env(safe-area-inset-*)`, and
  `scroll-padding` keeps anchors and focused elements clear of them.
- `prefers-reduced-motion`, or the Pause Motion button: the scene renders single frames on demand
  and snaps to each pose, the orbit bodies stop, reveals and hover lifts are off. Nothing is hidden.

## 9. Agent Prompt Guide

Quick reference:

```
bg hull #0B110F · text frost #D9EFE7 · secondary haze #8FA9A0 · ink mint #5CF2CB · accent amber #FFB02E
display: Geist 650, tight tracking. body: Geist 16px/26px. readings, dates, labels, notes: Geist Mono.
sketch = diagrams · console (neumorphic) = controls and readouts · clay = bodies, project cards, primary button
radius: console 20, pressed 12, clay 28, controls pill · light from top left · one accent · dark only
over everything: CRT glass (scanlines, static, vignette, bowed bezel); tube warp is a shader in the 3D scene, never a CSS filter
```

Prompts that work:

- "Add a section in the style of DESIGN.md: an `h2` through the `Section` component, body in Geist
  16px. Decide which material each part is (section 1) and use a layout family not listed
  in section 5."
- "Add a control: `neu-button`. Use `clay-button` only if it is the single primary action in view."
- "Show a new metric: compute it in `src/lib/` from the fetched GitHub data, add a test, and render
  it with the `Readout` component in `Activity.tsx`. Do not hardcode the value."
- "Add a diagram: inline SVG, strokes with `.sketch`, static parts inside a `.wobble` group, labels
  with `.note`. Anything that moves stays outside the wobble group."
- "Move the astronaut for a section: edit the pose in `src/scene/choreography.ts` (wide and narrow)
  and run the tests; they check it stays on screen."

Before finishing any UI change: run the pre-flight in `.claude/skills/design-taste-frontend` (section
14) and the `web-design-guidelines` audit, and check the agreed deviations in `CLAUDE.md`.
