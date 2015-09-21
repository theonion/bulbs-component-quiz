'use strict';

angular.module('cms.editPages.quizQuestions', [])
    .directive('quizQuestions', function () {
      return {
        replace: true,
        restrict: 'E',
        templateUrl: 'components/edit-pages/quiz/quiz-questions.html',
        controller: 'QuizEditCtrl',
        scope: {
          'article': '='
        }
      };
    });
