'use strict';

const React = require('react');

const TableOfContents = React.createFactory(require('./TableOfContents.jsx'));
const Editor = React.createFactory(require('./Editor.jsx'));
const Footer = React.createFactory(require('./Footer.jsx'));
const Feedback = React.createFactory(require('./Feedback.jsx'));
const Header = React.createFactory(require('./Header.jsx'));

const { connect } = require('react-redux');
const { getEnv, getPage } = require('./utilities.js');

const App = React.createClass({
  displayName: 'App',
  propTypes: {
    dispatch: React.PropTypes.func,
    page: React.PropTypes.shape()
  },

  render: function() {
    return (<div className={getEnv()}>
      <Header/>
      <div className="flex-l flex-column-l flex-row-l fixed-l w-100-l h-100-l"
          id="content"
      >
        <TableOfContents/>
        <main className="order-1-l overflow-y-scroll-l w-100">
          <Editor/>
          <Feedback/>
          <Footer/>
        </main>
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
