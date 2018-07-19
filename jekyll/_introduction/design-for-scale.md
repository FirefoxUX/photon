---
layout: page
title: Design for Scale
order: 1
---

These guidelines help you decide when it is important for your product or feature to use Firefox design language and when it is preferable to follow platform conventions.

Note that the guidelines below are prioritized. So align your work with the higher guideline before considering the next one.

## Reuse What’s There

When building something new, try to reuse what we already have built and documented in Photon. This will make it feel familiar to Firefox existing users, and will be implemented quicker. Do not force it though. If it doesn’t fit, it doesn’t fit.

## Prioritize Higher Visibility Work

The higher the expected visibility on parts of your work, the more important it is to align to Photon. If very limited visibility is expected, full alignment is of lower priority. Use platform components until you have time to better align.

Do not consider tradeoffs in very high visibility areas and loop in other designers working on that product or feature across platforms.
  
{% include introduction/prioritize-higher-visibility-work.md %}

## Balance Firefox Style and Platform Conventions

Do strike a balance between adapting too much platform and too little. It is especially important to stay clear of the Uncanny Valley.

Use our styles for visual appearance and tone, and use platform conventions for any pattern that is well established on a given platform. This will make the product or feature feel familiar to new users and still convey our style.

{% include introduction/uncanny-valley.md %}

### When to use Platform Patterns

* When you don't want to break expectations about high level common platform functionality.

  *Using a platform system font creates platform cohesion and familiarity. Using a different font (like Comic Sans) would make the experience feel foreign and potentially off-putting.*

* When a UI pattern, appearance, or metaphor is so common deviating would cause user confusion or discomfort.

  *If window controls like Close, Minimize and Maximize are always on the left, moving these to the right would cause significant user confusion.*

* When a non-essential UI pattern, appearance, or metaphor enhances your product and helps close any uncanny valley gaps (strategic use of platform “flavor”).

  *Using Windows system colors or macOS / iOS blur effects conforms to a common platform pattern and reinforces nativeness.*

### When to *deviate* from Platform Patterns

* When a UI pattern is common on other platforms or the web and is unlikely to cause discomfort or confusion.

  *While a hamburger or meatball menu is not always a native element of a platform, it has a strong presence on other common platforms and doesn’t conflict with other strong platform conventions.*

* When a UI pattern, appearance or metaphor doesn’t break any firm platform conventions but does enhance your UI or further other product goals.

  *In Content UI Surfaces (Preferences, Add-ons, etc.) are not a common UI pattern on many platforms, but do fit within Firefox’s UI and are an improvement for keeping all of our UI contained to one window.*

  *Using Custom UI Colors deviates from common platform colors but is unlikely to cause confusion and further reinforces our custom brand and character.*

## Related Platform Guidelines

<table>
  <thead>
    <tr>
      <th><p>Platform</p></th>
      <th><p>Guideline</p></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p>Android</p></td>
      <td><p><a href="https://material.io/guidelines/">Material Design</a></p></td>
    </tr>
    <tr>
      <td><p>iOS</p></td>
      <td><p><a href="https://developer.apple.com/ios/human-interface-guidelines/">iOS Human Interface Guidelines</a></p></td>
    </tr>
    <tr>
      <td><p>Linux</p></td>
      <td><p><a href="https://developer.gnome.org/hig/stable/">GNOME Human Interface Guidelines</a>.<br>And others depending on distribution</p></td>
    </tr>
    <tr>
      <td><p>macOS</p></td>
      <td><p><a href="https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/OSXHIGuidelines/">macOS Human Interface Guidelines</a></p></td>
    </tr>
    <tr>
      <td><p>Web</p></td>
      <td><p><a href="../welcome.html">Photon Design System</a></p></td>
    </tr>
    <tr>
      <td><p>Windows</p></td>
      <td><p><a href="https://developer.microsoft.com/en-us/windows/apps/design">Windows Fluent Design System</a></p></td>
    </tr>
  </tbody>
</table>
