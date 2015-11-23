'use strict';

angular.module('bulbs.quiz.edit.questions.question', [
  'bulbs.quiz.questions.question.answer',
  'confirmationModal.factory',
  'restangular',
  'utils'
  // HACK : this is using onion-editor without having a dependency on it, onionEditor directive
  //    needs to be separated from bulbs-cms then required here
])
  .directive('quizEditQuestionsQuestion', function () {
    return {
      controller: [
        '$scope', 'ConfirmationModal', 'Restangular', 'Utils',
        function ($scope, ConfirmationModal, Restangular, Utils) {

          var restangularize = function (data) {
            return Restangular.restangularizeElement(null, data, 'answer');
          };

          $scope.answerMove = function (index, indexTo) {
            var resp = Utils.moveTo($scope.question.answer_set, index, indexTo);
          };

          $scope.answerDelete = function (answer, index) {
            var modalScope = $scope.$new();
            modalScope.modalOnOk = function () {
              restangularize(answer).remove()
                .then(function () {
                  Utils.removeFrom($scope.question.answer_set, index);
                })
                .catch(function () {
                  // TODO : hook in with an alert service to display error
                  console.error('Failed to remove question');
                });
            };
            modalScope.modalTitle = 'Delete Answer';
            modalScope.modalBody = 'Deleting this answer cannot be undone, are you sure you want to delete?';
            modalScope.modalOkText = 'Delete';
            modalScope.modalCancelText = 'Cancel';
            new ConfirmationModal(modalScope);
          };

          $scope.answerAdd = function () {
            var newAnswer = restangularize({
              question: $scope.question.id,
              is_correct: false,
              points: 1
            });

            newAnswer.post()
              .then(function (data) {
                newAnswer.id = data.id;
                $scope.question.answer_set.push(newAnswer);
              })
              .catch(function () {
                // TODO : hook in with an alert service to display error
                console.error('Failed to add answer');
              });
          };
        }
      ],
      restrict: 'E',
      templateUrl: 'bulbs/quiz-edit/quiz-edit-questions/quiz-edit-questions-question/quiz-edit-questions-question.html',
      scope: {
        outcomes: '=',
        question: '=',
        quizId: '=',
        quizStyle: '@'
      }
    };
  });
