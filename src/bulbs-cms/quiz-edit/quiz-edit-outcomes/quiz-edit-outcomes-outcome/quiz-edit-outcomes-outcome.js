'use strict';

angular.module('bulbs.quiz.edit.outcomes.outcome', [
  // HACK : import editable from another 3rd party package, not bulbs-cms
  'bettyEditable',
  'uuid4'
])
  .directive('quizEditOutcomesOutcome', function () {
    return {
      controller: [
        '$scope', 'uuid4',
        function ($scope, uuid4) {
          $scope.uuid = uuid4.generate();
        }
      ],
      restrict: 'E',
      templateUrl: 'bulbs/quiz-edit/quiz-edit-outcomes/quiz-edit-outcomes-outcome/quiz-edit-outcomes-outcome.html',
      scope: {
        outcome: '=',
        quizStyle: '@'
      }
    };
  });
