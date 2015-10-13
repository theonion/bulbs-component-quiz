var Analytics = require('bulbs-public-analytics-manager/src/analytics-manager');

module.exports = {

  sendResultAnalytics: function ($outcome) {
    Analytics.sendEvent({
      eventCategory: 'Quiz result: ' + $outcome.find('.quiz-outcome').text(),
      eventAction: 'Quiz result',
      eventLabel: 'None',
      dimension1: window.targeting.dfp_pagetype
    });
  }
};
