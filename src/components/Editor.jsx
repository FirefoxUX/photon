'use strict';

/* eslint "react/no-danger":[0] */
/* global process:false */

require('../styles/editor.scss');
require('../styles/content-base.scss');
require('../styles/controls-examples.scss');
require('../styles/glyphs.scss');
require('../styles/inputs-examples.scss');
require('../styles/panels-examples.scss');
require('../../node_modules/highlight.js/styles/color-brewer.css');

const React = require('react');
const ReactDOM = require('react-dom');
const { connect } = require('react-redux');

var HighlightWorker = require('worker?inline=true!../worker.js');

var getResult = (node) => {
  while (node && !node.classList.contains('spec')) {
    node = node.parentNode;
  }
  return node && node.querySelector('.result');
}

function handleCodes(node, worker) {
  let codes = Array.from(node.querySelectorAll('code'));

  codes.map((e, i) => {
    if (e.dataset.hasOwnProperty('processed')) {
      // We’ve already processed this code block!
      return;
    }
    e.dataset.processed = 'true';

    let container = document.createElement('div');
    container.innerHTML = '<div>' + e.textContent + '</div>';
    e.parentNode.appendChild(container);

    worker.postMessage({index: i, text: e.textContent});

    let result = getResult(e);

    let copy = document.createElement('div');
    copy.setAttribute('class', 'copy-image');
    result.appendChild(e);
    result.appendChild(copy);

    if (e.scrollHeight > e.clientHeight) {
      let expand = document.createElement('div');
      expand.setAttribute('class', 'expando');
      expand.textContent = 'Click to expand code snippet';
      result.appendChild(expand);
      result.classList.add('expando-added');
    }
  });

}

function handleColours(node) {
  let colours = Array.from(node.querySelectorAll('div.colour'));

  colours.map(e => {
    if (e.dataset.hasOwnProperty('processed')) {
      // We’ve already processed this code block!
      return;
    }
    e.dataset.processed = 'true';
    let text = document.createElement('span');
    text.setAttribute('class', 'copy-text');
    text.textContent = e.textContent;
    e.replaceChild(text, e.firstChild);
    let copy = document.createElement('div');
    copy.setAttribute('class', 'copy-hover');
    copy.textContent = 'click to copy';
    e.insertBefore(copy, e.firstChild);
  });
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

function handleIndex(node) {
  let results = Array.from(node.querySelectorAll('.word-index'));
  let headers = Array.from(node.querySelectorAll('h3'));
  headers = headers.filter(e => {
    return alphabet.indexOf(e.innerText) != -1;
  });

  let generateLinks = headers => {
    let links = alphabet.map(e => {
      let link = document.createElement('span');
      link.setAttribute('class', 'index-entry');
      link.innerText = e;
      return link;
    });
    headers.map(e => {
      let link = links.find(link => link.innerText == e.innerText);
      link.classList.add('link');
      link.addEventListener('click', () => {
        window.scrollTo(0, e.offsetTop - 60)
      });
    });
    return links;
  };
  let links = generateLinks(headers);
  links.map(link => results.forEach(result => result.appendChild(link)));
}

const Editor = React.createClass({
  displayName: 'Editor',
  propTypes: {
    dispatch: React.PropTypes.func,
    text: React.PropTypes.string,
    url: React.PropTypes.string
  },

  componentDidMount: function() {
    this.addEditorHandlers();

    let node = ReactDOM.findDOMNode(this);

    this.worker = new HighlightWorker();
    this.worker.onmessage = (event) => {
      let codes = node.querySelectorAll('code');
      codes[event.data.index].innerHTML = event.data.text;
    };

    let handleCopyClick = (text, popupText, textNode) => {
      var popup = node.querySelector('.popup');
      if (popup.style.zIndex) {
        return;
      }
      if (textNode) {
        var content = textNode.textContent;
        textNode.textContent = '╰(◕ᗜ◕)╯';
      }
      let copyElement = document.createElement('input');
      copyElement.setAttribute('type', 'text');
      copyElement.setAttribute('value', text);
      copyElement = document.body.appendChild(copyElement);
      copyElement.select();
      document.execCommand('copy');
      copyElement.remove();
      popup.textContent = `Copied ${popupText || text} to clipboard.`;
      popup.style.zIndex = '2';
      popup.style.opacity = 1;
      var scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
      popup.style.top = `calc(${scrollPosition}px + 50vh - .5em)`;
      setTimeout(() => {
        popup.style.opacity = '';
        setTimeout(() => {
          popup.style.zIndex = '';
          if (textNode) {
            textNode.textContent = content;
          }
        }, 500);
      }, 1500);
    };

    let handleExpand = (expand) => {
      let code = getResult(expand).querySelector('code');
      code.classList.toggle('expanded');
      if (code.classList.contains('expanded')) {
        code.style.maxHeight = (code.scrollHeight + 2) + 'px';
        expand.textContent = 'Click to collapse code snippet';
      } else {
        code.style.maxHeight = '';
        expand.textContent = 'Click to expand code snippet';
      }
    }

    node.addEventListener('click', (evt) => {
      let target = evt.target;
      if (target.classList.contains('copy-hover') ||
          target.classList.contains('copy-text')) {
        target = target.parentNode;
      }
      if (target.classList.contains('colour')) {
        let text = target.lastChild.textContent;
        handleCopyClick(text, text, target.querySelector('.copy-hover'));
      } else if (target.classList.contains('copy-image')) {
        let code = target.parentNode.querySelector('code').innerText;
        handleCopyClick(code, 'code');
      } else if (target.classList.contains('expando')) {
        handleExpand(target);
      }
    });

    window.addEventListener('message', (e) => {
      var data = JSON.parse( e.data );
      // check data object
      if ( data['type'] == 'editor-height' && data['docHeight'] ) {
        var ifrm = document.getElementById('editor-iframe');
        if (ifrm) {
          ifrm.style.visibility = 'hidden';
          // some IE versions need a bit added or scrollbar appears
          ifrm.style.height = data['docHeight'] + 4 + "px";
          ifrm.style.visibility = 'visible';
        }
      }
    }, false);

  },

  componentDidUpdate: function() {
    this.addEditorHandlers();
  },

  addEditorHandlers: function() {
    let node = ReactDOM.findDOMNode(this);
    handleCodes(node, this.worker);
    handleColours(node);
    handleIndex(node);
  },

  render: function() {
    let text = this.props.text;
    let url = this.props.url;
    if (url) {
      if (process.env.NODE_ENV === 'development') {
        url = `https://firefoxux.github.io${url}`;
      }
      text = `<iframe src=${url} id="editor-iframe" frameborder="0"></iframe>`;
    }
    return (<div className={'editor subpage' +
      (this.props.url ? ' url' : ' ')}
        dangerouslySetInnerHTML={{__html:
          '<div class="popup"></div>' + text}}
            ></div>)
  }

});

function makeProps(state) {
  var {text, url} = state.data;

  return {
    text: text,
    url: url
  }
}

module.exports = connect(makeProps)(Editor);
