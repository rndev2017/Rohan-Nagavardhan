# Photography design language

## Scope and intent

These rules apply to the photography microsite at `/photos` and photography routes using
`PhotoLayout.astro`, including the preserved album URLs. The main personal website keeps its
existing design. Both sections share Astro, Tailwind, Sanity, image utilities, metadata, resets,
and accessibility infrastructure.

The photography section should feel like a quiet gallery and a small collection of photobooks.
Its character comes from photographs, paper colors, typography, proportion, and whitespace.
Physical references such as book covers and mounted prints should remain restrained.

This document records the agreed visual direction. When changing that direction, update the
relevant rule here with the implementation so future pages follow the same decisions.

## Typography: give each role a consistent voice

Assign fonts by role using the shared Tailwind `text-photo-*` scale. Georgia carries the
identity, navigation, page headings, project headings, and editorial writing. System sans-serif
carries summaries, metadata, and controls. Fraunces Bold is reserved for book-cover artwork.
The main personal site is unaffected by these photography-only roles.

| Role / utility | Family | Responsive size |
| --- | --- | --- |
| Identity / `text-photo-identity` | Georgia italic | 22–24px |
| Page title / `text-photo-title` | Georgia roman | 32–36px |
| Project heading / `text-photo-heading` | Georgia roman | 20–26px |
| Editorial / `text-photo-body` | Georgia roman | 17–18px, 1.65 line height |
| Summary / `text-photo-summary` | System sans-serif | 15–16px, 1.6 line height |
| Navigation / `text-photo-nav` | Georgia roman | 16px |
| Utility / `text-photo-utility` | System sans-serif | 13–14px |
| Cover lettering | Fraunces Bold | Scales with cover, line height 1.08, tracking -0.02em |

- Use `font-photo`, `font-sans`, or `font-photo-cover font-bold` with the appropriate size role.
- Reserve italics for the identity, the reader's running title, and occasional authored editorial emphasis. Controls are upright.
- Use sentence case for summaries and status; avoid routine uppercase tracking.
- Keep page and project headings normal weight. Preserve bold, tightly set cover lettering.
- Writing panels allow Paragraph, Heading (`h2`), and Subheading (`h3`) in Portable Text.
  Render headings in normal-weight Georgia: `text-photo-title` for h2 and
  `text-photo-heading` for h3. Use `photo-sm` below headings and between paragraphs,
  and `photo-lg` before subsequent headings. The running project title remains the page h1.
- Writing blocks each support left (default), center, or right alignment through the Portable
  Text style menu, independently for paragraphs, headings, and subheadings. Preserve authored
  alignment on desktop and phones; existing styles remain left-aligned.
- Covers self-host one small Latin Fraunces WOFF2 (weight 700, optical size 72, softness 80,
  wonk 1). License: `astro/public/fonts/Fraunces-OFL.txt`. No runtime font service or new weights.
- Cover titles can decrease slightly for long names and use up to three lines within their
  reserved area. The complete title remains readable and linked below each cover.

## Color and materials

| Role | Value | Use |
| --- | --- | --- |
| Background | `#faf9f6` | Pale paper; avoid making it noticeably yellow |
| Foreground | `#252522` | Warm near-black editorial text |
| Muted / link accent | `#66665F` | Secondary text and quiet controls |
| Rule / border | `#D8D7D0` | Thin separators and restrained boundaries |
| Subtle surface | `#F1F0EC` | Available for functional surfaces, not decorative cards |
| Keyboard focus | `#365E70` | Visible 2px focus outline |
| Photograph border | `#53534D` | Restrained 1px border on the slideshow |
| Book cover | `#78504c` | Muted oxblood accent on project books |
| Cover type / picture mat | `#f4f1e9` | Pale lettering and inset photograph framing |
| Book leaves | `#f7f4ec`, `#eeeae0`, `#f2eee5` | Subtle separation between paper layers |

Use the shared `photo-*` Tailwind colors. Background, foreground, muted, border, and accent
variables are defined on `.photo-site` in `PhotoLayout.astro`; book-specific colors currently
live in ProjectBook and the opening animation. Promote repeated component colors into photography tokens when
another component needs them.

Avoid opacity suffixes such as `text-photo-muted/40` on the current hex-valued CSS variables:
they can produce an invalid color and fall back to inherited dark text. Use the named color
directly, or define an explicit compatible color token when a different tone is needed.

## Spacing and composition

- Share the photography page width (`72rem`) and reading width (`42rem`).
- Use the existing spacing scale: `photo-xs` = 0.5rem, `photo-sm` = 1rem,
  `photo-md` = 1.5rem, `photo-lg` = 2rem, `photo-xl` = 3rem, `photo-2xl` = 4rem.
- Page gutters use `clamp(1rem, 5vw, 3rem)`.
- Align content to a few clear edges. Keep repeated covers, image insets, title positions,
  and metadata aligned across a collection.
