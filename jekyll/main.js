(() => {
  console.log('init');
  document.addEventListener('DOMContentLoaded', () => {
    // Do this in javascript so that if it's disabled, we don't collapse everything.
    for (let header of document.querySelectorAll('.site-nav > div')) {
      header.classList.add('collapsed');
    }

    // expand things on click.
    document.querySelector('.site-nav').addEventListener('click', (e) => {
      let target = e.target;
      if (target.classList.contains('site-nav') || target.localName == 'a') {
        return;
      }
      while (target.parentNode && !target.parentNode.classList.contains('site-nav')) {
        target = target.parentNode;
      }
      if (!target.parentNode) {
        return;
      }
      target.classList.toggle('collapsed');
    });
  });
})();