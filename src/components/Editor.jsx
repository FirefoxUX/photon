'use strict';

/* eslint "react/no-danger":[0] */
/* global process:false */

require('../styles/editor.scss');
require('../styles/content-base.scss');
require('../styles/controls-examples.scss');
require('../styles/glyphs.scss');
require('../styles/inputs-examples.scss');
require('../styles/panels-examples.scss');
require('../styles/switches.scss');
require('../../node_modules/highlight.js/styles/color-brewer.css');

const React = require('react');
const { connect } = require('react-redux');

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

  render: function() {
    let text = this.props.text;
    let url = this.props.url;
    if (url) {
      if (process.env.NODE_ENV === 'development') {
        url = `https://firefoxux.github.io${url}`;
      }
      text = `<iframe src=${url} id="editor-iframe" frameborder="0"></iframe>`;
    }
    return (<div className={'editor subpage pv4 pr4' +
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
