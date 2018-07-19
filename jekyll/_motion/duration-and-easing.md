---
layout: page
title: Duration and Easing
order: 1
---

A rigidly linear movement looks unnatural to the human eye. Accelerate and decelerate smoothly to help your animation feel more natural.

## Duration

Animations should last 150ms–250ms and should feel quick and responsive. Shorter animations are also more easily compiled by machines, helping to achieve the sensation of quick responsiveness.


## Easing

{% include motion/motion-curve.md %}

<table>
  <thead>
    <tr>
      <th><p>Platform</p></th>
      <th><p>Protocol</p></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p>CSS</p></td>
      <td><p><code>cubic-bezier(.07,.95,0,1)</code></p></td>
    </tr>
    <tr>
      <td><p>After Effects</p></td>
      <td>
        <p>Incoming Velocity: 70%</p>
        <p>Outgoing Velocity: 0%</p>
      </td>
    </tr>
  </tbody>
</table>

![Graph that displays the easing curve](../images/motion/motion-curve.svg)
