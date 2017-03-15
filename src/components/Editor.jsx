'use strict';

/* eslint "react/no-danger":[0] */
/* global process:false */

require('../../node_modules/highlight.js/styles/color-brewer.css');

const React = require('react');
const { connect } = require('react-redux');
const ReactDOM = require('react-dom');
const { updateHeader } = require('./actions.js');

const Editor = React.createClass({
  displayName: 'Editor',
  propTypes: {
    dispatch: React.PropTypes.func,
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
  },

  componentDidUpdate: function(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.addIds();
    }
  },

  addIds: function () {
    let node = ReactDOM.findDOMNode(this);
    let headings = Array.from(node.querySelectorAll('h1,h2,h3,h4'));
    let header_links = [];
    let header = '';
    let header_description = '';
    if (node.querySelector('header')) {
      header = node.querySelector('header h1').textContent.trim();
      header_description = node.querySelector('header p') ? node.querySelector('header p').textContent.trim() : '';
      node.removeChild(node.querySelector('header'));
    }
    headings.forEach(e => {
      if (!e.id) {
        e.id = e.textContent.trim().toLowerCase().replace(/ /g, '-');
      }
      if (e.tagName === 'H2') {
        header_links.push({name: e.textContent.trim(), id: e.id});
      }
    });
    updateHeader(this.props.dispatch, {header: header, header_description: header_description, header_links: header_links});
  },

  render: function() {
    let {text, url} = this.props;
    if (url) {
      if (process.env.NODE_ENV === 'development') {
        url = `https://firefoxux.github.io${url}`;
      }
      text = `<iframe src=${url} id="editor-iframe" frameborder="0"></iframe>`;
    }
    return (<div className={'center mb5 mw7 pb3 ph3 mt3 mt0-l' +
      (url ? ' url' : ' ')}
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
