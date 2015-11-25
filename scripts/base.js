/* global $:false */

'use strict';

$(() => {
  $('div.components').hide();
  $('.list-group-item.components').click(() => {
    $('div.components').slideToggle();
  });
  $('.list-group').click((e) => {
    $('.list-group .list-group-item').removeClass('list-group-item-info');
    $(e.target).addClass('list-group-item-info');
  });
});
