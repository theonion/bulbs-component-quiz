/**
 * Not a test for quizzes, but rather the "test" quiz type.
 *
 * Quiz which has right and wrong answers.
 */

var $ = window.jQuery;

var Quiz = require('./quiz-type-base');

var QuizTest = function (element, options) {
  Quiz.call(this, element, $.extend({
    revealAllAnswers: $(element).data('revealAllAnswers') || false
  }, options));
};

QuizTest.prototype = Object.create(Quiz.prototype);
QuizTest.prototype.constructor = Quiz;

QuizTest.prototype.setupQuestions = function () {
  var self = this;

  this.getQuestions().each(function () {
    var $question = $(this);

    $question.data('unanswered', true);

    $question.find('.answer input').on('change', function (e) {
      var $input = $(this);
      var $answer = $input.parents('.answer');

      // you may only answer once per question, disable all inputs
      $question.find('input').prop('disabled', true);

      $question.data('unanswered', false);

      // reveal explanation for the selected answer only
      $answer.find('.answer-explanation')
        .show(self.settings.answerRevealDuration, function () {
          window.picturefill(this);
        });

      $question.addClass(self.settings.revealAllAnswers ? 'reveal-all-answers' : 'reveal-answer');

      // reveal post-answer content
      $question.find('.post-answer-body')
        .show(self.settings.answerRevealDuration, function () {
          window.picturefill(this);
        });
    });
  });
};

QuizTest.prototype.isQuizFinished = function () {
  var finished = false;

  var $unanswered = this.$questions.filter(function () {
    return $(this).data('unanswered') === true;
  });

  if ($unanswered.length === 0) {
    finished = true;
  } else {
    // some question not answered
    finished = false;

    this.$element.find('.check-outcome').show();

    // scroll to first unanswered question
    $.scrollTo($unanswered[0], {duration: this.settings.scrollToDuration});
  }

  return finished;
};

QuizTest.prototype.calculateScore = function () {
  var score = 0;
  this.$element
    .find('form input:checked')
    .each(function () {
      score += Number($(this).prop('value'));
    });
  return score;
};

QuizTest.prototype.pickOutcome = function (score) {
  var $bestOutcome;

  var maxMinScore = 0;
  this.$element.find('.outcome').each(function () {
    var $outcome = $(this);
    var minScore = $outcome.data('minScore');

    if (minScore <= score && minScore >= maxMinScore) {
      $bestOutcome = $outcome;
      maxMinScore = minScore;
    }
  });

  return $bestOutcome;
};

module.exports = QuizTest;
