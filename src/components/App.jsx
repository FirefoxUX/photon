'use strict';

const React = require('react');

const TableOfContents = React.createFactory(require('./TableOfContents.jsx'));
const Editor = React.createFactory(require('./Editor.jsx'));
const Footer = React.createFactory(require('./Footer.jsx'));
const Feedback = React.createFactory(require('./Feedback.jsx'));

const { connect } = require('react-redux');
const { getPage } = require('./utilities.js');

const App = React.createClass({
  displayName: 'App',
  propTypes: {
    dispatch: React.PropTypes.func,
    page: React.PropTypes.shape()
  },

  render: function() {
    return (<div className="flex flex-column flex-row-l fixed-l w-100-l h-100-l mt5 mt0-l">
      <TableOfContents/>
      <main className="order-0 order-1-l overflow-y-scroll-l w-100">
        <Editor/>
         <Feedback/>
        <Footer/>
      </main>
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
