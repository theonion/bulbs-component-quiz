var $ = window.jQuery = require('jquery');
$.scrollTo = require('jquery.ScrollTo');

var QuizTest = require('./quiz-test');

describe('QuizTest', function () {

  var quiz;
  var $quizEl;

  beforeEach(function () {
    $quizEl = $(
      '<div>' +
        '<form>' +
          '<div class="question">' +
            '<div class="answer">' +
              '<input type="checkbox" value="0">' +
            '</div>' +
            '<div class="answer">' +
              '<input type="checkbox" value="1">' +
            '</div>' +
            '<div class="post-answer-body" style="display:none"></div>' +
          '<div>' +
          '<button class="check-outcome"></button>' +
        '</form>' +
        '<div class="outcome"></div>' +
        '<div class="outcome"></div>' +
      '</div>'
    );

    $('body').append($quizEl);

    quiz = new QuizTest($quizEl, {});

    // makes animations complete immediately
    $.fx.off = true;

    window.picturefill = function () {};
    spyOn(window, 'picturefill');
  });

  describe('calculateScore', function () {

    it('should score based on the number of correctly checked inputs', function () {

      var $inputs = $quizEl.find('.answer input');

      $inputs.eq(1).prop('checked', true);

      expect(quiz.calculateScore()).toEqual(1);
    });
  });

  describe('pickOutcome', function () {

    it('should choose the minimum best outcome given a score', function () {

      var $outcomes = $quizEl.find('.outcome');

      $outcomes.eq(0).data('minScore', 2);
      $outcomes.eq(1).data('minScore', 0);

      expect(quiz.pickOutcome(0)[0]).toEqual($outcomes[1]);
      expect(quiz.pickOutcome(1)[0]).toEqual($outcomes[1]);
      expect(quiz.pickOutcome(2)[0]).toEqual($outcomes[0]);
    });
  });
});
