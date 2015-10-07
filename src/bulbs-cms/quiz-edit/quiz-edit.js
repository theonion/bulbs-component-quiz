'use strict';

angular.module('bulbs.quiz.edit', [
  'bulbs.quiz.edit.outcomes',
  'bulbs.quiz.edit.questions'
])
  .directive('quizEdit', [
    function () {
      return {
        restrict: 'E',
        templateUrl: 'bulbs/quiz-edit/quiz-edit.html',
        scope: {
          article: '='
        }
      };
    }
  ]);
