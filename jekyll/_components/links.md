---
layout: page
title: Links
order: 5
---

Link is text that users can select to access websites or subsequent pages.

## Usage

<div class="grid-2" markdown="1">
![A link UI example](../images/link/usage.svg)

Use text links to guide users to a webpage or a content page in the browser or to anchor users to a section within a page. For an action that results in a change to Firefox, use a button instead. [See buttons](buttons.html)
</div>

## Types

### Internal link

<div class="grid-2" markdown="1">
![internal link example](../images/link/Internal-link.svg)

An internal link directs users to a page inside the Mozilla properties (e.g., SUMO, Pocket) or anchors users to a specific section on the same page.
</div>

### External link

<div class="grid-2" markdown="1">
![external link example](../images/link/External-link.svg)

<div markdown="1">
An external link directs users to a page not produced by or affiliated with Mozilla.

An [Open In New](http://design.firefox.com/icons/viewer/#open) icon should be paired with the external link.
</div>
</div>

## Styles

All platforms (except for Linux) follow the spec below. On Linux, use the system color for links.

### Typography

<div class="grid-2" markdown="1">
![font style of the link](../images/link/typography.svg)

Font size: Same as the body text\\
Font weight: Normal
</div>

### Behaviors

<div class="grid-2" markdown="1">
![normal state example](../images/link/link-normal.svg)

**Normal**\\
Font color: Blue 60 `#0060df`

![hover state example](../images/link/link-hover.svg)

**Hover**\\
Font color: Blue 60 `#0060df`

![pressed state example](../images/link/link-pressed.svg)

**Pressed**\\
Font color: Blue 70 `#003eaa`

![focused state example](../images/link/link-focused.svg)

**Focused**\\
Box Shadow: `0 0 0 2px #0a84ff, 0 0 0 6px rgba(10, 132, 255, 0.3)`
</div>

## Placement

A link may stand alone after a sentence or an option. To highlight the relationship, place the link next to the sentence or option.

<div class="grid-2">
<div markdown="1">
![use 8px for margin between a link and a body](../images/link/position-do.svg)

{% include global/do.md %}
</div>
<div markdown="1">
![do not use margin larger than 8px](../images/link/position-dont.svg)

{% include global/dont.md %}
</div>
</div>

## Copy Rules

* Links should be sentence case when embedded in a sentence or when standing alone (e.g., Learn more).

* Do not use ellipses in a link to indicate that there is more information available at the destination. This should be assumed.

* Do not use punctuation at the end of the link, or navigation element unless you are using an exclamation point or question mark or the link is embedded in running text.
