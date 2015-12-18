'use strict';

function buildPageRequest(page, text) {
  return {type: 'PAGE', data: page, text: text || ''};
}

function buildSubpageRequest(page, text) {
  return {type: 'SUBPAGE', data: page, text: text || ''};
}

function getContent(title, builder, getFile) {
  return (dispatch,  getState) => {
    dispatch(builder(title));
    return fetch(`contents/${getFile(getState())}`)
      .then(response => response.text())
      .then(text => dispatch(builder(title, text)));
  }
}

function showPage(title) {
  return getContent(title, buildPageRequest, (state) => {
    var item = state.sources.find(source => source.title === title);
    return item.file;
  });
}

function showSubpage(title) {
  return getContent(title, buildSubpageRequest,  (state) => {
    var item = state.sources.find(source => source.title === state.selectedSourceName);
    var subitem = item.subpages.find(subpage => subpage.title === title);
    return subitem.file;
  });
}

module.exports = {
  showPage: showPage,
  showSubpage: showSubpage
};
