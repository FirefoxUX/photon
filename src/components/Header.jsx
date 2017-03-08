const React = require('react');

const Header = React.createClass({
  displayName: 'Header',
  propTypes: {
    header: React.PropTypes.string,
    header_description: React.PropTypes.string,
    header_links: React.PropTypes.arrayOf(React.PropTypes.shape())
  },

  render: function() {
    let links = this.props.header_links.map((link, i) => {
      return (<li
          key={i}
              ><a href={'#' + link.id}>
              {link.name}</a>
      </li>);
    });

    var header_id = this.props.header.toLowerCase().replace(/ /g, '-');
    return(
      <header className = "center mb5 mw7 ph3 mt3 mt0-l pt4-l">
        <h1 id={header_id}>{this.props.header}</h1>
        <p>{this.props.header_description}</p>
        <ul>
          {links}
        </ul>
      </header>)
  }
});

module.exports = Header;
