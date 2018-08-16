<div data-tabs>
  <input type="radio" name="tbehaviour" id="behaviour-generic" checked="checked">
  <label for="behaviour-generic">Generic</label>
  <div data-tab markdown="1">
{% include components/message-bars/behaviour-generic.md %}
  </div>

  <input type="radio" name="tbehaviour" id="behaviour-success">
  <label for="behaviour-success">Success</label>
  <div data-tab markdown="1">
{% include components/message-bars/behaviour-success.md %}
  </div>

  <input type="radio" name="tbehaviour" id="behaviour-warning">
  <label for="behaviour-warning">Warning</label>
  <div data-tab markdown="1">
{% include components/message-bars/behaviour-warning.md %}
  </div>

  <input type="radio" name="tbehaviour" id="behaviour-errors">
  <label for="behaviour-errors">Errors</label>
  <div data-tab markdown="1">
{% include components/message-bars/behaviour-error.md %}
  </div>
</div>