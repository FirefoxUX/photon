### Sizes and Grid

<div class="grid-2" markdown="1">
![pairing example](../images/message-bars/s-gen.svg)

<div markdown="1">
Message bars have a fixed min-height. Width may vary depending on the content. The width may vary depending on the parent container. A message bar cannot grow more than its parent container.

**Width:** `auto` when placed in a large container

**Width:** `100%` when placed in a small container

**Min-height:** `32px`

**Corner Radius:** ` 4px`
</div>
</div>

### Typography

<div class="grid-2" markdown="1">
![pairing example](../images/message-bars/t-gen.svg)

<div markdown="1">
The body of the message should be contained within two lines. Be descriptive and include any troubleshooting actions.

**Message:** `Body 10` Type 13px Regular 400, leading 19px (1.4)

**Button:** `Body 10` Type 13px Regular 400, leading 19px (1.4)
</div>
</div>

## Type-specific Style

<div data-tabs>
  <input type="radio" name="tstyle" id="style-generic" checked="checked">
  <label for="style-generic">Generic</label>
  <div data-tab markdown="1">
{% include components/message-bars/style-generic.md %}
  </div>

  <input type="radio" name="tstyle" id="style-success">
  <label for="style-success">Success</label>
  <div data-tab markdown="1">
{% include components/message-bars/style-success.md %}
  </div>

  <input type="radio" name="tstyle" id="style-warning">
  <label for="style-warning">Warning</label>
  <div data-tab markdown="1">
{% include components/message-bars/style-warning.md %}
  </div>

  <input type="radio" name="tstyle" id="style-errors">
  <label for="style-errors">Errors</label>
  <div data-tab markdown="1">
{% include components/message-bars/style-error.md %}
  </div>
</div>