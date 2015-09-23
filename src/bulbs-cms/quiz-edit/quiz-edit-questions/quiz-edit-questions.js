'use strict';

angular.module('bulbs.quiz.edit.questions', [
  'bulbs.quiz.edit.questions.question'
])
    .directive('quizEditQuestions', function () {
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
