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
    return (<div className="flex flex-column flex-row-l fixed-l w-100-l h-100-l">
      <TableOfContents/>
      <article className="order-0 order-1-l overflow-y-scroll-l w-100">
        <Editor/>
        <footer className="mb5" 
            id="footer"
        >
          <div className="center mw7 ph3 pb3 cf">
            <p className="fl-ns w-50-ns tc tl-ns mt0">
              <a className="no-underline black" 
                  href="#!"
              >{'Previos Page Title'}</a>
            </p>
            <p className="fl-ns w-50-ns tc tr-ns mt0">
              <a className="no-underline black"
                  href="#!"
              >{'Next Page Title'}</a>
            </p>
          </div>
        </footer>
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
