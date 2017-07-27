'use strict';

const React = require('react');
const { sendEvent } = require('./utilities.js');
const { connect } = require('react-redux');
const { changeFeedbackMessage } = require('./actions.js');

const Feedback = connect(state => {
  var {feedback_ask} = state.data;
  return {feedback_ask};
})(React.createClass({
  displayName: 'Feedback',
  propTypes: {
    dispatch: React.PropTypes.func,
    feedback_ask: React.PropTypes.string
  },

  handleClick: function (e) {
    sendEvent('feedback-click', e.target.id, window.location.pathname);
    if (e.target.id === 'thumbs-down') {
      window.open('https://github.com/FirefoxUX/photon/issues','_blank');
    }
    changeFeedbackMessage(this.props.dispatch, false)
  },

  handleXClick: function () {
    changeFeedbackMessage(this.props.dispatch, true)
  },

  render: function() {
    return(
      <div className="center mw7 ph3 mb4 mb5-l">
        <div className="w-100 ba b--light-gray br2 ph3 pb1 flex-ns justify-between-ns items-center-ns">
          {this.props.feedback_ask &&
            <div className="w-100 flex-ns justify-between-ns items-center-ns">
              <p className="mt0 mb3 mb0-ns lh-copy pt2-ns"
                  id="feedback-text"
              >{'Tell us, was the content of this page helpful?'}</p>
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
        ||
        <div className="w-100 tc flex-ns items-center-ns">
          <span className="flex-auto b mt0 mb3 mb0-ns lh-copy pt2-ns"
              id="feedback-text"
          >{'Thank you for the feedback!'}</span>
          <a className="close-feedback"
              onClick={this.handleXClick}
          ></a>
        </div>
        }
        </div>
      </div>)
  }
}));

module.exports = Feedback;
