const React = require('react');

const TableOfContents = React.createClass({
  displayName: 'TableOfContents',
  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.shape).isRequired,
    onItemSelected: React.PropTypes.func.isRequired,
    onSubpageSelected: React.PropTypes.func,
    selectedItem: React.PropTypes.shape(),
    selectedSubpage: React.PropTypes.shape()
  },

  render: function() {
    const { items, onItemSelected, selectedItem, onSubpageSelected, selectedSubpage } = this.props;

    var subpages = selectedItem.subpages.map((subpage, i) => {
      return (<li className={(subpage === selectedSubpage) ? 'subselected' : ''}
          key={items.indexOf(selectedItem) + ':' + i}
          onClick={() => onSubpageSelected(subpage)}
              >{subpage.title}</li>);
    });

    return (<ul className="toc">
      {items.map((item, i) => {
        return (
          <li className={(item === selectedItem) ? 'selected' : ''}
              key={i}
              onClick={() => onItemSelected(item)}
          >{item.title}
          {(item === selectedItem) ? subpages : ''}
        </li>
          )
      })}
    </ul>)
  }
});

module.exports = TableOfContents;
