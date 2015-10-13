/**
 * Multiple-choice quiz-style. Potential outcomes are summed and the dominant
 *  one is displayed.
 */

var $ = window.jQuery;

var Quiz = require('./quiz-base');

var QuizMultiple = function (element, options) {
  Quiz.call(this, element, options);
};

QuizMultiple.prototype = Object.create(Quiz.prototype);
QuizMultiple.prototype.constructor = Quiz;

QuizMultiple.prototype.setupQuestions = function () {
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
    $(window).scrollTo($unanswered[0], {duration: 250});
  }

  return finished;
};

QuizMultiple.prototype.calculateScore = function () {
  var scores = {};

  var formData = this.$element.find('form').serializeArray();
  if (formData.length > 0) {
    for (var i = 0; i < formData.length; i++) {
      var dataum = formData[i];
      var outcomeCount = parseInt(datum.value);

      if (!isNaN(outcomeCount)) {
        // answer corresponds to an outcome, either init or add to outcome value
        scores[outcomeCount] = scores[outcomeCount] ? scores[outcomeCount] + 1 : 1;
      }
    }
  } else {
    // no questions, select first outcome
    scores[this.$element.find('.outcome').eq(0).data('id')] = 1;
  }

  return scores;
};

QuizMultiple.prototype.pickOutcome = function (scores) {
  var $bestOutcome;
  var highScore = 0;
  scores.keys().forEach(function (key) {
    var $outcome = $('#outcome-' + key);
    var score = scores[key];

    if ((!$outcome.data('requirePerfect') || score === formData.length) &&
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