- Prefer generous empty space, open layouts, and thin rules. Add containers only when they
  represent something meaningful, such as an actual book cover or photograph mat.
- Center the slideshow in a stable flex viewing area between the header and utility row.
  Allow panoramas to use the available width, and tall photographs to fit the available height.
  Keep controls outside the image and preserve generous space for the hover lift.

## Header and navigation

- Put the small `← Main site` link in its own row above the photography navigation.
- Use the italic photographer's name on the left; Projects and About sit on the right.
- Use the existing underline treatment and `aria-current` for the active section.
- Use Heroicons for UI icons. Keep their proportions intact and align them optically with text.
- Retain visible keyboard focus and allow navigation to wrap on small screens.

## Photographs and project books

### Photographs

- When the homepage slideshow is empty, center a small pixel-art carousel slide projector
  above “Photographs coming soon.” and a short note about selecting photographs. Use the same
  muted palette, Georgia heading, and sans-serif summary as the project empty state.
  Place “Check back soon.” on its own line. Keep the original four-frame counterclockwise
  carousel motion and stationary body. After the tray settles, the red power switch flickers
  in two brief, irregular attempts, then goes dark. Use bright red-orange glass, a small amber
  core, and a restrained local glow; let brightness rise quickly and cool more slowly like a bulb. Keep the full lens visible, with no lens
  glow or projected beam. Play once after the artwork loads, then replay on hover, focus, or tap.
  Never loop; ignore retriggers while running. Reduced motion stays static.

- Preserve the full photograph's proportions in the slideshow and editorial content.
- The homepage image has a restrained 1px dark border and generous surrounding space.
- Cropping is acceptable for a deliberately composed book-cover thumbnail. Do not apply that
  crop to the photograph when it is shown as content.
- Alt text describes visible subjects and composition. Use confirmed location information;
  do not invent a setting. Avoid placeholders such as `N/A` or `test`.

### Project books

- The empty catalog shows a small pixel-art portrait of Rohan holding a rangefinder, with chunky pixels and a restrained, muted palette,
  followed by “No projects yet.” and “I’m out in the field making photographs. Check back soon.”
  Once all poses load, play a short stepped sprite animation: raise the camera from chest to chin
  to eye level, show one small pixel-shaped flash, then lower it to the resting pose. Keep the portrait itself stationary.
  Play the entrance once per page load without looping. Hover raises the camera to eye level
  and holds it there without a flash; pointer leave lowers it. Hover can interrupt the entrance
  without restarting it afterward. Clicking or pressing Enter/Space raises the camera and triggers
  one flash, with repeat clicks ignored until it finishes. Announce “Photo taken.” to assistive technology;
  reduced motion uses only that announcement. Reduced motion keeps the portrait still without a flash. Keep the empty state unframed, centered horizontally with centered text, and vertically balanced
  in a viewing area beneath the left-aligned Projects heading,
  with Georgia for the heading and the existing sans-serif summary style for the message.

- Covers use consistent 3:4 proportions, 14rem wide on small screens and up to 16rem on desktop, with square corners.
- A selected Sanity thumbnail appears as a small inset print with a pale mat inside the cover.
- Without a thumbnail, keep a plain colored cover with the title; do not invent an image.
- Put the title in a consistent lower-cover position. Below the book, provide a readable linked Georgia title, subdued status, and sans-serif description.
- Use a subtle spine, back cover, and three distinct paper layers to suggest a physical object.
- The oxblood cover supplies the color accent. Avoid adding random colors to metadata or controls.
- Project details resolve every published spread in Sanity order. One spread is one navigation
  step, including both columns; two-column spreads stack left before right on mobile.
- Reader controls sit centered beneath the spread: an unframed Heroicons previous
  chevron, a quiet upright sans-serif `1 / N` marker, and a next chevron. Keep 44px hit targets, disabled and subdued at the first
  and last spread, with no looping. A one-spread project disables both controls.
- Left/right arrow keys navigate except inside editable controls or with modifier keys.
  Announce the spread count to assistive technology. Disable navigation during book entry/exit.
  Spread changes are instant for now; the elaborate opening effect runs only on entry/exit.
- Project details use a viewport-filling reader variant of PhotoLayout, sharing its tokens,
  metadata, accessibility, and typography. Replace the main photography header with a persistent
  Projects back link and a small, muted italic Georgia running title centered above the
  spread (`font-photo text-photo-utility italic`). Keep descriptions on the catalog;
  omit them from the visible reader, leaving the bottom edge for progress and navigation.
- Place photographs and writing directly on the site background. No paper boxes, panel borders,
  or center divider in the settled reader. Keep full photograph proportions and responsive
  left-before-right stacking. Reserve the physical book treatment for covers and transitions.

## Motion and sound

Interaction should explain what is happening and stay subordinate to the photograph.

- Homepage photos change instantly, without a crossfade or page-flip transition.
- The slideshow loops continuously with a **15-second** interval, set by
  `SLIDESHOW_INTERVAL_MS` in `photo-slideshow.ts`.
