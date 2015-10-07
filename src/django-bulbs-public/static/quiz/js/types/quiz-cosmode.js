/**
 * Quiz that is a blend of tally and multiple-choice.
 */

var $ = require('jquery');
var utils = require('../quiz-utils');

var QuizCosmode = function (options) {
  this.settings = $.extend({
    element: null,
    outcomeRevealDuration: 500,
    outcomeScrollToOffsetTop: -20,
    sendAnalytics: false
  }, options);

  this.$element = $(this.settings.element);

  this.init();
};

QuizCosmode.prototype.init = function () {
  this.$element.find('.check-outcome').css('visibility', 'visible');
};

QuizCosmode.prototype.setup = function () {

  var self = this;

  this.$element.find('.question').each(function () {

    var $question = $(this);

    $question.data('unanswered', true);

    $question.find('.answer').each(function () {

      var $answer = $(this);
      var $inputs = $answer.find('input');
      $inputs.on('change', function (e) {

        $question.data('unanswered', false);

        // reveal post-answer content
        $question.find('.post-answer-body').show(100, function () {
          window.picturefill(this);
        });
      });
    });
  });

  this.$element.find('form').on('submit', function (e) {
    e.preventDefault();

    self.$element.find('.check-outcome').hide();
    self.checkOutcome();
  });
};

QuizTest.prototype.checkOutcome = function () {
  var $window = $(window);
  var $questions = this.$element.find('.question');
  var $unanswered = $questions.filter('[data-unanswered="false"]');

  // make sure they answered all the questions
  if ($questions.length !== $unanswered.length) {
    // some question not answered
    this.$element.find('.check-outcome').show();

    // scroll to first unanswered question
    var firstUnanswered = $unanswered[0];
    $window.scrollTo(firstUnanswered, {duration: 250});

    return false;
  }

  // calculate user's score
  var formData = this.$element.find('form').serializeArray();
  var score = 0;
  var i;
  for (i = 0; i < formData.length; i++) {
      var datum = formData[i];
      score += parseInt(datum.value);
  }

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

module.exports = QuizCosmode;
