const React = require('react');
const dom = React.DOM;

const TableOfContents = React.createClass({
  render: function() {
    const { items, selectedItem } = this.props;

    return <ul className="toc">
      {items.map((item, i) => {
        return <li key={i} className={(item === selectedItem) ? 'selected' : ''}
          onClick={() => this.props.selectItem(item)}>{item.name}</li>
      })}
    </ul>
  }
});

module.exports = TableOfContents;
