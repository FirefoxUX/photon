'use strict';

const React = require('react');

const { connect } = require('react-redux');
const { showPage, showSubpage } = require('./actions');

const ListItem = connect(state => {
  var item = state.sources.find(source => source.title === state.selectedSourceName);
  return {
    selectedItem: item,
    selectedSubpage: state.selectedSubpage
  };
})(React.createClass({
  displayName: 'ListItem',

  propTypes: {
    dispatch: React.PropTypes.func,
    i: React.PropTypes.number,
    item: React.PropTypes.shape().isRequired,
    selectedItem: React.PropTypes.shape(),
    selectedSubpage: React.PropTypes.string
  },

  handleItem() {
    this.props.dispatch(showPage(this.props.item.title));
  },
  render() {
    const { i, item, selectedItem, selectedSubpage } = this.props;

    return (
          <li className={(!selectedSubpage && item === selectedItem) ? 'selected' : ''}
              key={i}
              onClick={this.handleItem}
          >{item.title}
        </li>
      );
  }
}));

const Subpage = connect(state => {
  var item = state.sources.find(source => source.title === state.selectedSourceName);
  var subitem = item.subpages.find(subitem => subitem.title === state.selectedSubpage);
  return {
    items: state.sources,
    selectedItem: item,
    selectedSubpage: subitem
  };
})(React.createClass({
  displayName: 'ListItem',

  propTypes: {
    dispatch: React.PropTypes.func,
    i: React.PropTypes.number,
    items: React.PropTypes.arrayOf(React.PropTypes.shape).isRequired,
    selectedItem: React.PropTypes.shape().isRequired,
    selectedSubpage: React.PropTypes.shape(),
    subpage: React.PropTypes.shape().isRequired
  },

  handleSubItem() {
    this.props.dispatch(showSubpage(this.props.subpage.title));
  },
  render() {
    const { i, items, subpage, selectedItem, selectedSubpage } = this.props;

    return (<li
        className={'subitem ' + ((subpage === selectedSubpage) ? 'selected' : '')}
        key={items.indexOf(selectedItem) + ':' + i}
        onClick={this.handleSubItem}
            >{subpage.title}</li>);
  }
}));


const TableOfContents = React.createClass({
  displayName: 'TableOfContents',
  propTypes: {
    dispatch: React.PropTypes.func,
    items: React.PropTypes.arrayOf(React.PropTypes.shape).isRequired,
    selectedItem: React.PropTypes.shape(),
    selectedSubpage: React.PropTypes.shape()
  },

  getSubpage: (subpage, i) => {
    return (<Subpage
        i={i}
        subpage={subpage}
            />);
  },

  render: function() {
    const { items, selectedItem } = this.props;
    var subpages = selectedItem.subpages.map(this.getSubpage);
    let getItem = (item, i) => {
      return ([].concat(<ListItem
          i={i}
          item={item}
                        />).concat(
        (item === selectedItem) ? subpages : []));
    }

    return (<ul className="toc">
      {items.map(getItem)}
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
