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
              Utils.removeFrom($scope.questions, index);
            };

            $scope.questionAdd = function () {
              var newQuestion = $scope.questions.$create({quiz: $scope.articleId});
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
