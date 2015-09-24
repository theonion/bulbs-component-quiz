'use strict';

angular.module('bulbs.quiz.edit.questions', [
  'bulbs.quiz.edit.questions.question',
  // HACK : import utils from another 3rd party package, not bulbs-cms
  'utils'
])
    .directive('quizEditQuestions', function () {
      return {
        controller: [
          '$scope', 'Utils',
          function ($scope, Utils) {

            $scope.questionMove = function (index, indexTo) {
              Utils.moveTo($scope.questions, index, indexTo);
            };

            $scope.questionDelete = function (question, index) {
              question.$destroy();
            };

            $scope.questionAdd = function () {
              $scope.questions.$create({quiz: articleId});
            };
          }
        ],
        restrict: 'E',
        templateUrl: 'bulbs/quiz-edit/quiz-edit-questions/quiz-edit-questions.html',
        scope: {
          articleId: '=',
          questions: '=',
          outcomes: '=',
          quizStyle: '@'
        }
      };
    });
