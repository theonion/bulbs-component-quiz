/**
 * Not a test for quizzes, but rather the "test" quiz type.
 *
 * Quiz which has right and wrong answers.
 */

var $ = window.jQuery;

var Quiz = require('./quiz-type-base');

var QuizTest = function (element, options) {
  Quiz.call(this, element, $.extend({
    revealAllAnswers: false
  }, options));
};

QuizTest.prototype = Object.create(Quiz.prototype);
QuizTest.prototype.constructor = Quiz;

QuizTest.prototype.setupQuestions = function () {
  var self = this;

  this.getQuestions().each(function () {

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
};

QuizTest.prototype.isQuizFinished = function () {
  var finished = false;

  var $unanswered = this.$questions.filter(function () {
    return $(this).data('unanswered') === true;
  });

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

QuizTest.prototype.calculateScore = function () {
  var formData = this.$element.find('form').serializeArray();
  var score = 0;
  var i;
  for (i = 0; i < formData.length; i++) {
    var datum = formData[i];
    if (datum.value === 'True') {
      score++;
    }
  }

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
