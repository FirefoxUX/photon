'use strict';

const React = require('react');
const { Link } = require('react-router');
const { connect } = require('react-redux');
const { getPage, getUrl } = require('./utilities.js');

const Page = connect(state => {
  var {path} = state.routing;
  var {pages} = state.data;

  var page = getPage(path, pages);
  return {pages, page};
})(React.createClass({
  displayName: 'Page',

  propTypes: {
    classes: React.PropTypes.string,
    i: React.PropTypes.number,
    item: React.PropTypes.shape(),
    page: React.PropTypes.shape().isRequired,
    pages: React.PropTypes.arrayOf(React.PropTypes.shape).isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
    const { item, i, page, pages, classes } = this.props;

    const url = getUrl(item);
    return (<Link activeClassName="fw5 blue"
        className={classes + ((item === page) ? ' selected' : '')}
        key={pages.indexOf(page) + ':' + i}
        to={url}
            >{item.title}</Link>);
  }
}));

module.exports = Page;