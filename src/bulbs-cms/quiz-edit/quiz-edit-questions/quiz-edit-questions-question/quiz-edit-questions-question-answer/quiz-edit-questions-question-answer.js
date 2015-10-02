'use strict';

angular.module('bulbs.quiz.questions.question.answer', [
  'uuid4'
  // HACK : this is using onion-editor without having a dependency on it, onionEditor directive
  //    needs to be separated from bulbs-cms then required here
])
    .directive('quizEditQuestionsQuestionAnswer', [
      'uuid4',
      function (uuid4) {
        return {
          controller: [
            '$scope',
            function ($scope) {
              $scope.uuid = uuid4.generate();
            }
          ],
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
