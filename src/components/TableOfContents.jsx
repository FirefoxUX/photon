const React = require('react');

const { connect } = require('react-redux');

const TableOfContents = React.createClass({
  displayName: 'TableOfContents',
  propTypes: {
    dispatch: React.PropTypes.func,
    items: React.PropTypes.arrayOf(React.PropTypes.shape).isRequired,
    selectedItem: React.PropTypes.shape(),
    selectedSubpage: React.PropTypes.shape()
  },

  render: function() {
    const { items, selectedItem, selectedSubpage, dispatch } = this.props;

    var subpages = selectedItem.subpages.map((subpage, i) => {
      return (<li className={'subitem ' + ((subpage === selectedSubpage) ? 'selected' : '')}
          key={items.indexOf(selectedItem) + ':' + i}
          onClick={(e) => {
            e.stopPropagation();
            dispatch({type: 'SUBPAGE', data: subpage.title});
          }}
              >{subpage.title}</li>);
    });

    return (<ul className="toc">
      {items.map((item, i) => {
        return ([].concat(
          <li className={(item === selectedItem) ? 'selected' : ''}
              key={i}
              onClick={() => dispatch({type: 'PAGE', data: item.title})}
          >{item.title}
        </li>).concat((item === selectedItem) ? subpages : [])
          )
      })}
    </ul>)
  }
});

function makeProps(state) {
  var item = state.sources.find(source => source.title === state.selectedSourceName);
  var subitem = item.subpages.find(subitem => subitem.title === state.selectedSubpage);
  return {
    items: state.sources,
    selectedItem: item,
    selectedSubpage: subitem
  }
}

module.exports = connect(makeProps)(TableOfContents);
