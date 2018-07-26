### Sizes and Grid

![pairing example](../images/message-bars/s-gen.svg)

Message bars have a fixed min-height. Width may vary depending on the content. The width may vary depending on the parent container. A message bar cannot grow more than its parent container.

**Width:** `auto` when placed in a large container

**Width:** `100%` when placed in a small container

**Min-height:** `32px`

**Corner Radius:** ` 4px`

### Typography

![pairing example](../images/message-bars/t-gen.svg)

The body of the message should be contained within two lines. Be descriptive and include any troubleshooting actions.

**Message:** `Body 10` Type 13px Regular 400, leading 19px (1.4)

**Button:** `Body 10` Type 13px Regular 400, leading 19px (1.4)

## Type-specific Style

Generics

{% include components/message-bars/style-generic.md %}

Success

{% include components/message-bars/style-success.md %}

Warning

{% include components/message-bars/style-warning.md %}

Errors

{% include components/message-bars/style-error.md %}
