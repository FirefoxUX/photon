---
layout: page
title: Message Bars
order: 6
---

Message bars communicate specific information to a user. Display message bars at the top of the page or the section they apply to.

## Usage

Message bars contain concise and scannable text that is directly related to an action that has been completed or is about to be performed. They may include a single message or multiple messages. They should not be used to **Dismiss** or **Cancel**. It is **required** to have an icon precede the message(s).

Common use cases for message bars include: success messages, updates, warnings, problems and errors.

## Types

### Generic

<div class="grid-2" markdown="1">
![generic message bar example](../images/message-bars/generic.svg)

Convey general information or actions that aren’t critical. Update users about a change or give them advice. Include lower priority information and should be dismissible.
</div>

### Success

<div class="grid-2" markdown="1">
![success message bar example](../images/message-bars/success.svg)

Inform users when actions are successfully completed.
</div>

### Warning

<div class="grid-2" markdown="1">
![warning message bar example](../images/message-bars/warning.svg)

Display exceptions or information the user needs to act on.
</div>

### Error

<div class="grid-2" markdown="1">
![error message bar example](../images/message-bars/error.svg)

Communicate problems that must be addressed before a user can complete a task.
</div>

## Style

{% include components/message-bars/style-tabs-structure.md %}

## Behavior

### Dismissible

<div class="grid-2" markdown="1">
![Dismissable behavior](../images/message-bars/ghost-btn.svg)

Unless they contain critical information, message bars should be dismissible by clicking or tapping the ghost button, placed in the top right corner.
</div>

### Call to Action

<div class="grid-2" markdown="1">
![message bar in action](../images/message-bars/mb-action-example.svg)

<div markdown="1">
Add one or two [micro-buttons](buttons.html#micro) to the message bar if users need to take an action after reading the message.

{% include components/message-bars/behavior-tabs-structure.md %}
</div>
</div>

### Message on Multiple Lines

<div class="grid-2" markdown="1">
![message bar in action](../images/message-bars/mb-multilines.svg)

<div markdown="1">
It is possible for the message to wrap to multiple lines. This is especially likely on mobile, or if displayed in a small container.

In this case the [icon](#icon) and the [dismiss-button](#dismissible) remain aligned to the top.

The [call-to-action-buttons](#call-to-action) break into a new line below the message and are aligned to the start of the message.
</div>
</div>