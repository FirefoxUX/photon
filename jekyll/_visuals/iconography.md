---
layout: page
title: Iconography
order: 0
---

Firefox icons are informative, fun and friendly.

## Icon Construction

{% include iconography/icon-construction.md %}

### Grid

Most Firefox for desktop icons live on a **16×16** pixel grid. Some specific small icons, used in rare cases, live on a **12×12** pixel grid. Keep icon shape weighted towards the middle area of the grid, reserving the outer 1px margin for visual weighting and maintaining relative aspect ratios. Designing with the pixel grid on helps ensure that icons will not appear fuzzy in production.

{% include iconography/icon-grid.md %}

Firefox for Android icons are ** 20×20**, with a bounding box of 24×24, according to Material Design specs. Firefox for iOS icons live on a **24×24** grid.

{% include iconography/icon-grid-mobile.md %}

### Shape

Use positive and negative space to create the icon shape. When lines principally shape your icon, use a 2px stroke for the foundation and a 1px line for extra details. Rounded end caps and rounded line joins keep the icon smooth and friendly. On **12×12** icons, consider whether to use a 1px stroke or to go solid.

{% include iconography/icon-shape.md %}

When you have two rounded corners running parallel, the outer corner has a larger radius, set on 3px, than the one on the inside, set on 1px.

{% include iconography/icon-border.md %}

**On iOS**, use 3px strokes for the foundation and 2px strokes for the details to keep a consistent look and feel across platforms. Align icons in the northwest corner when required.

![example with difference sizes for difference platforms](../images/icons/icon-shape-stroke-different-platform.svg)

<figcaption>How the shape changes according to the platform</figcaption>

## Export Your Icon


Before exporting your icons, be sure to expand all the shapes and strokes overlapping each other. Remember to remove unnecessary anchor points to keep the icon as simple as possible.


Name the artboard with the icon name. The name should describe the action of the icon, and not the icon itself. For example, when using a star as a metaphor for bookmarking, use *bookmark*, and not *star* as the name. Add a hyphen (`-`) to underline variations in the icon.

{% include iconography/icon-naming.md %}

Finally, save your icon as SVG (and .png if you're working on mobile).

> If you are using Sketch, be sure to install the [SVGO Compressor by Bohemian Coding](https://github.com/BohemianCoding/svgo-compressor).

## Color

{% include iconography/icon-color-examples.md %}

### States

{% include iconography/as-button.md %}

## Accessibility

All icons should have a text-based equivalent for screen readers. If your icon allows interactivity, give it a text label.

