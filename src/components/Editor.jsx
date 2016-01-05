'use strict';

/* eslint "react/no-danger":[0] */

require('../styles/editor.scss');
require('../../node_modules/highlight.js/styles/color-brewer.css');

const React = require('react');
const ReactDOM = require('react-dom');
const { connect } = require('react-redux');

const { parsePath } = require('./utilities.js');
var HighlightWorker = require('worker?inline=true!../worker.js');

const Editor = React.createClass({
  displayName: 'Editor',
  propTypes: {
    subpage: React.PropTypes.bool,
    text: React.PropTypes.string
  },

  componentDidMount: function() {
    this.addEditorHandlers();
  },

  componentDidUpdate: function() {
    this.addEditorHandlers();
  },

  addEditorHandlers: function() {
    let node = ReactDOM.findDOMNode(this);
    let codes = Array.from(node.querySelectorAll('code'));

    var worker = new HighlightWorker();
    worker.onmessage = (event) => {
      codes[event.data.index].innerHTML = event.data.text;
    };

    Array.from(node.querySelectorAll('.colours, .multi-swatch')).map(e => {
      e.addEventListener('click', (evt) => {
        var popup = node.querySelector('.popup');
        if (!evt.target.classList.contains('colour') ||
          popup.style.zIndex) {
          return;
        }
        let copyElement = document.createElement('input');
        copyElement.setAttribute('type', 'text');
        copyElement.setAttribute('value', evt.target.textContent);
        copyElement = document.body.appendChild(copyElement);
        copyElement.select();
        document.execCommand('copy');
        copyElement.remove();
        popup.textContent = `Copied ${evt.target.textContent} to clipboard.`;
        popup.style.zIndex = '2';
        popup.style.opacity = 1;
        var scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
        popup.style.top = `calc(${scrollPosition}px + 50vh - .5em)`;
        setTimeout(() => {
          popup.style.opacity = '';
          setTimeout(() => {
            popup.style.zIndex = '';
          }, 500);
        }, 1500);
      });
    });

    codes.map((e, i) => {
      let baseHeight = e.style.height;
      e.style.height = baseHeight;
      let container = document.createElement('div');
      container.setAttribute('class', 'code-container');

      worker.postMessage({index: i, text: e.textContent});

      let copy = document.createElement('div');
      copy.setAttribute('class', 'copy-image');
      e.parentNode.appendChild(container);
      container.appendChild(e);
      container.appendChild(copy);

      let expand = document.createElement('div');
      expand.setAttribute('class', 'expando');
      expand.textContent = 'Click to expand code snippet';
      container.parentNode.appendChild(expand);

      copy.addEventListener('click', () => {
        e.select();
        document.execCommand('copy');
      });
      expand.addEventListener('click', () => {
        if (e.style.height === baseHeight) {
          e.style.height = '250px';
          expand.textContent = 'Click to collapse code snippet';
        } else {
          e.style.height = baseHeight;
          expand.textContent = 'Click to expand code snippet';
        }
      });
    });
  },

  render: function() {
    return (<div className={'editor' + (this.props.subpage ? ' subpage' : ' ')}
        dangerouslySetInnerHTML={{__html:
          '<div class="popup"></div>' + this.props.text}}
            ></div>)
  }
});

function makeProps(state) {
  var {text} = state.data;
  var {path} = state.routing;
  var subpage = parsePath(path)[1];

  return {
    subpage: !!subpage,
    text: text
  }
}

module.exports = connect(makeProps)(Editor);
