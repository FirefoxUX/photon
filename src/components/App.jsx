const React = require('react');

const TableOfContents = React.createFactory(require('./TableOfContents.jsx'));
const Editor = React.createFactory(require('./Editor.jsx'));

const { connect } = require('react-redux');
const { getPages } = require('./utilities.js');

const App = React.createClass({
  displayName: 'App',
  propTypes: {
    dispatch: React.PropTypes.func,
    page: React.PropTypes.shape(),
    sections: React.PropTypes.arrayOf(React.PropTypes.shape())
  },

  render: function() {
    const { page } = this.props;

    return (<div className={"app " + (page ? page.className : "")}>
      <div className="content">
        <TableOfContents/>
        <Editor/>
      </div>
    </div>);
  }
});

function makeProps(state) {
  var {path} = state.routing;
  var {sections, sources} = state.data;

  var [page] = getPages(path, sources);
  return {
    page: page,
    sections: sections
  };
}

module.exports = connect(makeProps)(App);
