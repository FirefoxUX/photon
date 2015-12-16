'use strict';

/* eslint "react/no-danger":[0] */

const React = require('react');

const { connect } = require('react-redux');

const Editor = React.createClass({
  displayName: 'Editor',
  propTypes: {
    source: React.PropTypes.shape({
      text: React.PropTypes.string
    }).isRequired
  },

  render: function() {
    return (<div className="editor"
        dangerouslySetInnerHTML={{__html: this.props.source.text}}
            ></div>)
  }
});

function makeProps(state) {
  var source = state.sources.find(source => source.title === state.selectedSourceName);
  return {
    source: source
  }
}

module.exports = connect(makeProps)(Editor);
