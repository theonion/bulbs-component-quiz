'use strict';

angular.module('bulbs.quiz.edit.outcomes.outcome', [
  // HACK : import editable from another 3rd party package, not bulbs-cms
  'bettyEditable',
  'uuid4'
])
  .directive('quizEditOutcomesOutcome', [
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
        templateUrl: 'bulbs/quiz-edit/quiz-edit-outcomes/quiz-edit-outcomes-outcome/quiz-edit-outcomes-outcome.html',
        scope: {
          outcome: '=',
          quizStyle: '@'
        }
      };
    }]
  );
