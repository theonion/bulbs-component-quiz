'use strict';

angular.module('bulbs.quiz.edit.outcomes', [
  'bulbs.quiz.edit.outcomes.outcome'
])
    .directive('quizEditOutcomes', function () {
      return {
        replace: true,
        restrict: 'E',
        templateUrl: 'components/edit-pages/quiz/quiz-outcomes.html',
        controller: 'QuizEditCtrl',
        scope: {
          'article': '='
        }
      };
    });
