'use strict';

/* eslint "react/no-danger":[0] */
/* global process:false */

require('../../node_modules/highlight.js/styles/color-brewer.css');

const React = require('react');
const { connect } = require('react-redux');
const ReactDOM = require('react-dom');
const { getPage } = require('./utilities.js');

const Editor = React.createClass({
  displayName: 'Editor',
  propTypes: {
    dispatch: React.PropTypes.func,
    page: React.PropTypes.shape(),
    text: React.PropTypes.string,
    url: React.PropTypes.string
  },

  componentDidMount: function() {
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
    this.addClickToCopy();
  },

  componentDidUpdate: function(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.addIds();
      const page = this.props.page;
      let title = `${page.title} | Photon Design System`;
      if(page.category !== page.title) {
        title = `${page.title} · ${page.category} | Photon Design System`;
      }
      document.title = title;
      if (window.location.hash) {
        this.highlightSelectedTitle();
      }
    }
  },

  highlightSelectedTitle: function() {
    let element = document.getElementById(decodeURIComponent(window.location.hash.replace(/#/g,'')));
    if (element) {
      element.classList.add('blue-60');
      setTimeout(function(){
        element.classList.remove('blue-60');
      }, 1000);
    }
  },

  addIds: function () {
    let node = ReactDOM.findDOMNode(this);
    let headings = Array.from(node.querySelectorAll('h1,h2,h3,h4'));
    let ids = new Set();
    headings.forEach(e => {
      if (!e.id) {
        let newId = e.textContent.trim().toLowerCase().replace(/ /g, '-');
        let counter = 1;
        while (ids.has(newId)) {
          counter++;
          newId = `${e.textContent.trim().toLowerCase().replace(/ /g, '-')}-${counter}`;
        }
        e.id = newId;
        if (e.tagName != 'H1') {
          let linkTo = document.createElement('a');
          linkTo.innerHTML = `<div class="link-image" title="Link to this section"></div>`;
          linkTo.href = `#${e.id}`;
          e.appendChild(linkTo);
        }
      }
      if (ids.has(e.id)) {
        console.error(`Duplicate id found: ${e.id}`); // eslint-disable-line no-console
      }
      ids.add(e.id);
    });
  },

  addClickToCopy: function () {
    let node = ReactDOM.findDOMNode(this);
    node.addEventListener('click', e => {
      if (e.target.tagName === 'CODE') {
        let text = e.target.textContent;
        let copyElement = document.createElement('input');
        copyElement.setAttribute('type', 'text');
        copyElement.setAttribute('value', text);
        copyElement = document.body.appendChild(copyElement);
        copyElement.select();
        document.execCommand('copy');
        copyElement.remove();
        e.target.classList.add('copied');
        setTimeout(() => {e.target.classList.remove('copied')}, 2000);
      }
    });
  },

  render: function() {
    let {text, url} = this.props;
    if (url) {
      if (process.env.NODE_ENV === 'development') {
        url = `https://firefoxux.github.io${url}`;
      }
      text = `<iframe src=${url} id="editor-iframe" frameborder="0"></iframe>`;
    }
    return (<div className={'pt3 pt4-l' +
      (url ? ' url' : ' ')}
        dangerouslySetInnerHTML={{__html:
          '<div class="popup"></div>' + text}}
            ></div>);
  }

});

function makeProps(state) {
  var {path} = state.routing;
  var {pages, text, url} = state.data;
  var page = getPage(path, pages);

  return {
    page: page,
    text: text,
    url: url
  }
}

module.exports = connect(makeProps)(Editor);
