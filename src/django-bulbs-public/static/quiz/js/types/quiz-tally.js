/**
 * Tally quiz-style. Outcome is determined by the number of questions checked.
 */

var $ = window.jQuery;

var Quiz = require('./quiz-base');

var QuizTally = function (element, options) {
  Quiz.call(this, element, options);
};

QuizTally.prototype = Object.create(Quiz.prototype);
QuizTally.prototype.constructor = Quiz;

QuizTally.prototype.calculateScore = function () {
  var score = 0;

  var formData = this.$element.find('form').serializeArray();
  this.$questions.each(function (i, el) {
    score += parseInt($(el).attr('value'));
  });

  return score
};

QuizTally.prototype.pickOutcome = function (score) {
  var $bestOutcome;

  var $outcomes = this.$element.find('.outcome');
  var minMaxScore = 0;
  $outcomes.each(function () {
    var $outcome = $(this);
    var minScore = $outcome.data('minScore');

    if (minScore <= score && minScore >= maxMinScore) {
      $bestOutcome = $outcome;
      maxMinScore = minScore;
    }
  });

  return $bestOutcome;
};

module.exports = QuizTally;
