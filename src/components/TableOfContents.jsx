/* eslint react/no-multi-comp:[0] */

'use strict';

const React = require('react');
const { Link } = require('react-router');

const { connect } = require('react-redux');

const ListItem = connect(state => {
  var {page, subpage} = state.data;
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

    return (
          <li className={(!subpage && item === page) ? 'selected' : ''}
              key={i}
          ><Link to={url}>{item.title}</Link>
        </li>
      );
  }
}));

const Subpage = connect(state => {
  var {sources, page, subpage} = state.data;
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

  render() {
    const { item, i, page, sources, subpage } = this.props;

    const url = `/${page.file}/${item.file}`;
    return (<li
        className={'subitem ' + ((item === subpage) ? 'selected' : '')}
        key={sources.indexOf(page) + ':' + i}
            ><Link to={url}>{item.title}</Link></li>);
  }
}));


const TableOfContents = React.createClass({
  displayName: 'TableOfContents',
  propTypes: {
    page: React.PropTypes.shape(),
    sources: React.PropTypes.arrayOf(React.PropTypes.shape).isRequired,
    subpage: React.PropTypes.shape()
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

    return (<ul className="toc">
      {sources.map(getItem)}
    </ul>)
  }
});

function makeProps(state) {
  var {sources, page, subpage} = state.data;
  return {
    sources: sources,
    page: page,
    subpage: subpage
  }
}

module.exports = connect(makeProps)(TableOfContents);
