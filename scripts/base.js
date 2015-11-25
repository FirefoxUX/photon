/* global $:false, document:false */

'use strict';

$(() => {
  $('.list-group > div').hide();
  $('.list-group').click((e) => {
    let target = $(e.target);
    if (target.parent().hasClass('list-group')) {
      let subclass = Array.prototype.filter.bind(e.target.classList)(e => e !== 'list-group-item');
      if (subclass.length) {
        $('div.' + subclass[0]).slideToggle();
      }
    }
    $('.list-group .list-group-item').removeClass('list-group-item-info');
    target.addClass('list-group-item-info');
  });

  $('.colour-swatch').click((e) => {
    let copyElement = document.createElement('input');
    copyElement.setAttribute('type', 'text');
    copyElement.setAttribute('value', e.target.textContent);
    copyElement = document.body.appendChild(copyElement);
    copyElement.select();
    document.execCommand('copy');
    copyElement.remove();
  });
});
