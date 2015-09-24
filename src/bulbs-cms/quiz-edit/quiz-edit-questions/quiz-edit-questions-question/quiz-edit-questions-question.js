'use strict';

angular.module('bulbs.quiz.edit.questions.question', [
  'bulbs.quiz.questions.question.answer',
  'bulbs.quiz.questions.question.answer.filters.title',
  // HACK : import utils from another 3rd party package, not bulbs-cms
  'utils'
  // HACK : this is using onion-editor without having a dependency on it, onionEditor directive
  //    needs to be separated from bulbs-cms then required here
])
    .directive('quizEditQuestionsQuestion', function () {
      return {
        controller: [
          '$scope', 'Utils',
          function ($scope, Utils) {

            $scope.answerMove = function (index, indexTo) {
              Utils.moveTo($scope.question.answers, index, indexTo);
            };

            $scope.answerDelete = function (answer, index) {
              answer.$destroy();
            };

            $scope.answerAdd = function (answer) {
              $scope.answers.$create({question: question.id});
            };
          }
        ],
        restrict: 'E',
        templateUrl: 'bulbs/quiz-edit/quiz-edit-questions/quiz-edit-questions-question/quiz-edit-questions-question.html',
        scope: {
          outcomes: '=',
          question: '=',
          quizStyle: '@'
        }
      };
    });
