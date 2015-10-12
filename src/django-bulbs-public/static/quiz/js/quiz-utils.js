var Analytics = require('bulbs.public.analyticsManager');

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
