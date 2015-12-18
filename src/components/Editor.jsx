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
        if (!evt.target.classList.contains('colour')) {
          return;
        }
        let copyElement = document.createElement('input');
        copyElement.setAttribute('type', 'text');
        copyElement.setAttribute('value', evt.target.textContent);
        copyElement = document.body.appendChild(copyElement);
        copyElement.select();
        document.execCommand('copy');
        copyElement.remove();
        var popup = node.querySelector('.popup');
        popup.textContent = `Copied ${evt.target.textContent} to clipboard.`;
        popup.style.opacity = 1;
        var scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
        popup.style.top = `calc(${scrollPosition}px + 50vh - .5em)`;
        setTimeout(() => {
          popup.style.opacity = '';
        }, 1500);
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
  var text = state.text;
  return {
    subpage: !!state.selectedSubpage,
    text: text
  }
}

module.exports = connect(makeProps)(Editor);
