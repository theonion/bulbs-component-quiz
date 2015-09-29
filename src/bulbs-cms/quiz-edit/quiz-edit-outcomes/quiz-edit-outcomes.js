'use strict';

angular.module('bulbs.quiz.edit.outcomes', [
  'bulbs.quiz.api.outcome',
  'bulbs.quiz.edit.outcomes.outcome',
  // HACK : import utils from another 3rd party package, not bulbs-cms
  'utils'
])
    .directive('quizEditOutcomes', function () {
      return {
        controller: [
          '$scope', 'QuizOutcome', 'Utils',
          function ($scope, QuizOutcome, Utils) {

            $scope.outcomeMove = function (index, indexTo) {
              Utils.moveTo($scope.outcomes, index, indexTo);
            };

            $scope.outcomeDelete = function (outcome, index) {
              outcome.$destroy();
            };

            $scope.outcomeAdd = function () {
              var newOutcome = QuizOutcome.$create({quiz: $scope.articleId});
              $scope.outcomes.push(newOutcome);
            };
          }
        ],
        restrict: 'E',
        templateUrl: 'bulbs/quiz-edit/quiz-edit-outcomes/quiz-edit-outcomes.html',
        scope: {
          articleId: '=',
          outcomes: '=',
          quizStyle: '@'
        }
      };
    });
