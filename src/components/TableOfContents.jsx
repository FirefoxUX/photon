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
    item: React.PropTypes.shape(),
    page: React.PropTypes.shape()
  },

  getInitialState : function() {
    return {expanded: false};
  },

  handleClick : function() {
    this.setState({ // eslint-disable-line react/no-set-state
      expanded: !this.state.expanded
    });
  },

  getPage: (item, i) => {
    return (<Page
        i={i}
        item={item}
            />);
  },

  render() {
    const { item, page } = this.props;
    return (<div className={'section' + ((item.title === page.category) ? ' selected' : '') +
              (this.state.expanded ? ' expanded' : '')}
            >
      <div className={'item'}
          onClick={this.handleClick}
      >{item.title}</div>
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
  displayName: 'ListItem',

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

  render: function() {
    const { sources } = this.props;

    let getItem = (item, i) => {
      return ([].concat(
        <ListItem i={i}
            item={item}
        />)
      );
    }

    return (<div className="toc">
      <h1>{'Firefox Style Guide'}</h1>
      {sources.map(getItem)}
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
