'use strict';

angular.module('bulbs.quiz.edit.questions', [
  'bulbs.quiz.edit.questions.question',
  'restangular',
  // HACK : import utils from another 3rd party package, not bulbs-cms
  'utils'
])
    .directive('quizEditQuestions', function () {
      return {
        controller: [
          '$scope', 'Restangular', 'Utils',
          function ($scope, Restangular, Utils) {

            var restangularize = function (data) {
              return Restangular.restangularizeElement(null, data, 'question');
            };

            $scope.questionMove = function (index, indexTo) {
              Utils.moveTo($scope.questions, index, indexTo);
            };

            $scope.questionDelete = function (question, index) {
              restangularize(question).remove()
                .then(function () {
                  Utils.removeFrom($scope.questions, index);
                })
                .catch(function () {
                  // TODO : hook in with an alert service to display error
                  console.error('Failed to remove question');
                });
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
