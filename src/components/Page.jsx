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
    let draft = '';
    if (item.draft) {
      draft = <span className="f4 fw5 bg-yellow-50 yellow-90 br2 ml2 pa1 lh-solid">{'DRAFT'}</span>;
    }

    const url = getUrl(item);
    return (<Link activeClassName="blue-60"
        className={classes + ((item.title === page.file) ? ' selected' : '')}
        key={pages.indexOf(page) + ':' + i}
        to={url}
            >{item.title}{draft}</Link>);
  }
}));

module.exports = Page;
