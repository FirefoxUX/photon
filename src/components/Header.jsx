const React = require('react');
const { connect } = require('react-redux');

const Header = React.createClass({
  displayName: 'Header',
  propTypes: {
    header: React.PropTypes.string,
    header_description: React.PropTypes.string,
    header_links: React.PropTypes.arrayOf(React.PropTypes.shape())
  },

  render: function() {
    const {header_links, header, header_description} = this.props;
    let links = header_links.map((link, i) => {
      return (<li
          key={i}
              ><a href={'#' + link.id}>
              {link.name}</a>
      </li>);
    });
    let header_id = header.trim().toLowerCase().replace(/ /g, '-');

    return(
      <header className = "center mb5 mw7 ph3 mt3 mt0-l pt4-l">
        <h1 id={header_id}>{header}</h1>
        <p>{header_description}</p>
        <ul>{links}</ul>
      </header>)
  }
});

function makeProps(state) {
  let {header, header_description, header_links} = state.data;
  return {header, header_description, header_links};
}

module.exports = connect(makeProps)(Header);
