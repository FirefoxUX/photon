'use strict';

const React = require('react');
const { connect } = require('react-redux');
const { changeNav } = require('./actions.js');

const Header = connect(state => {
  var {nav} = state.data;
  return {nav};
})(React.createClass({
  displayName: 'Header',
  propTypes: {
    dispatch: React.PropTypes.func,
    nav: React.PropTypes.bool
  },

  handleClick: function() {
    changeNav(this.props.dispatch, !this.props.nav);
  },

  render: function() {
    return(
      <header className="bg-white grey-90 fixed top-0 left-0 w-100 z-9999 dn-l shadow-1"
          id="header"
      >
        <div className="flex align-center center mw7 pa3 relative">
          <a className="flex no-underline hover-no-underline mr3"
              onClick={this.handleClick}
          ><img alt=""
              src="../images/global/menu-16.svg"
           />
          </a>
          <p className="mt0 mb0 fw5">
            <a className="grey-90 no-underline"
                href="/photon/welcome.html"
            >{'Photon Design System'}</a>
          </p>
        </div>
      </header>)
  }
}));

module.exports = Header;
