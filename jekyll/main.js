(() => {

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

    // Add play/pause buttons to animated images.
    document.querySelectorAll('.animated > img').forEach(image => {
      let playSource = image.src;
      image.src = image.src.replace(/\.gif$/, "-play.png");

      image.addEventListener('click', (e) => {
        let image = e.target;

        if (image.src !== playSource) {
          image.src = playSource;
        } else {
          image.src = image.src.replace(/\.gif$/, "-pause.png");
        }
      });
    });

    // Add click-to-copy colours.
    document.querySelectorAll('.colors').forEach(node => {
      // node.classList.add('clickable');
      node.querySelectorAll('td.name, td > code').forEach(color => {
        color.classList.add('copyable');
      });

      node.addEventListener('click', e => {
        let text;
        if (e.target.tagName === 'CODE') {
          text = e.target.textContent;
        } else if (e.target.classList.contains('name')) {
          text = e.target.parentNode.querySelector('td > code').textContent;
        }

        console.log("Copying ", text);

        if (!text) {
          return;
        }

        let copyElement = document.createElement('input');
        copyElement.setAttribute('type', 'text');
        copyElement.setAttribute('value', text);
        copyElement = document.body.appendChild(copyElement);
        copyElement.select();
        document.execCommand('copy');
        copyElement.remove();
        e.target.parentNode.querySelector('td > code').classList.add('copied');
        setTimeout(() => {e.target.parentNode.querySelector('td > code').classList.remove('copied')}, 2000);
      });
    });

  });
})();