- Hovering the photograph itself pauses playback and shows “Paused while viewing.” Show that message only when hover is what pauses autoplay; hide it when playback is
  already paused manually, by keyboard focus, or by reduced motion. Hovering
  empty space around the photo must not pause it. Leaving the photo resumes the interval.
- On pointer hover, the photo lifts slightly (scale 1.015) and tilts gently toward the cursor
  (about 1.2 degrees at the edges). Smooth the tilt with animation frames; do not restart a
  CSS transition on every pointer movement. It settles flat when the pointer leaves.
- A project book opens slightly from the spine on hover, revealing the paper layers in a fan.
  The current cover angle is 22 degrees with a 550ms ease; keep this a cover preview rather
  than a full opening animation.
- Clicking a project cover navigates to its own project URL. The entry prototype enlarges the
  selected cover over 552ms, holds for 207ms, then opens with a brief overlapping riffle of six layers. The cover turns over 1265ms;
  the paper leaves follow closely, with a slower final leaf settling around 2185ms.
  Fade the final paper leaf while it is still turning and reveal the stationary spread in
  that same movement; do not leave a blank sheet resting before the content appears.
  Every animated leaf is decorative paper. Never clone the content photograph into the animation:
  keep the real spread stationary and hidden until the final reveal, so it appears exactly once.
  Paper sheets bend through four joined strips, with an 11-degree curl at each free-edge
  joint and a gentle 3.5-degree reverse flex, then flatten before landing.
  Keep a continuous thin perimeter border on both faces of bending sheets, without
  outlining the internal strip joints.
  Preserve the cover's 3:4 proportions and leave room for perspective within the viewport.
  Anchor the spine at the horizontal center of the reader, independent of the first spread's
  column count. The closed cover sits right of the spine and opens into the left half.
  The back link remains visible and usable throughout. Projects return links reverse the entry
  choreography at 0.9775× speed, keeping the return close to the opening pace, when its geometry is still valid; direct visits and resized layouts use normal
  navigation. Mobile, reduced-motion, and JavaScript-disabled visits show content directly.
  Animate transforms instead of layout dimensions; do not animate the reader's geometry.
  Keep turning planes in 3D: parent opacity can flatten faces and flash mirrored lettering.
  Animation failure must never hide content or prevent navigation.
- Pointer effects apply to devices that support hover. Respect `prefers-reduced-motion`;
  disable tilt and book-opening motion, and preserve the slideshow's reduced-motion pause.
- Sound starts **off**. The utility control says “Enable sound” / “Disable sound.”
- Keep a visible pause/play control beneath the image, with the sound control alongside as
  secondary upright sans-serif utility text. No visible previous/next controls or image counter.
  Arrow-key image navigation remains available, and manual navigation pauses autoplay.
  Keyboard focus pauses autoplay; explicitly choosing Play can resume while keeping focus.
- Enabling sound unlocks audio silently. The next photo transition plays the appropriate clip.
- Playback gain is **0.2**. Every slideshow transition uses the same rangefinder shutter
  recording, regardless of camera metadata. The existing rangefinder audio field in Sanity
  supplies this shared sound; other camera recordings remain stored but are not used by
  the slideshow. If the shared recording is missing, remain silent.
- Audio must stop when muted or the page becomes hidden. Sound must never block image display.

## What to avoid

- Fake grain, distressed paper, sprocket holes, light leaks, or handwritten fonts.
- Gradients, glass effects, large shadows, rounded SaaS cards, or ornamental badges.
- Extra font families for individual components or projects without a deliberate design decision.
- Elaborate animation, constant motion, hidden pause behavior, or unsolicited audio.
- Redesigning the main personal site as a side effect of a photography change.

## Applying these rules

Before adding or changing a photography component, choose its typography role, reuse the
spacing and color tokens, and check whether an existing photography component already owns
the behavior. Prefer Tailwind for layout and typography; use small scoped CSS rules for
effects such as the layered book cover.

Review changed pages at desktop and mobile widths, including empty content, missing thumbnails,
long titles, keyboard focus, and reduced motion. Build the affected project. Sanity content is
read at static build time for deployed pages, so publishing content requires a site rebuild
before it appears there.

## Phone layouts

- Keep slideshow playback and sound controls on one row below the image; the hover-only status
  does not reserve space on narrow screens. Preserve desktop hover tilt and pause.
- Use 44px navigation hit areas and safe-area-aware gutters. Compact vertical spacing on short
  touch screens so playback controls remain in view; avoid a fixed minimum viewport height.
- Reader writing defaults to left alignment on phones and preserves authored block alignment,
  with the Projects link above it.
  Keep the marker and chevrons below a scrollable content area; two-column spreads stack in
  authored order without squeezing long writing into separate tiny scroll boxes.
- Serve responsive image candidates in the reader; keep image proportions and cap mobile reader images at 55svh. Book-entry motion requires
  a wide screen and a hover-capable pointer, avoiding the desktop animation on landscape phones.
