'use strict';

/* eslint "react/no-danger":[0] */

const React = require('react');
const ReactDOM = require('react-dom');
const { connect } = require('react-redux');

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
    Array.from(node.querySelectorAll('.colours, .multi-swatch')).map(e => {
      e.addEventListener('click', (evt) => {
        if (!evt.originalTarget.classList.contains('colour')) {
          return;
        }
        let copyElement = document.createElement('input');
        copyElement.setAttribute('type', 'text');
        copyElement.setAttribute('value', evt.originalTarget.textContent);
        copyElement = document.body.appendChild(copyElement);
        copyElement.select();
        document.execCommand('copy');
        copyElement.remove();
      });
    });
  },

  render: function() {
    return (<div className={'editor' + (this.props.subpage ? ' subpage' : ' ')}
        dangerouslySetInnerHTML={{__html: this.props.text}}
            ></div>)
  }
});

function makeProps(state) {
  var text = state.text;
  return {
    subpage: !!state.selectedSubpage,
    text: text
  }
}

module.exports = connect(makeProps)(Editor);
