'use strict';

angular.module('bulbs.quiz.edit.outcomes.outcome', [])
    .directive('quizOutcome', function () {
      return {
        replace: true,
        restrict: 'E',
        templateUrl: 'components/edit-pages/quiz/quiz-outcome.html',
        controller: 'QuizEditCtrl',
        scope: {
          'article': '=',
          'imageGroup': '='
        }
      };
    });
