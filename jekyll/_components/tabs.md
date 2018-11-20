---
layout: page
title: Tabs
order: 8
---

Tabs are used to navigate to related destinations.

## Usage

- Don’t use tabs for destinations that are not related. Tabs should be connected by the same information object.
- Don’t load the entire page for tabs. Only the tabs and their content area should be changing when a user switches to another tab. Nothing else, including the position, should be changing. Users should feel like they are in the same place while alternating tabs. 
- Avoid long tab content load time. Tabs should be rapid switching.
- Don’t use multiple rows of tabs as they destroy spatial memory. Tabs should be presented in one row. 
- Don’t order tabs randomly. Order them based on user needs.
- Avoid using tabs for more than 1 navigation level as their relationship may be unclear to users. Tabs should be used for the lowest navigation level on the page. Use tabs for only one navigation level. 
- Don’t use tabs when users need to compare the content behind them.

There are some overlaps between Don'ts and Do's. Haven't which ones to include yet (whether we need both Don'ts and Do's). 

<img width="846" alt="image" src="https://user-images.githubusercontent.com/10877399/48795249-403ba600-ecca-11e8-9fa3-2df57037d373.png">

## Anatomy

- Container
- Active label
- Active indicator
- Inactive label
- Inactive indicator

## Style

- Tab line stroke
  - 2px
- Focused box
  - Box width: the same as the tab
  - Box height: the same as the container
- Tab width
  - Dividing the number of tabs by the screen/panel width
  - Changes with labels (can align to the left, right, or middle): 16px padding for body 20, 8px padding for body 10
- Tab container height
  - 48px for body 20
  - 32px for body 10
  
**Light theme**
- Active tab indicator (tab line)
  - Blue 50
- Active tab text label
  - Blue 60
- Inactive tab text label
  - Grey 90 a80

**Dark theme**
- Active tab indicator (tab line)
  - Blue 50
- Active tab text label
  - Blue 40
- Inactive tab text label
  - Grey 10 a80

**Text sizes**
- Same size as the body text (may be either Body 10 or 20 since there are only two body font sizes)
  - Body 10 (line height 16) - so it can fit an icon that is 16
  - Body 20 (line height 24) - so it can fit an icon that is 24

## States

**Light theme**
- Hover tab indicator
  - Grey 90 a10
- Hover tab overlay
  - Grey 90 a10
- Pressed tab indicator
  - Grey 90 a20
- Pressed tab overlay
  - Grey 90 a20
- Focused box
  - like button

**Dark theme**
- Hover tab indicator
  - Grey 10 a20
- Hover tab overlay
  - Grey 10 a10
- Pressed tab indicator
  - Grey 10 a20
- Pressed tab overlay
  - Grey 10 a20
- Focused box
  - like button

## Behavior

**When there are too many tabs on the right or left, an arrow appears and it becomes scrollable (light theme theme)**
- Divider
  - Grey 90 a20
- Icon fill
  - Grey 90 a80
- Gradient
  - Linear bg-color to transparent
- Icon hover
  - Grey 90 a10
- Icon pressed
  - Grey 90 a20
 
**When there are too many tabs on the right or left, an arrow appears and it becomes scrollable (dark theme)**
- Divider
  - Grey 10 a20
- Icon fill
  - Grey 10 a80
- Gradient
  - Linear bg-color to transparent
- Icon hover
  - Grey 10 a10
- Icon pressed
  - Grey 10 a20

**Long labels**
- Gradient Linear bg-color to transparent

![image](https://user-images.githubusercontent.com/1721875/47156757-10266f00-d2e8-11e8-8ec5-0a36de118fc4.jpg)
![image](https://user-images.githubusercontent.com/1721875/46953988-a1e76f80-d08f-11e8-9384-2790f8a22afa.jpg)
![image](https://user-images.githubusercontent.com/1721875/47156799-29c7b680-d2e8-11e8-9ae0-56e18e597b71.jpg)

**The tab bar can be fixed at the top or scroll off the screen**

## Copy

- Sentence case
- Short
- Concise
- Should be indicative of what is in the tab

## Accessibility

There are some useful guidelines on implementing tabs technology-wise: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role, https://inclusive-components.design/tabbed-interfaces/, and https://de.ryerson.ca/wa/aria/jquery/tabpanels.html#?1541694847079#goto_tabsdemo-3. 

What I got from the MDN link:
<img width="1421" alt="image" src="https://user-images.githubusercontent.com/10877399/48795866-12576100-eccc-11e8-9aa5-c4e8ca5a4e91.png">
