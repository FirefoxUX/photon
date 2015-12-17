'use strict';

function buildPageRequest(page, text) {
  return {type: 'PAGE', data: page, text: text || ''};
}

function buildSubpageRequest(page, text) {
  return {type: 'SUBPAGE', data: page, text: text || ''};
}

function showPage(page) {
  return (dispatch,  getState) => {
    dispatch(buildPageRequest(page));
    const state = getState();
    var item = state.sources.find(source => source.title === page);

    return fetch(`contents/${item.file}`)
      .then(response => response.text())
      .then(text => dispatch(buildPageRequest(page, text)));
  }
}

function showSubpage(subpage) {
  return (dispatch,  getState) => {
    dispatch(buildSubpageRequest(subpage));
    const state = getState();
    var item = state.sources.find(source => source.title === state.selectedSourceName);
    var subitem = item.subpages.find(subitem => subitem.title === subpage);

    return fetch(`contents/${subitem.file}`)
      .then(response => response.text())
      .then(text => dispatch(buildSubpageRequest(subpage, text)));
  }
}

module.exports = {
  showPage: showPage,
  showSubpage: showSubpage
};
