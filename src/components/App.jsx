const React = require('react');

const TableOfContents = React.createFactory(require('./TableOfContents.jsx'));
const Editor = React.createFactory(require('./Editor.jsx'));

const { connect } = require('react-redux');
const { getPages } = require('./utilities.js');

const App = React.createClass({
  displayName: 'App',
  propTypes: {
    page: React.PropTypes.shape(),
    section: React.PropTypes.string,
    subpage: React.PropTypes.shape()
  },

  render: function() {
    const { page, subpage, section } = this.props;
    var breadcrumbs = '';
    if (page) {
      breadcrumbs += page.title;
      if (subpage) {
        breadcrumbs += ' > ' + subpage.title;
      }
      if (section) {
        breadcrumbs += ' > ' + section;
      }
    }


    return (<div className={"app " + (page ? page.className : "")}>
      <div className="toolbar">
        <div className="title">
          <h2>{"Firefox"}<br/>{"Style Guide v1.0"}</h2>
          <small>{"Updated today"}</small>
        </div>
      </div>
      <div className="sticky">
        <div className="breadcrumbs">
          {breadcrumbs}
        </div>
        <div className="nav-buttons">
          <button>{"v"}</button>
          <button>{"^"}</button>
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
  var {section, sources} = state.data;

  var [page, subpage] = getPages(path, sources);
  return {
    page: page,
    subpage: subpage,
    section: section
  };
}

module.exports = connect(makeProps)(App);
