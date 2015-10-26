var $ = window.jQuery = require('jquery');
$.scrollTo = require('jquery.ScrollTo');

var QuizCosmode = require('types/quiz-cosmode');

describe('QuizCosmode', function () {

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

    quiz = new QuizCosmode($quizEl, {});

    // makes animations complete immediately
    $.fx.off = true;

    window.picturefill = function () {};
    spyOn(window, 'picturefill');
  });

  afterEach(function () {
    $('body').html('');
  });

  describe('setupQuestions', function () {

    beforeEach(function () {
      quiz.setupQuestions();
    });

    it('should mark all questions unanswerd', function () {
      $quizEl.find('.question').each(function () {
        expect($(this).data('unanswered')).toEqual(true);
      });
    });

    it('should mark a question answered when one of its answer is selected', function () {

      var $question = $quizEl.find('.question').eq(0);

      $question.find('.answer input').eq(0).trigger('change');

      expect($question.data('unanswered')).toEqual(false);
    });

    it('should show answer explanation and post answer after choosing an input', function () {

      var $inputs = $quizEl.find('.answer input');

      expect($quizEl.find('.post-answer-body').is(':visible')).toEqual(false);

      $inputs.eq(0).trigger('change');

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

    describe('if not all questions have been answered', function () {
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

      $outcomes.eq(0).data('minScore', 2);
      $outcomes.eq(1).data('minScore', 0);

      expect(quiz.pickOutcome(0)[0]).toEqual($outcomes[1]);
      expect(quiz.pickOutcome(1)[0]).toEqual($outcomes[1]);
      expect(quiz.pickOutcome(2)[0]).toEqual($outcomes[0]);
    });
  });
});
