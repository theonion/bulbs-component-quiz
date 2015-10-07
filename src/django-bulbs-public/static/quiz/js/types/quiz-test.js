/**
 * Not a test for quizzes, but rather the "test" quiz type.
 *
 * Quiz which has right and wrong answers.
 */

var $ = require('jquery');
var utils = require('../quiz-utils');

var QuizTest = function (options) {
  this.settings = $.extend({
    element: null,
    outcomeRevealDuration: 500,
    outcomeScrollToOffsetTop: -20,
    revealAllAnswers: false,
    sendAnalytics: false
  }, options);

  this.$element = $(this.settings.element);

  this.init();
};

QuizTest.prototype.init = function () {
  this.$element.find('.check-outcome').css('visibility', 'visible');
};

QuizTest.prototype.setup = function () {

  var self = this;

  this.$element.find('.question').each(function () {

    var $question = $(this);

    $question.data('unanswered', true);

    $question.find('.answer').each(function () {

      var $answer = $(this);
      var $inputs = $answer.find('input');
      $inputs.on('change', function (e) {

        var $input = $(this);

        // you may only answer once per question, disable all inputs
        $inputs.not($input).prop('disabled', true);

        $question.data('unanswered', false);

        // reveal explanation for the selected answer only
        $answer.find('.answer-explanation').show(100, function () {
          window.picturefill(this);
        });
        $question.addClass(self.revealAllAnswers ? 'reveal-all-answers' : 'reveal-answer');

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
    if (datum.value === 'True') {
      score++;
    }
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

module.exports = QuizTest;
