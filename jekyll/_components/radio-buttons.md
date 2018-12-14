---
layout: page
title: Radio Buttons
order: 7
---

Radio buttons allow a selection of one option from a group of mutually exclusive options.

## Usage

<div class="grid-2" markdown="1">
![Usage Example of Radio Buttons as used in Firefox Options](../images/components/radio-buttons/radiobutton-usage.png)

Use radio buttons to provide people with a choice from a set of two to five mutually exclusive options. For example to offer a choice of how to save downloads.
</div>

## Combination

### Label Groups of Radio Buttons

Start every group of radio buttons with a label that defines what these options are about.

### Between 2-5 Choices

<div class="grid-2">
<div markdown="1">
![Example of the correct use of Radio Buttons in a Group of Four](../images/components/radio-buttons/radiobutton-group.svg)

{% include global/do.md %}

<figcaption>Combine radio buttons in groups of two to five mutually exclusive choices.</figcaption>
</div>
<div markdown="1">
![Example of a wrong use of Radio Buttons by using only one Radio Button](../images/components/radio-buttons/radiobutton-single-dont.svg)

{% include global/dont.md %}

<figcaption>Never use one radio button on it’s own, consider using a checkbox instead.</figcaption>
</div>
<div></div>
<div markdown="1">
![Example of a wrong use of Radio Buttons by using only one Radio Button](../images/components/radio-buttons/radiobutton-biggroup-dont.svg)

{% include global/dont.md %}

<figcaption>For more than five choices, consider other options. Those could be a drop down or a reduction of choices.</figcaption>
</div>
</div>

### Always Exactly One Selected Choice

In any groups of radio buttons, one must always be selected. Do not use a group of radio buttons if no selected button is an option.

<div class="grid-2">
<div markdown="1">
![Example of the correct use of Radio Buttons in a Group of Four](../images/components/radio-buttons/radiobutton-group.svg)

{% include global/do.md %}
</div>
<div markdown="1">
![Example of a wrong use of Radio Buttons by using only one Radio Button](../images/components/radio-buttons/radiobutton-group-inactive-dont.svg)

{% include global/dont.md %}

<figcaption>Once an option is selected, this state cannot be reached by the user again.</figcaption>
</div>
</div>

### Consider the Order of Choices

* Make the default the first choice if possible.

* If choices describe a range of impact to browsing behavior, order them from greatest impact to least impact. Do not force default to top if it breaks the sequence.

## Style

<div class="grid-2" markdown="1">
Radio Buttons consist of a part to indicate their state and a label to describe the choice it represents.

