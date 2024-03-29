/**
 * Tally quiz-style. Outcome is determined by the number of questions checked.
 */

var $ = window.jQuery;

var Quiz = require('./quiz-type-base');

var QuizTally = function (element, options) {
  Quiz.call(this, element, options);
};

QuizTally.prototype = Object.create(Quiz.prototype);
QuizTally.prototype.constructor = Quiz;

QuizTally.prototype.calculateScore = function () {
  var score = 0;
  this.$element
    .find('form input:checked')
    .each(function () {
      score += Number($(this).prop('value'));
    });
  return score;
};

QuizTally.prototype.pickOutcome = function (score) {
  var $bestOutcome;

  var $outcomes = this.$element.find('.outcome');
  var maxMinScore = 0;
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
