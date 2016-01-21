'use strict';

/* eslint "react/no-danger":[0] */
/* global process:false */

require('../styles/editor.scss');
require('../styles/buttons.scss');
require('../../node_modules/highlight.js/styles/color-brewer.css');

const React = require('react');
const ReactDOM = require('react-dom');
const { connect } = require('react-redux');

const { newSection, newSections } = require('./actions.js');
const { parsePath } = require('./utilities.js');
var HighlightWorker = require('worker?inline=true!../worker.js');

function handleCodes(node) {
  let codes = Array.from(node.querySelectorAll('code'));

  codes.map((e, i) => {
    if (e.dataset.hasOwnProperty('processed')) {
      // We’ve already processed this code block!
      return;
    }
    e.dataset.processed = 'true';


    let container = document.createElement('div');
    container.setAttribute('class', 'result');
    container.innerHTML = '<div>' + e.textContent + '</div>';
    e.parentNode.parentNode.appendChild(container);

    container = document.createElement('div');
    container.setAttribute('class', 'code-container');

    this.worker.postMessage({index: i, text: e.textContent});

    let copy = document.createElement('div');
    copy.setAttribute('class', 'copy-image');
    e.parentNode.appendChild(container);
    container.appendChild(e);
    container.appendChild(copy);

    if (e.scrollHeight > e.clientHeight) {
      let expand = document.createElement('div');
      expand.setAttribute('class', 'expando');
      expand.textContent = 'Click to expand code snippet';
      e.parentNode.parentNode.appendChild(expand);
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
    let copy = document.createElement('div');
    copy.setAttribute('class', 'copy-hover');
    copy.textContent = 'copy';
    e.insertBefore(copy, e.firstChild);
  });
}

const Editor = React.createClass({
  displayName: 'Editor',
  propTypes: {
    dispatch: React.PropTypes.func,
    section: React.PropTypes.shape(),
    sections: React.PropTypes.arrayOf(React.PropTypes.shape()),
    subpage: React.PropTypes.bool,
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

    document.addEventListener('scroll', () => {
      let section = Array.from(node.querySelectorAll('h3'))
        .reverse().find(e => e.getBoundingClientRect().bottom <= 100)
      if (section != this.props.section) {
        newSection(this.props.dispatch, section);
      }
    });

    let handleCopyClick = (text, popupText) => {
      var popup = node.querySelector('.popup');
      if (popup.style.zIndex) {
        return;
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
        }, 500);
      }, 1500);
    };

    let handleExpand = (expand) => {
      let code = expand.previousSibling.querySelector('code');
      code.classList.toggle('expanded');
      if (code.classList.contains('expanded')) {
        code.style.height = (code.scrollHeight + 2) + 'px';
        expand.textContent = 'Click to collapse code snippet';
      } else {
        code.style.height = '';
        expand.textContent = 'Click to expand code snippet';
      }
    }

    node.addEventListener('click', (evt) => {
      let target = evt.target;
      if (target.classList.contains('copy-hover')) {
        target = target.parentNode;
      }
      if (target.classList.contains('colour')) {
        handleCopyClick(target.lastChild.textContent);
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
    handleCodes(node);
    handleColours(node);

    let sections = Array.from(node.querySelectorAll('h3'));
    let comparable = sections => {
      return JSON.stringify((sections || []).map(e => e.innerText))
    }
    if (comparable(sections) != comparable(this.props.sections)) {
      newSections(this.props.dispatch, sections);
    }

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
    return (<div className={'editor' +
      (this.props.subpage ? ' subpage' : ' ') +
      (this.props.url ? ' url' : ' ')}
        dangerouslySetInnerHTML={{__html:
          '<div class="popup"></div>' + text}}
            ></div>)
  }

});

function makeProps(state) {
  var {scrollTo, section, sections, text, url} = state.data;
  var {path} = state.routing;
  var subpage = parsePath(path)[1];

  return {
    scrollTo: scrollTo,
    section: section,
    sections: sections,
    subpage: !!subpage,
    text: text,
    url: url
  }
}

module.exports = connect(makeProps)(Editor);
