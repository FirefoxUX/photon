'use strict';

const React = require('react');
const { connect } = require('react-redux');
const { changeNav } = require('./actions.js');
const { getPage, PREFIX } = require('./utilities.js');
const ListItem = require('./ListItem.jsx');
const Page = require('./Page.jsx');


const TableOfContents = React.createClass({
  displayName: 'TableOfContents',
  propTypes: {
    dispatch: React.PropTypes.func,
    nav: React.PropTypes.bool,
    page: React.PropTypes.shape(),
    sources: React.PropTypes.arrayOf(React.PropTypes.shape).isRequired
  },

  getInitialState : function() {
    const {sources, page} = this.props;
    const directory = page && page.directory;
    const selected = sources.filter(item => item.directory === directory);
    return {expanded: new Set(selected)};
  },

  handleClick: function() {
    changeNav(this.props.dispatch, !this.props.nav);
  },

  render: function() {
    const { nav, page, sources } = this.props;

    let setState = this.setState.bind(this);
    let handleClick = (item) => {
      let expanded = new Set(this.state.expanded);
      if (item.directory === page.directory) {
        return;
      }
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
    if (!page) {
      items = [];
    }
    let navClass = "fixed top-0 relative-l bg-white shadow-3 h-100 z-max order-0-l w-18r l-0r flex-shrink-0 left-animate l-0-l";
    let overlayClass = "fixed w-100 h-100 top-0 left-0 bg-black-40 opacity-animate";
    if (!nav) {
      navClass += " l-20r";
      overlayClass += " z-min o-0";
    } else {
      overlayClass += " z-9999 o-100";
    }

    return (<div>
        <nav className={navClass}
            id="nav"
        >
        <div className="h-100 center mw7 pt4 ph4 overflow-y-auto">
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
            <p className="lh-copy mt0 mb1 fw4 f6">
              <a className="blue-60 no-underline"
                  href="https://github.com/FirefoxUX/photon/issues"
              >{'Site Feedback'}
              </a>
            </p>
            <p className="lh-copy mt0 mb1 fw4 f6">
              <a className="dib no-underline blue-60 mr2"
                  href="https://github.com/FirefoxUX/photon/releases"
              >{'Changelog'}
              </a>
              <span className="grey-50">{'v0.6.8'}</span>
            </p>
            <p className="lh-copy mt0 mb1 fw4 f6">
              <a className="blue-60 no-underline"
                  href="https://www.mozilla.org/privacy/websites/"
              >{'Privacy Policy'}
              </a>
            </p>
          </div>
        </div>
      </nav>
      <div className={overlayClass}
          onClick={this.handleClick}
      >
      </div>
    </div>)
  }
});

function makeProps(state) {
  var {path} = state.routing;
  var {nav, pages, sources} = state.data;

  var page = getPage(path, pages);
  return {nav, page, sources}
}

module.exports = connect(makeProps)(TableOfContents);
