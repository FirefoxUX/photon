const React = require('react');
const { getPage, getSiblingPages, getUrl } = require('./utilities.js');
const { connect } = require('react-redux');
const { Link } = require('react-router');

const Footer = connect(state => {
  var {path} = state.routing;
  var {pages} = state.data;
  var page = getPage(path, pages);
  var {previous_page, next_page} = getSiblingPages(page, pages);

  return {previous_page, next_page};
})(React.createClass({
  displayName: 'Footer',
  propTypes: {
    next_page: React.PropTypes.shape(),
    previous_page: React.PropTypes.shape()
  },

  render: function() {
    return(
      <footer className="mb5 fira"
          id="footer"
      >
        <div className="center mw7 ph3 pb3 cf">
          <p className="fl-ns w-50-ns tc tl-ns mt0">
            <Link activeClassName="fw5"
                className="no-underline black"
                to={getUrl(this.props.previous_page)}
            ><span className="pl3">{this.props.previous_page.title}</span>
            </Link>
          </p>
          <p className="fl-ns w-50-ns tc tr-ns mt0">
            <Link activeClassName="fw5"
                className="no-underline black"
                to={getUrl(this.props.next_page)}
            ><span className="pl3">{this.props.next_page.title}</span>
            </Link>
          </p>
        </div>
      </footer>)
  }
}));

module.exports = Footer;
