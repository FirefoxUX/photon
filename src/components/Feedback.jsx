'use strict';

const React = require('react');
const { sendEvent } = require('./utilities.js');

const Feedback = React.createClass({
  displayName: 'Feedback',
  handleClick: function (e) {
    sendEvent('feedback-click', e.target.id, window.location.pathname);
    if (e.target.id === 'thumbs-down') {
      window.open('https://github.com/FirefoxUX/photon/issues','_blank');
    }
  },

  render: function() {
    return(
      <div className="center mw7 ph3 mb4 mb5-l">
        <div className="w-100 ba b--light-gray br2 ph3 pb1 flex-ns justify-between-ns items-center-ns">
          <p className="mt0 mb3 mb0-ns lh-copy pt2-ns">{'Tell us, was the content of this page helpful?'}</p>
          <p className="ma0">
            <a className="mr3 no-underline f3 lh-copy dib pt2"
                id="thumbs-up"
                onClick={this.handleClick}
            >{'👍'}
          </a>
            <a className="no-underline f3 lh-copy dib pt2"
                id="thumbs-down"
                onClick={this.handleClick}
            >{'👎'}
          </a>
          </p>
        </div>
      </div>)
  }
});

module.exports = Feedback;
