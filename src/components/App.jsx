const React = require('react');
const ReactDOM = require('react-dom');

const TableOfContents = React.createFactory(require('./TableOfContents.jsx'));
const Editor = React.createFactory(require('./Editor.jsx'));
const Footer = React.createFactory(require('./Footer.jsx'));
const Header = React.createFactory(require('./Header.jsx'));

const { connect } = require('react-redux');
const { getPage } = require('./utilities.js');

const App = React.createClass({
  displayName: 'App',
  propTypes: {
    dispatch: React.PropTypes.func,
    page: React.PropTypes.shape()
  },
  getInitialState : function() {
    return {header_links: [], header: '', header_description: ''};
  },

  addIds: function (editor_page) {
    let node = ReactDOM.findDOMNode(editor_page);
    let headings = Array.from(node.querySelectorAll('h1,h2,h3,h4'));
    let header_links = [];
    let header, header_description;
    if (node.querySelector('header')) {
      header = node.querySelector('header h1').textContent;
      header_description = node.querySelector('header p') ? node.querySelector('header p').textContent : '';
      node.removeChild(node.querySelector('header'));
    }
    headings.forEach(e => {
      if (!e.id) {
        e.id = e.textContent.toLowerCase().replace(/ /g, '-');
      }
      if (e.tagName === 'H2') {
        header_links.push({name: e.textContent, id: e.id})
      }
    });

    let setState = this.setState.bind(this);
    setState({
      header: header || '',
      header_description: header_description || '',
      header_links: header_links
    });
  },

  render: function() {
    return (<div className="flex flex-column flex-row-l fixed-l w-100-l h-100-l">
      <TableOfContents/>
      <article className="order-0 order-1-l overflow-y-scroll-l w-100">
        <Header header = {this.state.header}
            header_description = {this.state.header_description}
            header_links = {this.state.header_links}
        />
        <Editor addIds = {this.addIds}/>
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
