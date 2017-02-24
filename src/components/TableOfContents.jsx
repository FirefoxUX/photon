/* eslint react/no-multi-comp:[0] */

'use strict';

const React = require('react');
const { Link } = require('react-router');

const { connect } = require('react-redux');
const { getPage } = require('./utilities.js');

const ListItem = connect(state => {
  var {path} = state.routing;
  var {pages} = state.data;

  var page = getPage(path, pages);
  return {page};
})(React.createClass({
  displayName: 'ListItem',

  propTypes: {
    expanded: React.PropTypes.bool,
    handleClick: React.PropTypes.func,
    item: React.PropTypes.shape(),
    page: React.PropTypes.shape()
  },

  getPage: (item, i) => {
    return (<Page
        i={i}
        item={item}
            />);
  },

  render() {
    const { item, page } = this.props;
    let handleClick = () => {
      this.props.handleClick(item);
    }

    return (<div className={'pb3' + ((page && item.title === page.category) ? ' selected' : '') +
              (this.props.expanded ? ' expanded' : '')}
            >
      <p className="mv0"
          onClick={handleClick}
      >{item.title}</p>
      {item.pages.map(this.getPage)}
    </div>
      );
  }
}));

const Page = connect(state => {
  var {path} = state.routing;
  var {pages} = state.data;

  var page = getPage(path, pages);
  return {pages, page};
})(React.createClass({
  displayName: 'Page',

  propTypes: {
    i: React.PropTypes.number,
    item: React.PropTypes.shape(),
    page: React.PropTypes.shape().isRequired,
    pages: React.PropTypes.arrayOf(React.PropTypes.shape).isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
    const { item, i, page, pages } = this.props;

    const url = `/${item.file}`;
    return (<Link activeClassName="active"
        className={'db pl3 pt3 no-underline black-064' + ((item === page) ? ' selected' : '')}
        key={pages.indexOf(page) + ':' + i}
        to={url}
            >{item.title}</Link>);
  }
}));


const TableOfContents = React.createClass({
  displayName: 'TableOfContents',
  propTypes: {
    page: React.PropTypes.shape(),
    sources: React.PropTypes.arrayOf(React.PropTypes.shape).isRequired
  },

  getInitialState : function() {
    return {expanded: null};
  },

  render: function() {
    const { sources } = this.props;

    let setState = this.setState.bind(this);
    let handleClick = (item) => {
      if (expanded === item) {
        item = null;
      }
      setState({
        expanded: item
      });
    }

    let expanded = this.state.expanded;

    let getItem = (item, i) => {
      return ([].concat(
        <ListItem expanded={item === expanded}
            handleClick={handleClick}
            i={i}
            item={item}
        />)
      );
    }

    let items = sources.map(getItem);

    return (<nav id="nav"
        className="fixed top-0 left-0 h-100 overflow-y-scroll pa3 pa4-ns bg-white z-max w5-ns">
      <p className="f3 mt0 mb2 fw5 lh-solid">
        <a className="no-underline black-082" 
            href="/#/welcome">{'Firefox Design System'}
        </a>
      </p>
      <p className="mt0 mb4 f6 lh-copy ttu fw5 black-064">{'starting v57 (photon)'}</p>
      {items}
    </nav>)
  }
});

function makeProps(state) {
  var {path} = state.routing;
  var {sources, pages} = state.data;

  var page = getPage(path, pages);
  return {sources, page}
}

module.exports = connect(makeProps)(TableOfContents);
