{% case include.type %}
  {% when 'Warning' %}

  <span class="warning" markdown="1">
  ![Excamation Mark in a Triangle.](../images/global/warning-16.svg)
  {{ include.text }}
  [ {{include.button}} ](https://github.com/FirefoxUX/photon/issues "Submit feedback")
  </span>

  {% when 'Error' %}

  <span class="error" markdown="1">
  ![Excamation Mark in a Triangle.](../images/global/warning-16.svg)
  {{ include.text }}
  [ {{include.button}} ](https://github.com/FirefoxUX/photon/issues "Submit feedback")
  </span>

  {% when 'Info' %}

  <span class="info" markdown="1">
  ![Lowercase i in a circle.](../images/global/info-16.svg)
  {{ include.text }}
  [ {{include.button}} ](https://github.com/FirefoxUX/photon/issues "Submit feedback")
  </span>

{% endcase %}