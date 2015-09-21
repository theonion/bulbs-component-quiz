'use strict';

angular.module('cms.editPages.quizQuestion', [
  'cms.editPages.quizQuestions'
])
    .directive('quizQuestion', function () {
      return {
        replace: true,
        restrict: 'E',
        templateUrl: 'components/edit-pages/quiz/quiz-question.html',
        controller: 'QuizEditCtrl',
        scope: {
          'article': '=',
          'imageGroup': '='
        }
      };
    });
