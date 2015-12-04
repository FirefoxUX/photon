'use strict';

let populateToc = () => {

  let toc = [];
  $('.content > div[id]').each((_, e) => {
    let title = $(e).children('h2').text();
    toc.push($(`<a href="#${e.id}" class="list-group-item ${e.id}">${title}</a>`));
    let children = $(e).children('div[id]');
    if (children.length) {
      let childToc = [];
      children.each((_, e) => {
        let title = $(e).children('h3').text();
        childToc.push($(`<a href="#${e.id}" class="list-group-item">${title}</a>`));
      });
      toc.push($(`<div class="${e.id}">`).append(childToc));
    }
  });
  // $('.toc ul').append(toc);
  // Do something with document.body.id.
};

$(() => {

  populateToc();
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
