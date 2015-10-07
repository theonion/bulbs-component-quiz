'use strict';

angular.module('bulbs.quiz.edit.questions', [
  'bulbs.quiz.edit.questions.question',
  'confirmationModal.factory',
  'restangular',
  'utils'
])
    .directive('quizEditQuestions', function () {
      return {
        controller: [
          '$scope', 'ConfirmationModal', 'Restangular', 'Utils',
          function ($scope, ConfirmationModal, Restangular, Utils) {

            var restangularize = function (data) {
              return Restangular.restangularizeElement(null, data, 'question');
            };

            $scope.questionMove = function (index, indexTo) {
              Utils.moveTo($scope.questions, index, indexTo);
            };

            $scope.questionDelete = function (question, index) {
              var modalScope = $scope.$new();
              modalScope.modalOnOk = function () {
                restangularize(question).remove()
                  .then(function () {
                    Utils.removeFrom($scope.questions, index);
                  })
                  .catch(function () {
                    // TODO : hook in with an alert service to display error
                    console.error('Failed to remove question');
                  });
              };
              modalScope.modalTitle = 'Delete Question';
              modalScope.modalBody = 'Deleting this question cannot be undone, are you sure you want to delete?';
              modalScope.modalOkText = 'Delete';
              modalScope.modalCancelText = 'Cancel';
              new ConfirmationModal(modalScope);
            };

            $scope.questionAdd = function () {
              var newQuestion = restangularize({
                answer_set: [],
                quiz: $scope.quizId
              });

              newQuestion.post()
                .then(function (data) {
                  newQuestion.id = data.id;
                  $scope.questions.push(newQuestion);
                })
                .catch(function () {
                  // TODO : hook in with an alert service to display error
                  console.error('Failed to add question');
                });
            };
          }
        ],
        restrict: 'E',
        templateUrl: 'bulbs/quiz-edit/quiz-edit-questions/quiz-edit-questions.html',
        scope: {
          questions: '=',
          outcomes: '=',
          quizId: '=',
          quizStyle: '@'
        }
      };
    });
