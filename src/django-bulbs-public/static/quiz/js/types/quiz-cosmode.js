/**
 * Quiz that is a blend of tally and multiple-choice.
 */

var $ = window.jQuery;

var Quiz = require('./quiz-base');

var QuizCosmode = function (element, options) {
  Quiz.call(this, element, options);
};

QuizCosmode.prototype = Object.create(Quiz.prototype);
QuizCosmode.prototype.constructor = Quiz;

QuizCosmode.prototype.setupQuestions = function () {
  this.getQuestions().each(function () {

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
};

QuizCosmode.prototype.isQuizFinished = function () {
  var finished = false;

  var $unanswered = this.$questions.filter('[data-unanswered="false"]');

  if (this.$questions.length === $unanswered.length) {
    finished = true;
  } else {
    // some question not answered
    finished = false;

    this.$element.find('.check-outcome').show();

    // scroll to first unanswered question
    $(window).scrollTo($unanswered[0], {duration: 250});
  }

  return finished;
};

QuizCosmode.prototype.calculateScore = function () {
  var formData = this.$element.find('form').serializeArray();
  var score = 0;
  var i;
  for (i = 0; i < formData.length; i++) {
    var datum = formData[i];
    score += parseInt(datum.value);
  }

  return score;
};

QuizCosmode.prototype.pickOutcome = function (score) {
  var $bestOutcome;

  var minMaxScore = 0;
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
