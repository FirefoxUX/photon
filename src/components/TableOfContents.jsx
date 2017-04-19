'use strict';

const React = require('react');
const { connect } = require('react-redux');
const { getPage } = require('./utilities.js');
const ListItem = require('./ListItem.jsx');
const Page = require('./Page.jsx');


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

    let items = sources.filter(item => !item.hidden).map(getItem);

    return (<nav
        className="bg-near-white h-100 w-100 z-max order-1 order-0-l w-6-l"
        id="nav"
            >
      <div className="flex flex-column h-100 center mw7 pt3 ph3 pt4-l ph4-l overflow-y-auto">
        <div className="self-start dn db-l">
          <p className="f4 fw5 lh-solid ma0">
            <a className="near-black no-underline"
                href="/DesignSystem/welcome.html"
            >{'Firefox Design System'}
            </a>
          </p>
          <p className="f6 lh-copy ttu fw5 mt2 mb4">{'starting v57 (photon)'}</p>
        </div>
        <div className="self-stretch h-100 mb5">
          {items}
        </div>
        <div className="self-end w-100 pb3 pb4-l">
          <p className="lh-copy ma0 fw4">
            {'Questions, doubts or feedback? '}
            <a className="near-black no-underline fw5"
                href="https://github.com/bwinton/DesignSystem/issues"
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
