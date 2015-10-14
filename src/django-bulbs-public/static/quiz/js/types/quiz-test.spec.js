var $ = window.jQuery = require('jquery/dist/jquery');
var QuizTest = require('./quiz-test');

describe('QuizTest', function () {

  var quiz;
  var $quizEl;

  beforeEach(function () {
    $quizEl = $(
      '<div>' +
        '<div class="question">' +
          '<div class="answer">' +
            '<input type="checkbox">' +
            '<div class="answer-explanation" style="display:none"></div>' +
          '</div>' +
          '<div class="answer">' +
            '<input type="checkbox">' +
          '</div>' +
        '<div>' +
      '</div>'
    );

    $('body').append($quizEl);

    quiz = new QuizTest($quizEl, {});

    jasmine.clock().install();
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  describe('.setupQuestions', function () {

    it('should prevent other answers from being selected after choosing an answer', function () {

      quiz.setupQuestions();

      var $inputs = $quizEl.find('.answer input');

      expect($inputs.eq(0).prop('disabled')).toEqual(false);
      expect($inputs.eq(1).prop('disabled')).toEqual(false);

      $inputs.eq(0).trigger('change');

      expect($inputs.eq(0).prop('disabled')).toEqual(true);
      expect($inputs.eq(1).prop('disabled')).toEqual(true);
    });

    it('should show answer explanation after choosing an input', function () {

      quiz.setupQuestions();

      var $inputs = $quizEl.find('.answer input');

      expect($quizEl.find('.answer-explanation').is(':visible')).toEqual(false);

      $inputs.eq(0).trigger('change');

      expect($quizEl.find('.answer-explanation').is(':visible')).toEqual(true);
    });
  });
});