> Use the [Sketch Libary Component - Radio&#8209;Button](../images/components/radio-buttons/Photon Design System - Components - Radio-Buttons.sketch).
</div>

### Indicator & Label

<div class="grid-2" markdown="1">
![Example of a selected and an unselected radio button.](../images/components/radio-buttons/radiobutton-states.svg)

<div markdown="1">
Use the indicator to show whether the radio button is selected or not.

Use the label to make the choice clear.
</div>
</div>

### Dimensions

<div class="grid-2" markdown="1">
![Illustration of the Size of a Radio Button.](../images/components/radio-buttons/radiobutton-size.svg)

<div markdown="1">
Corner Radius: `100%`

Height: `16px`

Width: `16px`

Horizontal Padding: `4px`
</div>
</div>

### Text and Color

<div class="grid-2" markdown="1">
![Illustration of a selected Radio Button.](../images/components/radio-buttons/radiobutton-selected.svg)

<div markdown="1">
Text: [Body 10](../visuals/typography.html#scale)

Text Color: Grey 90 `#0c0c0d`
</div>
</div>

## Behaviors

### Selected / Unselected

<div class="grid-2">
<div markdown="1">
![Example of a selected and an unselected radio button.](../images/components/radio-buttons/radiobutton-states.svg)

<div class='interactive'>
  <div id="select-unselect-example" class="interactive-example" style="display: none;">
    <div class="container-demo">
      <div class="radiobutton-wrapper">
        <div class="group-radio-buttons">
          <input name="group1" class="track-clicks" id="radio-01" checked="" type="radio">
          <label for="radio-01">Show browsing history</label>
        </div>
        <div class="group-radio-buttons">
          <input name="group1" class="track-clicks" id="radio-02" type="radio">
          <label for="radio-02">Show bookmarks</label>
        </div>
      </div>
    </div>
  </div>
  <figcaption>
    <a href="#" class="image-toggle" onclick="document.getElementById('showImage').style.display='block';
                                              document.getElementById('select-unselect-example').style.display='none';
                                              return false;">Image</a> /
    <a href="#" class="interactive-toggle" onclick="document.getElementById('showImage').style.display='none';
                                                    document.getElementById('select-unselect-example').style.display='block';
                                                    return false;">Interactive example</a> (Currently only renders correctly in Firefox.)
  </figcaption>
</div>
</div>
<div markdown="1">
#### Selected:

Icon: [Radio-Button-Marker](../images/components/radio-buttons/radiobutton-marker-16.svg)

Background Color: Blue 60 `#0060df`

#### Unselected:

Background Color: Grey 90 a10 `rgba(12, 12, 13, 0.1)`

Border: 1px Grey 90 a30 `rgba(12, 12, 13, 0.3)`
</div>
</div>

### Clicktarget
<div class="grid-2" markdown="1">
![Illustration of the extent of the clicktarget of a Checkbox.](../images/components/radio-buttons/radiobutton-clicktarget.svg)

<div markdown="1">
A radio button can be selected by clicking on the area of its indicator as well as its label. Usually the clicktarget extends to the same width for each element in a collection of radio buttons. This results in a click target that extends beyond the label, for all elements shorter than the longest.

Clicking a radio button selects it on release of the click. If, during the click, the mouse is moved off of the radio button, it does not become selected.
</div>
</div>

### Interaction

#### Selected

<div class="grid-2" markdown="1">
![Illustration of all appearances a selected radio button can show when interacted with.](../images/components/radio-buttons/radiobutton-interaction-selected.png)

<div markdown="1">
Background Color:

Default: Blue 60 `#0060df`

Hover: Blue 70 `#003eaa`

Pressed: Blue 80 `#002275`
</div>
</div>

#### Unselected

<div class="grid-2" markdown="1">
![Illustration of all appearances an unselected radio button can show when interacted with.](../images/components/radio-buttons/radiobutton-interaction-unselected.png)

<div markdown="1">
Background Color:

Default: Grey 90 a10 `rgba(12, 12, 13, 0.1)`

Hover: Grey 90 a20 `rgba(12, 12, 13, 0.2)`

Pressed: Grey 90 a30 `rgba(12, 12, 13, 0.3)`
</div>
</div>

#### Focused

<div class="grid-2">
<div>
<div class="interactive">
  <div id="focus-example" class="interactive-example">
    <div class="container-demo">
      <div class="radiobutton-wrapper">
        <span>When Nightly Starts</span>
        <div class="group-radio-buttons">
          <input name="group2" class="track-clicks" id="radio-focus-1" checked="" type="radio">
          <label for="radio-focus-1">Show your home page</label>
        </div>
        <div class="group-radio-buttons">
          <input name="group2" class="track-clicks" id="radio-focus-2" type="radio">
          <label for="radio-focus-2">Show a blank page</label>
        </div>
        <div class="group-radio-buttons">
          <input name="group2" class="track-clicks" id="radio-focus-3" type="radio">
          <label for="radio-focus-3">Show your windows and tabs from last time</label>
        </div>
      </div>
    </div>
  </div>
</div>

<figcaption>Interactive example (Currently only renders correctly in Firefox.)</figcaption>
</div>
<div markdown="1">
Border: none

Box Shadow: `0 0 0 1px #0a84ff inset, 0 0 0 1px #0a84ff, 0 0 0 4px rgba(10, 132, 255, 0.3)`
</div>
</div>

## Copy Rules

* Use the imperative voice for radio button labels.
    
* Do not use terminal punctuation for radio button labels.
    
* Maintain parallel construction for lists of related radio button labels.
