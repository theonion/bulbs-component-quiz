/**
 * Multiple-choice quiz-style. Potential outcomes are summed and the dominant
 *  one is displayed.
 */

var $ = require('jquery');
var utils = require('../quiz-utils');

var QuizMultiple = function (options) {
  this.settings = $.extend({
    element: null,
    outcomeRevealDuration: 500,
    outcomeScrollToOffsetTop: -20,
    sendAnalytics: false
  }, options);

  this.$element = $(this.settings.element);

  this.init();
};

QuizMultiple.prototype.init = function () {
  this.$element.find('.check-outcome').css('visibility', 'visible');
};

QuizMultiple.prototype.setup = function () {
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

MultipleChoiceQuiz.prototype.checkOutcome = function () {
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

  var i;

  // calculate user's score
  var formData = this.$element.find('form').serializeArray();
  var counts = {};
  if (formData.length > 0) {
    for (i = 0; i < formData.length; i++) {
      var dataum = formData[i];
      var outcomeCount = parseInt(datum.value);

      if (!isNaN(outcomeCount)) {
        // answer corresponds to an outcome, either init or add to outcome value
        counts[outcomeCount] = counts[outcomeCount] ? counts[outcomeCount] + 1 : 1;
      }
    }
  } else {
    // no questions, select first outcome
    counts[this.$element.find('.outcome').eq(0).data('id')] = 1;
  }

  // pick the outcome
  var $bestOutcome;
  var highScore = 0;
  counts.keys().forEach(function (key) {
    var $outcome = $('#outcome-' + key);
    var count = counts[key];

    if ((!$outcome.data('requirePerfect') || count === formData.length) &&
        count >= highScore) {
      // either perfect score not required, or it is required and score is perfect,
      //  and it has a higher count than the high score, this is the current best
      $bestOutcome = $outcome;
      highScore = count;
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

module.exports = QuizMultiple;
