var $ = require('jquery');

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

    var $el = $(el);
    var quizStyle = $el.data('quizStyle');

    var type;
    var options = {
      revealAllAnswers: $el.data('revealAllAnswers') || false
    };
    if (type === 'cosmo') {
      type = QuizCosmode;
    } else if (type === 'multiple') {
      type = QuizMultiple;
    } else if (type === 'tally') {
      type = QuizTally;
    } else if (type === 'test') {
      type = QuizTest;
    } else {
      console.error('Invalid quiz type "' + quizStyle + '" cannot setup quiz');
    }

    if (type) {
      $el.data('pluginQuiz', new type($el, options));
    }
  });
};

module.exports = QuizSetup;
