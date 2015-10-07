/**
 * Tally quiz-style. Outcome is determined by the number of questions checked.
 */

var $ = require('jquery');
var utils = require('../quiz-utils');

var QuizTally = function (options) {
  this.settings = $.extend({
    element: null,
    outcomeRevealDuration: 500,
    outcomeScrollToOffsetTop: -20,
    sendAnalytics: false
  }, options);

  this.$element = $(this.settings.element);

  this.init();
};

QuizTally.prototype.init = function () {
  this.$element.find('.check-outcome').css('visibility', 'visible');
};

QuizTally.prototype.setup = function () {
  this.$element.find('form').on('submit', function (e) {
    e.preventDefault();

    self.$element.find('.check-outcome').hide();
    self.checkOutcome();
  });
};

QuizTally.prototype.checkOutcome = function () {
  var $window = $(window);
  var $questions = this.$element.find('input');

  // calculate user's score
  var formData = this.$element.find('form').serializeArray();
  var score = 0;
  $questions.each(function (i, el) {
    score += parseInt($(el).attr('value'));
  });

  // pick the outcome
  var $outcomes = this.$element.find('.outcome');
  var $bestOutcome;
  var minMaxScore = 0;
  $outcomes.each(function () {
    var $outcome = $(this);
    var minScore = $outcome.data('minScore');

    if (minScore <= score && minScore >= maxMinScore) {
      $bestOutcome = $outcome;
      maxMinScore = minScore;
    }
  });

  // check if there's a best outcome
  if ($bestOutcome) {
    // disable all inputs now that we have an outcome
    this.$element.find('input').prop('disabled', true);

    this.$element.find('.outcomes').show();

    var self = this;
    $bestOutcome.show(this.settings.outcomeRevealDuration, function () {
      window.picturefill($bestOutcome);

      self.$element.addClass('completed');
    });

    $window.scrollTo($bestOutcome, {
      duration: this.settings.outcomeRevealDuration,
      offset: {
        top: this.settings.outcomeScrollToOffsetTop
      }
    });

    if (this.settings.sendAnalytics) {
      utils.sendResultAnalytics($bestOutcome);
    }
  }
};

module.exports = QuizTally;
