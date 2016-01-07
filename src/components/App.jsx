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
    section: React.PropTypes.shape(),
    sections: React.PropTypes.arrayOf(React.PropTypes.shape()),
    subpage: React.PropTypes.shape()
  },

  handleSectionDown: function() {
    if (!this.props.section) {
      let section = this.props.sections[0];
      window.scrollBy(0, section.getBoundingClientRect().bottom - 80);
      return;
    }
    let index = this.props.sections.indexOf(this.props.section);
    if (index !== -1 && index + 1 < this.props.sections.length) {
      let section = this.props.sections[index + 1];
      window.scrollBy(0, section.getBoundingClientRect().bottom - 80);
    }
  },

  handleSectionUp: function() {
    let index = this.props.sections.indexOf(this.props.section);
    if (index === 0) {
      window.scrollBy(0, document.querySelector('.editor').getBoundingClientRect().top - 45);
      return;
    }
    if (index > 0) {
      let section = this.props.sections[index - 1];
      window.scrollBy(0, section.getBoundingClientRect().bottom - 80);
    }
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
        breadcrumbs += ' > ' + section.innerText;
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
          <button onClick={this.handleSectionDown}>{"v"}</button>
          <button onClick={this.handleSectionUp}>{"^"}</button>
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
  var {section, sections, sources} = state.data;

  var [page, subpage] = getPages(path, sources);
  return {
    page: page,
    subpage: subpage,
    section: section,
    sections: sections
  };
}

module.exports = connect(makeProps)(App);
