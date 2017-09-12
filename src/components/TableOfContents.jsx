'use strict';

const React = require('react');
const { connect } = require('react-redux');
const { getPage } = require('./utilities.js');
const ListItem = require('./ListItem.jsx');
const Page = require('./Page.jsx');
const { PREFIX } = require('./utilities.js');


const TableOfContents = React.createClass({
  displayName: 'TableOfContents',
  propTypes: {
    page: React.PropTypes.shape(),
    sources: React.PropTypes.arrayOf(React.PropTypes.shape).isRequired
  },

  getInitialState : function() {
    return {expanded: new Set()};
  },

  render: function() {
    const { sources } = this.props;

    let setState = this.setState.bind(this);
    let handleClick = (item) => {
      let expanded = new Set(this.state.expanded);
      if (expanded.has(item)) {
        expanded.delete(item);
      } else {
        expanded.add(item);
      }
      setState({
        expanded: expanded
      });
    }

    let expanded = this.state.expanded;

    let getItem = (item, i) => {
      if (item.pages) {
        return (
          <ListItem
              expanded={expanded.has(item)}
              handleClick={handleClick}
              i={i}
              item={item}
              key={i}
          />
        );
      }
      return (
        <Page
            classes="db no-underline hover-no-underline fw5 ma0 pv2 grey-90 lh-solid"
            i={i}
            item={item}
            key={i}
        />
      );
    }

    let items = sources.filter(item => !item.hidden).map(getItem);
    if (!this.props.page) {
      items = [];
    }

    return (<nav
        className="bg-white shadow-1 h-100 w-100 z-max order-1 order-0-l w-6-l"
        id="nav"
            >
      <div className="h-100 center mw7 pt3 ph3 pt4-l ph4-l overflow-y-auto">
        <div className="dn db-l mb4">
          <p className="f3 fw5 lh-solid ma0">
            <a className="grey-90 no-underline hover-no-underline"
                href={`${PREFIX}/index.html`}
            >{'Photon Design System'}
            </a>
          </p>
        </div>
        <div className="mb5">
          {items}
        </div>
        <div className="pb3 pb4-l">
          <p className="lh-copy mt0 mb1 fw4 f6 dib-m mr4-m">
            <a className="blue-60 no-underline"
                href="https://github.com/FirefoxUX/photon/issues/"
            >{'Site Feedback'}
            </a>
          </p>
          <p className="lh-copy mt0 mb1 fw4 f6 dib-m mr4-m">
            <a className="dib no-underline blue-60 mr2"
                href="https://github.com/FirefoxUX/photon/releases"
            >{'Changelog'}
            </a>
            <span className="grey-50">{'Beta v0.3.3'}</span>
          </p>
          <p className="lh-copy mt0 mb1 fw4 f6 dib-m mr4-m">
            <a className="blue-60 no-underline"
                href="https://www.mozilla.org/privacy/websites/"
            >{'Privacy Policy'}
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
