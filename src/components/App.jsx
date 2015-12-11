const React = require('react');
const generateSources = require('./generateSources');

const TableOfContents = React.createFactory(require('./TableOfContents.jsx'));
const Editor = React.createFactory(require('./Editor.jsx'));

const App = React.createClass({
  getInitialState: function() {
    const sources = generateSources();
    return { sources: sources,
             selectedSourceName: sources[0].name };
  },

  handleNavigation: function() {
    const sources = generateSources();
    this.setState({ sources: sources,
                    selectedSourceName: sources[0].name });
  },

  handleItemSelected: function(source) {
    this.setState({ selectedSourceName: source.name });
  },

  render: function() {
    const { sources, selectedSourceName } = this.state;
    const selectedSource = sources.find(source => source.name === selectedSourceName);

    return <div className="app">
      <div className="toolbar">
        <div className="title">
          <h2>Firefox<br/>Style Guide v1.0</h2>
          <small>Updated today</small>
        </div>
        <div className="section">
          <input type="search" placeholder="🔍 Search the style guide"></input>
        </div>
      </div>
      <div>
        <div className="hbox">
          <TableOfContents items={sources}
            selectedItem={selectedSource}
            selectItem={this.handleItemSelected} />
          <Editor source={selectedSource} />
        </div>
      </div>
    </div>;
  }
});

module.exports = App;
