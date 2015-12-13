const React = require('react');

const Editor = React.createClass({
  displayName: 'Editor',
  propTypes: {
    source: React.PropTypes.shape({
      text: React.PropTypes.string
    })
  },

  render: function() {
    return <div className="editor">{this.props.source.text}</div>
  }
});

module.exports = Editor;
