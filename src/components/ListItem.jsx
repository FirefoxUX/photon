'use strict';

const React = require('react');
const { connect } = require('react-redux');
const { getPage } = require('./utilities.js');
const Page = require('./Page.jsx');

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
    return (
      <Page
          classes="db no-underline gray fw4 pv2 pl3"
          i={i}
          item={item}
          key={i}
      />
    );
  },

  render() {
    const { item, page } = this.props;
    let handleClick = () => {
      this.props.handleClick(item);
    }
    const pages = item.pages || [item];

    return (<div className={((page && item.title === page.category) ? ' selected' : '') +
              (this.props.expanded ? ' expanded' : '')}
            >
      <p className="fw5 ma0 pv2"
          onClick={handleClick}
      >{item.title}</p>
      {pages.map(this.getPage)}
    </div>
      );
  }
}));

module.exports = ListItem;