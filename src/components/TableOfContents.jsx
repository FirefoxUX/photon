/* eslint react/no-multi-comp:[0] */

'use strict';

require('../styles/toc.scss');

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

    return (<div className={'section' + ((page && item.title === page.category) ? ' selected' : '') +
              (this.props.expanded ? ' expanded' : '')}
            >
      <div className={'item'}
          onClick={handleClick}
      >{item.title}<span className={'arrow'}></span></div>
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
        className={'subitem ' + ((item === page) ? ' selected' : '')}
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

    return (<div className="toc">
      <h1>{'Firefox Style Guide'}</h1>
      {items}
    </div>)
  }
});

function makeProps(state) {
  var {path} = state.routing;
  var {sources, pages} = state.data;

  var page = getPage(path, pages);
  return {sources, page}
}

module.exports = connect(makeProps)(TableOfContents);
