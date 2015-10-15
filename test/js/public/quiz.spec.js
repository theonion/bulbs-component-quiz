var $ = window.jQuery = require('jquery');

var QuizSetup = require('quiz');
var QuizCosmode = require('types/quiz-cosmode');
var QuizMultiple = require('types/quiz-multiple');
var QuizTally = require('types/quiz-tally');
var QuizTest = require('types/quiz-test');

describe('QuizSetup', function () {

  afterEach(function () {
    $('body').html('');
  });

  describe('individual initialization', function () {

    it('should work for cosmode type', function () {
      var $quiz = $('<div class="quiz" data-quiz-style="cosmo"></div>');
      $('body').append($quiz);

      QuizSetup('.quiz', {});

      expect($quiz.data('pluginQuiz') instanceof QuizCosmode).toEqual(true);
    });

    it('should work for multiple type', function () {
      var $quiz = $('<div class="quiz" data-quiz-style="multiple"></div>');
      $('body').append($quiz);

      QuizSetup('.quiz', {});

      expect($quiz.data('pluginQuiz') instanceof QuizMultiple).toEqual(true);
    });

    it('should work for tally type', function () {
      var $quiz = $('<div class="quiz" data-quiz-style="tally"></div>');
      $('body').append($quiz);

      QuizSetup('.quiz', {});

      expect($quiz.data('pluginQuiz') instanceof QuizTally).toEqual(true);
    });

    it('should work for test type', function () {
      var $quiz = $('<div class="quiz" data-quiz-style="test"></div>');
      $('body').append($quiz);

      QuizSetup('.quiz', {});

      expect($quiz.data('pluginQuiz') instanceof QuizTest).toEqual(true);
    });

    it('should log an error for invalid quiz type', function () {
      spyOn(console, 'error');

      var $quiz = $('<div class="quiz" data-quiz-style="not a type"></div>');
      $('body').append($quiz);

      QuizSetup('.quiz', {});

      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('multiple initialization', function () {

    it('should work when passing in a selector for multiple quizzes', function () {

      var $quiz1 = $('<div class="quiz" data-quiz-style="cosmo"></div>');
      var $quiz2 = $('<div class="quiz" data-quiz-style="multiple"></div>');
      var $quiz3 = $('<div class="quiz" data-quiz-style="tally"></div>');
      var $quiz4 = $('<div class="quiz" data-quiz-style="test"></div>');
      $('body')
        .append($quiz1)
        .append($quiz2)
        .append($quiz3)
        .append($quiz4);

      QuizSetup('.quiz', {});

      expect($quiz1.data('pluginQuiz') instanceof QuizCosmode).toEqual(true);
      expect($quiz2.data('pluginQuiz') instanceof QuizMultiple).toEqual(true);
      expect($quiz3.data('pluginQuiz') instanceof QuizTally).toEqual(true);
      expect($quiz4.data('pluginQuiz') instanceof QuizTest).toEqual(true);
    });
  });
});
