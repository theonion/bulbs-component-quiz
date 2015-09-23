'use strict';

angular.module('bulbs.quiz.questions.question.answer', [
  // HACK : this is using onion-editor without having a dependency on it, onionEditor directive
  //    needs to be separated from bulbs-cms then required here
])
    .directive('quizEditQuestionsQuestionAnswer', function () {
      return {
        restrict: 'E',
        templateUrl: 'bulbs/quiz-edit/quiz-edit-questions/quiz-edit-questions-question/quiz-edit-questions-question-answer/quiz-edit-questions-question-answer.html',
        scope: {
          answer: '=',
          quizStyle: '=',
          outcomes: '='
        }
      };
    });
