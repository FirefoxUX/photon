'use strict';

/* eslint "react/no-danger":[0] */

const React = require('react');

const { connect } = require('react-redux');

const Editor = React.createClass({
  displayName: 'Editor',
  propTypes: {
    subpage: React.PropTypes.boolean,
    text: React.PropTypes.string
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
    subpage: state.selectedSubpage,
    text: text
  }
}

module.exports = connect(makeProps)(Editor);
