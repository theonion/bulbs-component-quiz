'use strict';

angular.module('cms.editPages.quizOutcome', [
  'cms.editPages.quizOutcomes'
])
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
