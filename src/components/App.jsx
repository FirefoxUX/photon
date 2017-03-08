const React = require('react');

const TableOfContents = React.createFactory(require('./TableOfContents.jsx'));
const Editor = React.createFactory(require('./Editor.jsx'));
const Footer = React.createFactory(require('./Footer.jsx'));

const { connect } = require('react-redux');
const { getPage } = require('./utilities.js');

const App = React.createClass({
  displayName: 'App',
  propTypes: {
    dispatch: React.PropTypes.func,
    page: React.PropTypes.shape()
  },

  render: function() {
    return (<div className="flex flex-column flex-row-l fixed-l w-100-l h-100-l">
      <TableOfContents/>
      <article className="order-0 order-1-l overflow-y-scroll-l w-100">
        <Editor/>
        <Footer/>
      </article>
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
