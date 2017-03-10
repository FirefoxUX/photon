/* eslint react/no-multi-comp:[0] */

'use strict';

const React = require('react');
const { Link } = require('react-router');

const { connect } = require('react-redux');
const { getPage, getUrl } = require('./utilities.js');

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
    return (<Link activeClassName="fw5"
        className={classes + ((item === page) ? ' selected' : '')}
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
      if (item.pages) {
        return (
          <ListItem
              expanded={item === expanded}
              handleClick={handleClick}
              i={i}
              item={item}
              key={i}
          />
        );
      }
      return (
        <Page
            classes="db no-underline fw5 ma0 pv2 near-black"
            i={i}
            item={item}
            key={i}
        />
      );
    }

    let items = sources.map(getItem);

    return (<nav 
        className="bg-near-white h-100 w-100 z-max order-1 order-0-l w-6-l"
        id="nav"
            >
      <div className="flex flex-column h-100 center mw7 pa3 pa4-l">
        <div className="self-start dn db-l">
          <p className="f4 fw5 lh-solid ma0">
            <a className="near-black no-underline" 
                href="/StyleGuide/welcome.html"
            >{'Firefox Design System'}
            </a>
          </p>
          <p className="f6 lh-copy ttu fw5 mt2 mb4">{'starting v57 (photon)'}</p>
        </div>
        <div className="self-stretch overflow-y-scroll h-100 mb5">
          {items}
        </div>
        <div className="self-end w-100">
          <p className="lh-copy ma0 fw4">
            {'Questions, doubts or feedback? '}
            <a className="near-black no-underline fw5" 
                href="https://github.com/bwinton/StyleGuide/issues"
            >{'Open an issue on GitHub!'}
            </a>
          </p>
        </div>
      </div>
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
