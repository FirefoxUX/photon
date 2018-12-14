---
layout: page
title: Doorhangers
order: 3
draft: true
---

Doorhangers provide a way to present decisions to users which is less intrusive than a modal dialog.

## Usage

<div class="grid-2" markdown="1">
![Firefox action menu uses the doorhanger component](../images/components/doorhangers/doorhanger-usage.png)

Doorhangers are used for prompt and notification; they are used for full featured UI; or they are used for list and menu as in the example on the left.
</div>

## Structure

### Directional Arrow

<div class="grid-2" markdown="1">
![Directional arrow used on the right and on the left of a doorhanger](../images/components/doorhangers/doorhanger-pointer.svg)

<div markdown="1">
Doorhangers opening on the right side of the view show the directional arrow on the right.

Doorhangers opening on the left side of the view show the directional arrow on the left.

Never place the directional arrow at the center of doorhangers.
</div>
</div>

## Style

### Background and Border Colors

<div class="grid-2" markdown="1">
![Empty doorhanger](../images/components/doorhangers/doorhanger-color.svg)

<div markdown="1">
Background: White `#ffffff`

Border Color: Grey 90 a20 `rgba(12, 12, 13, 0.2)`
</div>
</div>

### Corner Radius

<div class="grid-2" markdown="1">
![Doorhanger sharp corner radius on Windows](../images/components/doorhangers/doorhanger-radius-win.png)

On Windows doorhangers have sharp corners.

![Doorhanger round corner radius on macOS](../images/components/doorhangers/doorhanger-radius-macos.png)

<div markdown="1">
On macOS and Linux doorhangers have rounded corners.

Corner Radius: `2px`
</div>
</div>

### Shadows

<div class="grid-2" markdown="1">
![Highlight of the doorhanger shadow](../images/components/doorhangers/doorhanger-shadow.png)

Doorhangers appear above other in-view elements. Use [shadow 30](../patterns/shadows.html#style) to highlight elevation.
</div>

### Sizes

<div class="grid-2" markdown="1">
![Redlines and specs of a doorhanger](../images/components/doorhangers/doorhanger-sizes.svg)

<div markdown="1">
Directional Arrow Height: `9px`

Directional Arrow Margin Left: `16px`

Directional Arrow Width: `18px`

Maximum Height: `90%`

Maximum Width: `320px`
</div>
</div>

## Behavior

Clicking outside of the active area dismiss doorhangers.

When doorhangers content is longer than 90% of the view make the content vertically scrollable.
