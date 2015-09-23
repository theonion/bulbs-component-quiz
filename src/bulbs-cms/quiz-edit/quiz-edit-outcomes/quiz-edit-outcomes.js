'use strict';

angular.module('bulbs.quiz.edit.outcomes', [
  'bulbs.quiz.edit.outcomes.outcome',
  // HACK : import utils from another 3rd part package, not bulbs-cms
  'utils'
])
    .directive('quizEditOutcomes', function () {
      return {
        controller: [
          '$scope', 'Utils',
          function ($scope, Utils) {

            $scope.outcomeMove = function (outcome, index, indexTo) {
              Utils.moveTo($scope.article.outcome_set, index, indexTo);
            };

            $scope.outcomeDelete = function (outcome, index) {
              QuizApi
                .restangularizeElement(null, outcome, 'outcome')
                .remove()
                .then(function () {
                  Utils.removeFrom($scope.article.outcome_set, index);
                });
            };

            $scope.outcomeAdd = function () {
              var outcomeData = {
                title: '',
                quiz: $scope.article.id,
                body: '',
                shareable: false,
                min_score: 0,
                require_perfect: false
              };

              QuizApi
                .restangularizeElement(null, outcomeData, 'outcome')
                .post()
                .then(function (outcome) {
                  var outcomeSet = $scope.article.outcome_set;
                  outcomeSet.push(outcome);
                });
            };
          }
        ],
        restrict: 'E',
        templateUrl: 'bulbs/quiz-edit/quiz-edit-outcomes/quiz-edit-outcomes-outcome.html',
        controller: 'QuizEditCtrl',
        scope: {
          article: '='
        }
      };
    });
