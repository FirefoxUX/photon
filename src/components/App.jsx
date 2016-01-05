const React = require('react');

const TableOfContents = React.createFactory(require('./TableOfContents.jsx'));
const Editor = React.createFactory(require('./Editor.jsx'));

const { connect } = require('react-redux');
const { getPages } = require('./utilities.js');

const App = React.createClass({
  displayName: 'App',
  propTypes: {
    page: React.PropTypes.shape()
  },

  render: function() {
    const { page } = this.props;
    return (<div className={"app " + (page ? page.className : "")}>
      <div className="toolbar">
        <div className="title">
          <h2>{"Firefox"}<br/>{"Style Guide v1.0"}</h2>
          <small>{"Updated today"}</small>
        </div>
      </div>
      <div className="content">
        <TableOfContents/>
        <Editor/>
      </div>
    </div>);
  }
});

function makeProps(state) {
  var {path} = state.routing;
  var {sources} = state.data;

  var [page] = getPages(path, sources);
  return {page: page};
}

module.exports = connect(makeProps)(App);
