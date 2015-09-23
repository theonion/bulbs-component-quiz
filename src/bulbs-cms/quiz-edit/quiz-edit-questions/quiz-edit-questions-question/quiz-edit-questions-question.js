'use strict';

angular.module('bulbs.quiz.edit.questions.question', [
  'bulbs.quiz.questions.question.answer',
  'bulbs.quiz.questions.question.answer.filters.title'
])
    .directive('quizEditQuestionsQuestion', function () {
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
