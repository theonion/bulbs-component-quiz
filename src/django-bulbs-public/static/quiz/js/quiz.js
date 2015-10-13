var $ = window.jQuery;

var QuizCosmode = require('./types/quiz-cosmode');
var QuizMultiple = require('./types/quiz-multiple');
var QuizTally = require('./types/quiz-tally');
var QuizTest = require('./types/quiz-test');

/**
 * Turn each selected element into a quiz. The data-quiz-style attribute on given
 *  quiz elements will be used to determine which type of quiz will be created
 *  from the element.
 *
 * Each element will have a 'pluginQuiz' data key given to it whose value is the
 *  quiz object associated with that element. There all Quiz methods will be
 *  available for use.
 *
 * @param {jquery|string|HTMLElement} selector - selection to turn into quizzes.
 * @returns {jquery} selector as a jquery object.
 */
var QuizSetup = function (selector) {
  return $(selector).each(function () {

    var $el = $(this);
    var quizStyle = $el.data('quizStyle');

    var type;
    var options = {
      revealAllAnswers: $el.data('revealAllAnswers') || false
    };
    switch (quizStyle) {
      case 'cosmo':
        type = QuizCosmode;
        break;
      case 'multiple':
        type = QuizMultiple;
        break;
      case 'tally':
        type = QuizTally;
        break;
      case 'test':
        type = QuizTest;
        break;
      default:
        console.error('Invalid quiz type "' + quizStyle + '" cannot setup quiz');
    }

    if (type) {
      $el.data('pluginQuiz', new type($el, options));
    }
  });
};

module.exports = QuizSetup;
