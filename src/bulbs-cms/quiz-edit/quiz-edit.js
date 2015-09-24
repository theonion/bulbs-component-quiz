'use strict';

angular.module('bulbs.quiz.edit', [
  'bulbs.quiz.api.quiz',
  'bulbs.quiz.edit.outcomes',
  'bulbs.quiz.edit.questions'
])
  .directive('quizEdit', [
    function () {
      return {
        restrict: 'E',
        templateUrl: 'bulbs/quiz-edit/quiz-edit.html',
        scope: {
          articleId: '='
        },
        controller: [
          '$scope', 'Quiz',
          function ($scope, Quiz) {
            // HACK : get article as restmod object, change when $scope.article is
            //  available as a restmod object
            $scope.quiz = Quiz.$find($scope.articleId);
          }
        ]
      };
    }
  ]);
