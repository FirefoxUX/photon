/* global process:false, ga:false */
'use strict';

let PREFIX = '/photon';
if (process.env.NODE_ENV === 'development') {
  PREFIX = '';
} else if (process.env.NODE_ENV === 'staging') {
  PREFIX = '/photon-staging';
}

// GA Tracking code
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

// This GA tracking code is linked to ewright@mozilla.com,
// contact them to request access to the GA data
ga('create', 'UA-98252211-1', 'auto');

function getEnv() {
  return process.env.NODE_ENV;
}

function splitPath(path) {
  return path.replace(PREFIX, '').replace(/#.*/, '').split('/');
}

function parsePath(path) {
  let rv = splitPath(path);
  return rv.splice(rv.length - 2);
}

function getPage(path, pages) {
  var page, directory;
  [directory, page] = parsePath(path);
  page = pages.find(item => item.file === page && item.directory === directory);
  return page;
}

function getUrl(page) {
  let url = PREFIX + '/';
  if (page.directory) {
    url += page.directory + '/';
  }
  return url + page.file;
}

function getSiblingPages(page, pages) {
  const shown_pages = pages.filter(page => !page.hidden);
  var current_index = shown_pages.indexOf(page);
  var previous_page = shown_pages[current_index - 1] || shown_pages[shown_pages.length - 1];
  var next_page = shown_pages[current_index + 1] || shown_pages[0];
  return { previous_page, next_page }
}

function sendPageview(url, hash) {
  ga('send', 'pageview', url);
  if (hash) {
    sendEvent('load-hash', hash, url);
  }
}

function sendEvent(category, action, url) {
  ga('send', 'event', category, action, url);
}

module.exports = {PREFIX, getEnv, getPage, parsePath, getUrl, getSiblingPages, sendPageview, sendEvent};
