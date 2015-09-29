'use strict';

angular.module('bulbs.quiz.edit.questions', [
  'bulbs.quiz.api.question',
  'bulbs.quiz.edit.questions.question',
  // HACK : import utils from another 3rd party package, not bulbs-cms
  'utils'
])
    .directive('quizEditQuestions', function () {
      return {
        controller: [
          '$scope', 'QuizQuestion', 'Utils',
          function ($scope, QuizQuestion, Utils) {

            $scope.questionMove = function (index, indexTo) {
              Utils.moveTo($scope.questions, index, indexTo);
            };

            $scope.questionDelete = function (question, index) {
              question.$destroy();
            };

            $scope.questionAdd = function () {
              var newQuestion = QuizQuestion.$create({quiz: $scope.articleId});
              $scope.questions.push(newQuestion);
            };
          }
        ],
        restrict: 'E',
        templateUrl: 'bulbs/quiz-edit/quiz-edit-questions/quiz-edit-questions.html',
        scope: {
          articleId: '=',
          questions: '=',
          outcomes: '=',
          quizStyle: '@'
        }
      };
    });
