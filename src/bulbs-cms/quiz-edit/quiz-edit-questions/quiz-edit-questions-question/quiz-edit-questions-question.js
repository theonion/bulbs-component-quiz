'use strict';

angular.module('bulbs.quiz.edit.questions.question', [
  'bulbs.quiz.questions.question.answer',
  'bulbs.quiz.questions.question.answer.filters.title',
  // HACK : import utils from another 3rd party package, not bulbs-cms
  'utils'
  // HACK : this is using onion-editor without having a dependency on it, onionEditor directive
  //    needs to be separated from bulbs-cms then required here
])
    .directive('quizEditQuestionsQuestion', function () {
      return {
        controller: [
          '$scope', 'Utils',
          function ($scope, Utils) {

            $scope.answerMove = function (index, indexTo) {
              Utils.moveTo($scope.question.answer_set, index, indexTo);
            };

            $scope.answerDelete = function (answer, index) {
              QuizApi
                .restangularizeElement(null, answer, 'answer');
                .remove().then(function () {
                  Utils.removeFrom($scope.question.answer_set, index);
                });
            };

            $scope.answerAdd = function (answer) {
              var answerData = {
                question: question.id,
                body: '',
                outcome: null,
                is_correct: false,
                explanation: '',
                points: 1
              };

              QuizApi
                .restangularizeElement(null, answerData, 'answer')
                .post()
                .then(function (answer) {
                  $scope.question.answer_set.push(answer);
                });
            };
          }
        ],
        restrict: 'E',
        templateUrl: 'bulbs/quiz-edit/quiz-edit-questions/quiz-edit-questions-question/quiz-edit-questions-question.html',
        scope: {
          outcomes: '=',
          question: '=',
          quizStyle: '@'
        }
      };
    });
