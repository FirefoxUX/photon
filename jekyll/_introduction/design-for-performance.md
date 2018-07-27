---
layout: page
title: Design for Performance
order: 2
---

Firefox products should look and feel fast!

## Elements of Performance

The perception of performance is largely determined by four factors: *Duration*, *Responsiveness*, *Fluency* and *Tolerance*.

### Duration

Duration is the actual duration that a process takes. This is the element that is often referred to as “performance” in technical discussions. Different magnitudes of duration require different treatments to achieve an optimal perceived performance.

<table>
  <thead style="vertical-align: top;">
    <tr>
      <th>Terminology</th>
      <th>Duration</th>
      <th>Response</th>
    </tr>
  </thead>
  <tbody style="vertical-align: top;">
    <tr>
      <td><strong>Instantaneous</strong></td>
      <td>up to 100ms</td>
      <td>Acknowledge user input within this time frame. Ideally, a visible process towards the completion of the task begins within this time span.</td>
    </tr>
    <tr>
      <td><strong>Immediate</strong></td>
      <td>500–1000ms</td>
      <td>Answers to simple requests must be completed within this time frame (e.g., opening a new window).</td>
    </tr>
    <tr>
      <td><strong>Continuous</strong></td>
      <td>2000–5000ms</td>
      <td>Answers to complex questions must be completed within this time frame (e.g., loading a web page).</td>
    </tr>
    <tr>
      <td><strong>Captive</strong></td>
      <td>7000–10000ms</td>
      <td>Users will begin switching tasks at this point. If a process takes longer than this, it should be segmented.</td>
    </tr>
  </tbody>
</table>

> Why Performance Matters by Denys Mishunov [Part 1](https://www.smashingmagazine.com/2015/09/why-performance-matters-the-perception-of-time/), [Part 2](https://www.smashingmagazine.com/2015/11/why-performance-matters-part-2-perception-management/), [Part 3](https://www.smashingmagazine.com/2015/12/performance-matters-part-3-tolerance-management/).

### Responsiveness

Responsiveness is the perceived time it takes the system to respond to user input.

Example: An empty dialog appearing immediately after a click and then taking a second to populate with content feels faster than the same dialog appearing with a second delay, but fully populated.

<div class="grid-2">
<div markdown="1">
<iframe src="{{ "/interactives/introduction/performance-principles/responsiveness/example-do.html" | prepend: site.baseurl }}" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

{% include global/do.md %}
</div>

<div markdown="1">
<iframe src="{{ "/interactives/introduction/performance-principles/responsiveness/example-dont.html" | prepend: site.baseurl }}" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

{% include global/dont.md %}
</div>
</div>

### Fluency

Fluency is the perceived smoothness of a process. It could also be described as a measure for how hard the machine appears to be working. Aim for constant 60 frames per second.

Example: A stuttering progress indicator gives the impression of lower performance, regardless of the actual duration of the process.

<div class="grid-3">
<div markdown="1">
<iframe src="{{ "/interactives/introduction/performance-principles/fluency/example-do.html" | prepend: site.baseurl }}" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

{% include global/do.md %}
</div>

<div markdown="1">
<iframe src="{{ "/interactives/introduction/performance-principles/fluency/example-dont.html" | prepend: site.baseurl }}" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

{% include global/dont.md %}
</div>

<div markdown="1">
<iframe src="{{ "/interactives/introduction/performance-principles/fluency/example-fallback.html" | prepend: site.baseurl }}" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

{% include global/do.md %}
</div>
</div>

### Tolerance

Tolerance is a measure of how long the user expects a process to take and at what point they will abandon or cancel the process.

Example: The tolerated duration for loading a web page is much longer than for saving a bookmark.

<div class="grid-2">
<div markdown="1">
<iframe src="{{ "/interactives/introduction/performance-principles/tolerance/example-do.html" | prepend: site.baseurl }}" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

{% include global/do.md %}
</div>

<div markdown="1">
<iframe src="{{ "/interactives/introduction/performance-principles/tolerance/example-dont.html" | prepend: site.baseurl }}" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

{% include global/dont.md %}
</div>
</div>

### Bias and Priming

A user’s preconception about the speed of something – based on brand or prior knowledge – influences the perception of time.

Example: Users perceived a browser as being faster after reading an article about that browser having improved performance recently.

## Other Influencing Factors

These factors can also influence the perception of performance:

* Perceived task complexity
* Emotional state
* UI complexity and visual noise
* Trends
* Task frequency, attempts, failures

> Literature to detail the concepts explained above.
>
> [Designing and Engineering Time: The Psychology of Time Perception in Software](https://www.safaribooksonline.com/library/view/designing-and-engineering/9780321562944/) by Steven C. Seow Ph.D.
>
> [Thinking, fast and slow](https://openlibrary.org/works/OL15992072W) by Daniel Kahneman.
>
> [Designing with the mind in mind](https://openlibrary.org/works/OL15570641W) by Jeff Johnson.
