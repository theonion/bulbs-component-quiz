var $ = window.jQuery = require('jquery');
$.scrollTo = require('jquery.ScrollTo');

var Analytics = require('bulbs-public-analytics-manager/src/analytics-manager');
var Quiz = require('types/quiz-type-base');

describe('Quiz', function () {

  var quiz;
  var $quizEl;

  beforeEach(function () {
    $quizEl = $(
      '<div>' +
        '<form>' +
          '<div class="question">' +
            '<div class="answer">' +
              '<input type="checkbox" value="0">' +
              '<div class="answer-explanation" style="display:none"></div>' +
            '</div>' +
            '<div class="answer">' +
              '<input type="checkbox" value="1">' +
              '<div class="answer-explanation" style="display:none"></div>' +
            '</div>' +
            '<div class="post-answer-body" style="display:none"></div>' +
          '<div>' +
          '<div class="question">' +
            '<div class="answer">' +
              '<input type="checkbox" value="0">' +
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
        '<div class="outcomes">' +
          '<div class="outcome"></div>' +
          '<div class="outcome"></div>' +
        '</div>' +
      '</div>'
    );

    $('body').append($quizEl);

    quiz = new Quiz($quizEl, {});

    // makes animations complete immediately
    $.fx.off = true;

    window.picturefill = function () {};
    spyOn(window, 'picturefill');

    spyOn(Analytics, 'sendEvent');
  });

  afterEach(function () {
    $('body').html('');
  });

  describe('getQuestions', function () {

    it('should select all questions', function () {

      var $questions = $quizEl.find('.question');

      expect(quiz.getQuestions()[0]).toEqual($questions[0]);
      expect(quiz.getQuestions()[1]).toEqual($questions[1]);
    });
  });

  describe('setupSubmit', function () {
    var event;

    beforeEach(function () {
      event = $.Event('submit');
    });

    it('should not cause the form to actually submit on form submit', function () {

      quiz.setupSubmit();
      $quizEl.find('form').trigger(event);

      expect(event.isDefaultPrevented()).toEqual(true);
    });

    it('should hide outcome check element on form submit', function () {

      var $checkOutcome = $quizEl.find('.check-outcome');
      $checkOutcome.show();

      quiz.setupSubmit();
      $quizEl.find('form').trigger(event);

      expect($checkOutcome.is(':visible')).toEqual(false);
    });

    it('should call checkOutcome function on submit', function () {
      spyOn(quiz, 'checkOutcome');

      quiz.setupSubmit();
      $quizEl.find('form').trigger(event);

      expect(quiz.checkOutcome).toHaveBeenCalled();
    });
  });

  describe('setup', function () {

    it('should make outcome check element visible', function () {

      var $checkOutcome = $quizEl.find('.check-outcome');
      $checkOutcome.hide();

      quiz.setup();

      expect($checkOutcome.is(':visible')).toEqual(true);
    });

    it('should call other setup functions', function () {
      spyOn(quiz, 'setupQuestions');
      spyOn(quiz, 'setupSubmit');

      quiz.setup();

      expect(quiz.setupQuestions).toHaveBeenCalled();
      expect(quiz.setupSubmit).toHaveBeenCalled();
    });
  });

  describe('sendResultAnalytics', function () {

    it('should call Analytics.sendEvent with configured analytics object', function () {
      var outcome = {one: 'two'};
      var analyticsObject = {three: 'four'};

      spyOn(quiz.settings, 'getAnalyticsObject').and.returnValue(analyticsObject);

      quiz.sendResultAnalytics(outcome);

      expect(quiz.settings.getAnalyticsObject).toHaveBeenCalledWith(outcome);
      expect(Analytics.sendEvent).toHaveBeenCalledWith(analyticsObject);
    });
  });

  describe('completeQuiz', function () {
    var $bestOutcome;

    beforeEach(function () {
      $bestOutcome = $quizEl.find('.outcome').eq(0);
    });

    it('should disable all inputs', function () {
      var $inputs = $quizEl.find('input');

      $inputs.each(function () {
        $(this).prop('disabled', false);
      });

      quiz.completeQuiz($bestOutcome);

      $inputs.each(function () {
        expect($(this).prop('disabled')).toEqual(true);
      });
    });

    it('should show outcome element', function () {
      var $outcomesEl = $quizEl.find('.outcomes');

      $outcomesEl.hide();

      quiz.completeQuiz($bestOutcome);

      expect($outcomesEl.is(':visible')).toEqual(true);
    });


    it('should add a completed class to quiz element', function () {
      quiz.completeQuiz($bestOutcome);

      expect($quizEl.hasClass('completed'));
    });

    it('should show the best outcome and picturefill it', function () {
      $bestOutcome.hide();

      quiz.completeQuiz($bestOutcome);

      expect($bestOutcome.is(':visible')).toEqual(true);
      expect(window.picturefill).toHaveBeenCalledWith($bestOutcome.find('.image')[0]);
    });

    it('should scroll to the best outcome', function () {
      spyOn($, 'scrollTo');

      quiz.completeQuiz($bestOutcome);

      expect($.scrollTo).toHaveBeenCalledWith(
        $bestOutcome,
        {
          duration: quiz.settings.outcomeRevealDuration,
          offset: {
            top: quiz.settings.outcomeScrollToOffsetTop
          }
        }
      );
    });

    it('should send analytics if sendAnalytics setting is true', function () {
      spyOn(quiz, 'sendResultAnalytics');

      quiz.settings.sendAnalytics = true;
      quiz.completeQuiz($bestOutcome);

      expect(quiz.sendResultAnalytics).toHaveBeenCalledWith($bestOutcome);
    });

    it('should not send analytics if sendAnalytics setting is false', function () {
      spyOn(quiz, 'sendResultAnalytics');

      quiz.settings.sendAnalytics = false;
      quiz.completeQuiz($bestOutcome);

      expect(quiz.sendResultAnalytics).not.toHaveBeenCalled();
    });
  });

  describe('checkOutcome', function () {
    var spyIsQuizFinished;
    var spyCalculateScore;
    var spyPickOutcome;
    var spyCompleteQuiz;

    beforeEach(function () {
      spyIsQuizFinished = spyOn(quiz, 'isQuizFinished');
      spyCalculateScore = spyOn(quiz, 'calculateScore');
      spyPickOutcome = spyOn(quiz, 'pickOutcome');
      spyCompleteQuiz = spyOn(quiz, 'completeQuiz');
    });

    it('should return false if quiz is not finished', function () {
      spyIsQuizFinished.and.returnValue(false);

      var outcomeReturn = quiz.checkOutcome();

      expect(outcomeReturn).toEqual(false);
      expect(quiz.isQuizFinished).toHaveBeenCalled();
      expect(quiz.calculateScore).not.toHaveBeenCalled();
      expect(quiz.pickOutcome).not.toHaveBeenCalled();
      expect(quiz.completeQuiz).not.toHaveBeenCalled();
    });

    it('should return true if quiz is finished and call completion functions', function () {
      var score = 5;
      var $bestOutcome = {};

      spyIsQuizFinished.and.returnValue(true);
      spyCalculateScore.and.returnValue(score);
      spyPickOutcome.and.returnValue($bestOutcome);

      var outcomeReturn = quiz.checkOutcome();

      expect(outcomeReturn).toEqual(true);
      expect(quiz.isQuizFinished).toHaveBeenCalled();
      expect(quiz.calculateScore).toHaveBeenCalled();
      expect(quiz.pickOutcome).toHaveBeenCalledWith(score);
      expect(quiz.completeQuiz).toHaveBeenCalledWith($bestOutcome);
    });
  });
});
