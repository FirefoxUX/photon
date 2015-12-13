const React = require('react');
const dom = React.DOM;

const TableOfContents = React.createClass({
  render: function() {
    const { items, selectedItem, onItemSelected } = this.props;

    return <ul className="toc">
      {items.map((item, i) => {
        return <li key={i} className={(item === selectedItem) ? 'selected' : ''}
          onClick={() => onItemSelected(item)}>{item.name}</li>
      })}
    </ul>
  }
});

module.exports = TableOfContents;
