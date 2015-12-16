const React = require('react');

const TableOfContents = React.createFactory(require('./TableOfContents.jsx'));
const Editor = React.createFactory(require('./Editor.jsx'));

const { connect } = require('react-redux');

const App = React.createClass({
  displayName: 'App',
  propTypes: {
    selectedSourceName: React.PropTypes.string,
    sources: React.PropTypes.arrayOf(React.PropTypes.shape).isRequired
  },

  render: function() {
    const { sources, selectedSourceName } = this.props;
    const selectedSource = sources.find(source => source.title === selectedSourceName);
    return (<div className={"app " + (selectedSource ? selectedSource.className : "")}>
      <div className="toolbar">
        <div className="title">
          <h2>{"Firefox"}<br/>{"Style Guide v1.0"}</h2>
          <small>{"Updated today"}</small>
        </div>
        <div className="section">
          <input placeholder="🔍 Search the style guide"
              type="search"
          ></input>
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
  return {
    sources: state.sources,
    selectedSourceName: state.selectedSourceName
  }
}

module.exports = connect(makeProps)(App);
