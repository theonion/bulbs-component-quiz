/**
 * Multiple-choice quiz-style. Potential outcomes are summed and the dominant
 *  one is displayed.
 */

var $ = window.jQuery;

var Quiz = require('./quiz-type-base');

var QuizMultiple = function (element, options) {
  Quiz.call(this, element, options);
};

QuizMultiple.prototype = Object.create(Quiz.prototype);
QuizMultiple.prototype.constructor = Quiz;

QuizMultiple.prototype.setupQuestions = function () {
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

QuizMultiple.prototype.isQuizFinished = function () {
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

QuizMultiple.prototype.calculateScore = function () {
  var scores = {};
  this.$element
    .find('form input:checked')
    .each(function () {
      var outcomeId = Number($(this).prop('value'));

      if (!isNaN(outcomeId)) {
        var key = 'outcome-' + outcomeId;
        scores[key] = scores[key] ? scores[key] + 1 : 1;
      }
    });

  if (Object.keys(scores).length === 0) {
    // no scores yet, just select first outcome
    scores[this.$element.find('.outcome').eq(0).attr('id')] = 1;
  }

  return scores;
};

QuizMultiple.prototype.pickOutcome = function (scores) {
  var self = this;
  var $bestOutcome;
  var highScore = 0;
  Object.keys(scores).forEach(function (key) {
    var $outcome = self.$element.find('#' + key);
    var score = scores[key];

    if ((!$outcome.data('requirePerfect') || Object.keys(scores).length === 1) &&
        score >= highScore) {
      // either perfect score not required, or it is required and score is perfect,
      //  and it has a higher count than the high score, this is the current best
      $bestOutcome = $outcome;
      highScore = score;
    }
  });
  return $bestOutcome;
};

module.exports = QuizMultiple;
