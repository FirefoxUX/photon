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

    return (<div className={'pb3 white fw5' + ((page && item.title === page.category) ? ' selected' : '') +
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
        className={'db pl3 pt3 no-underline moon-gray fw4' + ((item === page) ? ' selected' : '')}
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
    let navStyle = {width: '320px'};

    return (<nav 
        className="bg-dark-gray fixed h-100 left-0 top-0 w5-ns z-max"
        id="nav"
        style={navStyle}
            >
      <div className="flex flex-column h-100">
        <div className="self-start pa3 pa4-ns">
          <p className="f4 fw5 lh-solid mt0 mb2">
            <a className="white no-underline" 
                href="/#/welcome"
            >{'Firefox Design System'}
            </a>
          </p>
          <p className="white f6 ma0 lh-copy ttu fw5">{'starting v57 (photon)'}</p>
        </div>
        <div className="self-stretch overflow-y-scroll h-100 ph3 ph4-ns">
          {items}
        </div>
        <div className="self-end pa3 pa4-ns">
          <p className="white ma0 lh-copy">
            {'Questions, doubts or feedback? '}
            <a className="white" 
                href="https://github.com/bwinton/StyleGuide/issues"
            >{'Open an issue!'}
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
