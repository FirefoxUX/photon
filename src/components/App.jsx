const React = require('react');

const TableOfContents = React.createFactory(require('./TableOfContents.jsx'));
const Editor = React.createFactory(require('./Editor.jsx'));

const { connect } = require('react-redux');
const { getPage } = require('./utilities.js');

const App = React.createClass({
  displayName: 'App',
  propTypes: {
    dispatch: React.PropTypes.func,
    page: React.PropTypes.shape()
  },

  render: function() {
    return (<div className="app">
      <div className="content">
        <TableOfContents/>
        <Editor/>
      </div>
    </div>);
  }
});

function makeProps(state) {
  var {path} = state.routing;
  var {pages} = state.data;

  var page = getPage(path, pages);
  return {page};
}

module.exports = connect(makeProps)(App);
