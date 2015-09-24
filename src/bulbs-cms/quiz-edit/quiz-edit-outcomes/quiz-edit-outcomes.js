'use strict';

angular.module('bulbs.quiz.edit.outcomes', [
  'bulbs.quiz.edit.outcomes.outcome',
  // HACK : import utils from another 3rd party package, not bulbs-cms
  'utils'
])
    .directive('quizEditOutcomes', function () {
      return {
        controller: [
          '$scope', 'Utils',
          function ($scope, Utils) {

            $scope.outcomeMove = function (index, indexTo) {
              Utils.moveTo(outcomes, index, indexTo);
            };

            $scope.outcomeDelete = function (outcome, index) {
              QuizApi
                .restangularizeElement(null, outcome, 'outcome')
                .remove()
                .then(function () {
                  Utils.removeFrom(outcomes.outcome_set, index);
                });
            };

            $scope.outcomeAdd = function () {
              var outcomeData = {
                title: '',
                quiz: articleId,
                body: '',
                shareable: false,
                min_score: 0,
                require_perfect: false
              };

              QuizApi
                .restangularizeElement(null, outcomeData, 'outcome')
                .post()
                .then(function (outcome) {
                  outcomes.push(outcome);
                });
            };
          }
        ],
        restrict: 'E',
        templateUrl: 'bulbs/quiz-edit/quiz-edit-outcomes/quiz-edit-outcomes-outcome.html',
        scope: {
          articleId: '=',
          outcomes: '=',
          quizStyle: '@'
        }
      };
    });
