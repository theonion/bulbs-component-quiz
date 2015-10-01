'use strict';

angular.module('bulbs.quiz.questions.question.answer', [
  // HACK : this is using onion-editor without having a dependency on it, onionEditor directive
  //    needs to be separated from bulbs-cms then required here

  'uuid4'
])
    .directive('quizEditQuestionsQuestionAnswer', [
      'uuid4',
      function (uuid4) {
        return {
          link: function (scope) {
            scope.uuid = uuid4.generate();
          },
          restrict: 'E',
          templateUrl: 'bulbs/quiz-edit/quiz-edit-questions/quiz-edit-questions-question/quiz-edit-questions-question-answer/quiz-edit-questions-question-answer.html',
          scope: {
            answer: '=',
            quizStyle: '=',
            outcomes: '='
          }
        };
      }]
    );
