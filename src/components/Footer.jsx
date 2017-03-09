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
      <footer className="fira">
        <div className="center mw7 ph3 pb3-ns cf">
          <p className="fl w-50 fw5 tl mt0">
            <span className="pr2 pr3-ns code fw6">&#8592;</span>
            <Link activeClassName="fw5"
                className="no-underline black"
                to={getUrl(this.props.previous_page)}
            >{this.props.previous_page.title}
            </Link>
          </p>
          <p className="fl w-50 fw5 tr mt0">
            <Link activeClassName="fw5"
                className="no-underline black"
                to={getUrl(this.props.next_page)}
            >{this.props.next_page.title}<span className="pl2 pl3-ns code fw6">&#8594;</span>
            </Link>
          </p>
        </div>
      </footer>)
  }
}));

module.exports = Footer;
