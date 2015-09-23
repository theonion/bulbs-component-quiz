'use strict';

angular.module('cms.editPages.quizAnswer', [])
    .directive('quizAnswer', function () {
      return {
        replace: true,
        restrict: 'E',
        templateUrl: 'components/edit-pages/quiz/quiz-answer.html',
        controller: 'QuizEditCtrl',
        scope: {
          'article': '=',
          'imageGroup': '='
        }
      };
    });
