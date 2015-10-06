'use strict';

angular.module('bulbs.quiz.edit.questions.question', [
  'bulbs.quiz.questions.question.answer',
  'restangular',
  // HACK : import utils from another 3rd party package, not bulbs-cms
  'utils'
  // HACK : this is using onion-editor without having a dependency on it, onionEditor directive
  //    needs to be separated from bulbs-cms then required here
])
  .directive('quizEditQuestionsQuestion', function () {
    return {
      controller: [
        '$scope', 'Restangular', 'Utils',
        function ($scope, Restangular, Utils) {

          var restangularize = function (data) {
            return Restangular.restangularizeElement(null, data, 'answer');
          };

          $scope.answerMove = function (index, indexTo) {
            Utils.moveTo($scope.question.answer_set, index, indexTo);
          };

          $scope.answerDelete = function (answer, index) {
            restangularize(answer).remove()
              .then(function () {
                Utils.removeFrom($scope.question.answer_set, index);
              })
              .catch(function () {
                // TODO : hook in with an alert service to display error
                console.error('Failed to remove question');
              });
          };

          $scope.answerAdd = function () {
            var newAnswer = restangularize({question: $scope.question.id});

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
