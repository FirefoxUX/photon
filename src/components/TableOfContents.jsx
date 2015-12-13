const React = require('react');

const TableOfContents = React.createClass({
  displayName: 'TableOfContents',
  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.shape).isRequired,
    onItemSelected: React.PropTypes.func.isRequired,
    selectedItem: React.PropTypes.shape()
  },

  render: function() {
    const { items, onItemSelected, selectedItem } = this.props;

    return (<ul className="toc">
      {items.map((item, i) => {
        return (
          <li className={(item === selectedItem) ? 'selected' : ''}
              key={i}
              onClick={() => onItemSelected(item)}
          >{item.name}</li>)
      })}
    </ul>)
  }
});

module.exports = TableOfContents;
