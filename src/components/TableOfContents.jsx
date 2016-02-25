/* eslint react/no-multi-comp:[0] */

'use strict';

require('../styles/toc.scss');

const React = require('react');
const { Link } = require('react-router');

const { connect } = require('react-redux');
const { getPages } = require('./utilities.js');

const ListItem = connect(state => {
  var {path} = state.routing;
  var {sources} = state.data;

  var [page, subpage] = getPages(path, sources);
  return {
    page: page,
    subpage: subpage
  };
})(React.createClass({
  displayName: 'ListItem',

  propTypes: {
    i: React.PropTypes.number,
    item: React.PropTypes.shape(),
    page: React.PropTypes.shape(),
    subpage: React.PropTypes.shape()
  },

  render() {
    const { i, item, page, subpage } = this.props;

    const url = `/${item.file}`;

    return (<Link activeClassName="active"
        className={'item ' + item.className +
          ((!subpage && item === page) ? ' selected' : '')}
        key={i}
        to={url}
            >{item.title}</Link>
      );
  }
}));

const Subpage = connect(state => {
  var {path} = state.routing;
  var {sources} = state.data;

  var [page, subpage] = getPages(path, sources);
  return {
    sources: sources,
    page: page,
    subpage: subpage
  };
})(React.createClass({
  displayName: 'ListItem',

  propTypes: {
    i: React.PropTypes.number,
    item: React.PropTypes.shape(),
    page: React.PropTypes.shape().isRequired,
    sources: React.PropTypes.arrayOf(React.PropTypes.shape).isRequired,
    subpage: React.PropTypes.shape()
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
    const { item, i, page, sources, subpage } = this.props;

    const url = `/${page.file}/${item.file}`;
    return (<Link activeClassName="active"
        className={'subitem ' + item.className +
          ((item === subpage) ? ' selected' : '')}
        key={sources.indexOf(page) + ':' + i}
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

  getSubpage: (item, i) => {
    return (<Subpage
        i={i}
        item={item}
            />);
  },

  render: function() {
    const { sources, page } = this.props;
    var subpages = page ? page.subpages.map(this.getSubpage) : [];

    let getItem = (item, i) => {
      return ([].concat(<ListItem
          i={i}
          item={item}
                        />).concat(
        (item === page) ? subpages : []));
    }

    return (<div className="toc">
      {sources.map(getItem)}
    </div>)
  }
});

function makeProps(state) {
  var {path} = state.routing;
  var {sources} = state.data;

  var [page] = getPages(path, sources);
  return {
    sources: sources,
    page: page
  }
}

module.exports = connect(makeProps)(TableOfContents);
