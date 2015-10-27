'use strict';

angular.module('bulbs.quiz.edit.outcomes', [
  'bulbs.quiz.edit.outcomes.outcome',
  'confirmationModal.factory',
  'restangular',
  'utils'
])
    .directive('quizEditOutcomes', function () {
      return {
        controller: [
          '$scope', 'ConfirmationModal', 'Restangular', 'Utils',
          function ($scope, ConfirmationModal, Restangular, Utils) {

            var restangularize = function (data) {
              return Restangular.restangularizeElement(null, data, 'outcome');
            };

            $scope.outcomeMove = function (index, indexTo) {
              Utils.moveTo($scope.outcomes, index, indexTo);
            };

            $scope.outcomeDelete = function (outcome, index) {
              var modalScope = $scope.$new();
              modalScope.modalOnOk = function () {
                restangularize(outcome).remove()
                  .then(function () {
                    Utils.removeFrom($scope.outcomes, index);
                  })
                  .catch(function () {
                    // TODO : hook in with an alert service to display error
                    console.error('Failed to remove question');
                  });
              };
              modalScope.modalTitle = 'Delete Outcome';
              modalScope.modalBody = 'Deleting this outcome cannot be undone, are you sure you want to delete?';
              modalScope.modalOkText = 'Delete';
              modalScope.modalCancelText = 'Cancel';
              new ConfirmationModal(modalScope);
            };

            $scope.outcomeAdd = function () {
              var newOutcome = restangularize({
                quiz: $scope.quizId,
                shareable: true,
                min_score: 0,
                require_perfect: false
              });

              newOutcome.post()
                .then(function (data) {
                  newOutcome.id = data.id;
                  $scope.outcomes.push(newOutcome);
                })
                .catch(function () {
                  // TODO : hook in with an alert service to display error
                  console.error('Failed to add outcome');
                });
            };
          }
        ],
        restrict: 'E',
        templateUrl: 'bulbs/quiz-edit/quiz-edit-outcomes/quiz-edit-outcomes.html',
        scope: {
          outcomes: '=',
          quizId: '=',
          quizStyle: '@'
        }
      };
    });
