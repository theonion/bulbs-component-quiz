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
              '<input type="checkbox" vaue="0">' +
              '<div class="answer-explanation" style="display:none"></div>' +
            '</div>' +
            '<div class="answer">' +
              '<input type="checkbox" value="1">' +
              '<div class="answer-explanation" style="display:none"></div>' +
            '</div>' +
            '<div class="post-answer-body" style="display:none"></div>' +
          '<div>' +
          '<button class="check-outcome"></button>' +
        '</form>' +
        '<div class="outcome" data-min-score="2"></div>' +
        '<div class="outcome" data-min-score="0"></div>' +
      '</div>'
    );

    $('body').append($quizEl);

    quiz = new QuizTest($quizEl, {});

    // makes animations complete immediately
    $.fx.off = true;

    window.picturefill = function () {};
    spyOn(window, 'picturefill');
  });

  describe('setupQuestions', function () {

    it('should prevent other answers from being selected after choosing an answer', function () {

      quiz.setupQuestions();

      var $inputs = $quizEl.find('.answer input');

      expect($inputs.eq(0).prop('disabled')).toEqual(false);
      expect($inputs.eq(1).prop('disabled')).toEqual(false);

      $inputs.eq(0).trigger('change');

      expect($inputs.eq(0).prop('disabled')).toEqual(true);
      expect($inputs.eq(1).prop('disabled')).toEqual(true);
    });

    it('should show answer explanation and post answer after choosing an input', function () {

      quiz.setupQuestions();

      var $inputs = $quizEl.find('.answer input');

      expect($quizEl.find('.answer-explanation').is(':visible')).toEqual(false);
      expect($quizEl.find('.post-answer-body').is(':visible')).toEqual(false);

      $inputs.eq(0).trigger('change');

      expect($quizEl.find('.answer-explanation').is(':visible')).toEqual(true);
      expect($quizEl.find('.post-answer-body').is(':visible')).toEqual(true);
      expect(window.picturefill).toHaveBeenCalled();
    });
  });

  describe('isQuizFinished', function () {

    it('should return true if all questions have been answered', function () {

      var $questions = $quizEl.find('.question');

      // simulate answering all questions
      $questions.each(function () {
        $(this).data('unanswered', false);
      });

      expect(quiz.isQuizFinished()).toEqual(true);
    });

    describe('if all questions have not been answered', function () {
      var $questions;

      beforeEach(function () {
         $questions = $quizEl.find('.question');

        // simulate all questions being unanswered
        $questions.each(function () {
          $(this).data('unanswered', true);
        });
      });

      it('should return false', function () {
        expect(quiz.isQuizFinished()).toEqual(false);
      });

      it('should scroll to first unanswered question', function () {
        spyOn($, 'scrollTo');

        quiz.isQuizFinished();

        expect($.scrollTo).toHaveBeenCalledWith(
          $questions[0],
          {duration: quiz.settings.scrollToDuration}
        );
      });

      it('should show check outcome element', function () {
        var $checkOutcome = $quizEl.find('.check-outcome');

        $checkOutcome.hide();

        quiz.isQuizFinished();

        expect($checkOutcome.is(':visible')).toEqual(true);
      });
    });
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

      expect(quiz.pickOutcome(0)[0]).toEqual($outcomes[1]);
      expect(quiz.pickOutcome(1)[0]).toEqual($outcomes[1]);
      expect(quiz.pickOutcome(2)[0]).toEqual($outcomes[0]);
    });
  });
});
