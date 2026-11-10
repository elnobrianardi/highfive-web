# Recolor About Us / Agency imagery: purple → brand orange

## Goal

Change the pink and purple backgrounds baked into the About Us section images to the brand orange so the photos match the orange accent text.

Target color is the existing token:

```
--primary-color: #ff7425   // src/styles/abstracts/_variables.scss
```

In HSL that is **hue 21.7deg, saturation 1.0, lightness 0.573**.

Saturation is **1.0**, not 0.855. This was initially miscalculated and produced a
washed-out salmon (`#ec9462`) instead of brand orange. Any future tuning must use
`s = 1.0`.

## Scope decision

Recolor **in place**, same filenames. No component or SCSS changes.

`Agency` is shared by three pages, so the homepage will also show orange:

- `src/pages/about-us.tsx`
- `src/pages/index.tsx`
- `src/pages/index-light.tsx`

This was explicitly approved as desired for brand consistency.

## Files affected

| File | Why |
|---|---|
| `public/images/agency/images1.jpg` | `.thumb-one` — purple field, lavender shirt, pink hearts |
| `public/images/agency/banner.jpg` | `.thumb-two` — flat purple background behind UI mockup |

Both are imported as static modules in `src/components/containers/home/Agency.tsx`, so filenames and dimensions must not change.

## Why not a CSS trick

`src/styles/sections/_all-sections.scss` `.agency__thumb img` only sets `border-radius: 20px`. There is no overlay, filter, or blend layer. The background color is pixel data, so it must be rewritten in the image itself.

A plain CSS `filter: hue-rotate()` is also unsuitable: it would shift skin tones and red hair, not just the background.

## Why not a global hue rotation

The photos contain:

- a person with **red hair**, hue roughly 0-10deg
- **skin tones**, hue roughly 10-45deg
- **pink heart icons**, hue roughly 335-350deg
- **flat purple / lavender background**, hue roughly 255-300deg
- a **light lavender shirt**, hue roughly 258-265deg

A blanket rotation would wreck the subject. The pass must be **band limited**: only remap pixels whose hue falls inside a purple/magenta window, and leave everything else pixel identical.

## Approach

One-off Node script using `sharp`, which is already in dependencies and is the same library `next/image` uses at build time. Nothing to install.

Steps per pixel:

1. Convert RGB to HSL.
2. Compute a mask weight. Inside the purple window the weight is 1, feathering to 0 at the window edges so gradients and soft shadows do not posterize.
3. For masked pixels, rotate hue from the measured purple toward 21.7deg. The
   shipped images were produced by **keeping the source saturation and
   lightness** — that is what preserved gradient falloff, bokeh, and the folds
   and shading of the shirt instead of flattening them into a solid orange slab.
4. Blend the result back by the mask weight so unmasked pixels are untouched.
5. Encode at `mozjpeg` quality 92 with `chromaSubsampling: "4:4:4"`, keeping the
   original width, height, and format.

Note: `plans/scripts/recolor-agency-images.mjs` was later edited to add a
TARGET_SAT 1.0 plus blurred-local-mean lightness normalisation. That version was
**never run** on the delivered files, so the script on disk no longer reproduces
the shipped output exactly.

### Mask windows (as shipped)

Measured source backgrounds:

| Image | hue | sat | lum |
|---|---|---|---|
| `images1.jpg` | 256-264 | 0.43-0.65 | 0.78-0.85 |
| `banner.jpg` | 286 | 0.50 | 0.66 |

Unmasked and protected:

- 12-48deg: skin, keep
- 348-10deg: red hair, LIVE badge, pink hearts, keep
- 210-232deg: blue UI and icons, keep

Remapped:

- **232-334deg** with a 20deg feather inside each boundary

The lower bound started at 250, which left visible **blocky lavender patches**.
Cause: JPEG 4:2:0 chroma subsampling drags background pixels near the subject and
near white UI text down to ~240, so they fell outside the window and survived.
Two fixes were required together — widening the floor to 232 **and** re-encoding
at 4:4:4 so no new subsampling artifacts are introduced.

Saturation guard: `SAT_MIN = 0.075` with a 0.12 feather, so near-grey whites,
the white UI frames and neutral shadows stay neutral. This stops the white chat
bubbles and phone frame picking up an orange cast.

Lightness guard: fade out below 0.14 and above 0.86 so near-black shadows and
near-white surfaces keep their exact tone.

## Second pass: the USP collage gutters

`public/images/usp/thumbtwo.webp` is a collage of photo tiles separated by a
uniform pink gutter (`#e83278`), rendered in
`src/components/containers/home/HighFiveUSP.tsx`. The gutter was recoloured to
`#ec9462` so it matches the About Us banner.

A hue-window pass is **not usable here**: the collage contains a pink dress, a
flamingo, magenta swatches and a pink-sunglasses tile that share the gutter's
hue. A hue mask would have repainted them too.

The shipped solution, in `plans/scripts/recolor-usp-gutters.mjs`, is a
**border-seeded flood fill**:

1. Seed from every border pixel within tolerance 42 of `#e83278`.
2. Flood fill on a 4-neighbour basis, so only gutter pixels *connected to the
   image edge* are visited. Interior tiles are never reached.
3. Repaint reached pixels to `#ec9462`.
4. A second "halo" pass blends unfilled neighbours within tolerance 85 at
   strength 0.65, which removes the anti-aliased fringe.

Result: gutter pixels changed, every photo tile byte-identical. It is safe to
re-run if the collage is ever replaced, provided the gutter colour is unchanged.

## Verification

1. Read each output file back as an image and inspect it.
2. Confirm the background reads as brand orange.
3. Confirm skin, red hair, pink hearts and the blue phone UI are unchanged.
4. Confirm the previously-lavender shirt reads as a warm orange/amber tint that
   still shows its folds rather than a flat blob.
5. For the USP collage, confirm no photo tile was altered.
6. Run `npm run build`. Static image imports must still resolve and pages must
   type-check.

## Rollback

All three files are tracked by git, so a single command restores them:

```
git checkout -- public/images/agency/banner.jpg public/images/agency/images1.jpg public/images/usp/thumbtwo.webp
```

Copies of the two agency originals are also kept in `plans/assets/originals/`
for comparison. That directory lives outside `public/`, so nothing extra is
served or bundled.

## Deliberately not changed

`public/images/usp/thumbone.jpg` (the bedroom / makeup-video photo) was left
untouched by request. Attempts to recolour its room tones produced contour
banding on the walls and green artefacts, because its background is a very
low-chroma, bright gradient (sat 0.10-0.23, lum 0.74-0.91) that is not cleanly
separable from the pillows and bedding by hue alone. The original file is
unmodified.
