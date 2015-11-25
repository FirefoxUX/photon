/* global $:false */

'use strict';

$(() => {
  $('ul.components').hide();
  $('.list-group-item.components').click(() => {
    $('ul.components').slideToggle();
  });
});
