'use strict';

angular.module('cms.editPages.quizOutcomes', [])
    .directive('quizOutcomes', function () {
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
