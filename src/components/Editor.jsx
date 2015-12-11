const React = require('react');
const dom = React.DOM;

const Editor = React.createClass({
  render: function() {
    return <div className="editor">{this.props.source.text}</div>
  }
});

module.exports = Editor;
