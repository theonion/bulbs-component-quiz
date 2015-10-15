/**
 * Quiz that is a blend of tally and multiple-choice.
 */

var $ = window.jQuery;

var Quiz = require('./quiz-type-base');

var QuizCosmode = function (element, options) {
  Quiz.call(this, element, options);
};

QuizCosmode.prototype = Object.create(Quiz.prototype);
QuizCosmode.prototype.constructor = Quiz;

QuizCosmode.prototype.setupQuestions = function () {
  var self = this;

  this.getQuestions().each(function () {

    var $question = $(this);

    $question.data('unanswered', true);

    $question.find('.answer').each(function () {

      var $answer = $(this);
      var $inputs = $answer.find('input');
      $inputs.on('change', function (e) {

        $question.data('unanswered', false);

        // reveal post-answer content
        $question.find('.post-answer-body')
          .show(self.settings.answerRevealDuration, function () {
            window.picturefill(this);
          });
      });
    });
  });
};

QuizCosmode.prototype.isQuizFinished = function () {
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
    $(window).scrollTo($unanswered[0], {duration: this.settings.scrollToDuration});
  }

  return finished;
};

QuizCosmode.prototype.calculateScore = function () {
  var score = 0;
  this.$element
    .find('form input:checked')
    .each(function () {
      score += Number($(this).prop('value'));
    });
  return score;
};

QuizCosmode.prototype.pickOutcome = function (score) {
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

module.exports = QuizCosmode;
