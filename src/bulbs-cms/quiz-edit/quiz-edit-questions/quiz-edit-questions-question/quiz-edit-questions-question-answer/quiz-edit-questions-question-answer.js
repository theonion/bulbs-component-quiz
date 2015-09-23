'use strict';

angular.module('bulbs.quiz.questions.question.answer', [])
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
