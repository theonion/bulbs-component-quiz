'use strict';

angular.module('bulbs.quiz.questions.question.answer.filters.title', [])
  .filter('quizAnswerTitle', [
    '$filter',
    function ($filter) {
      return function (answer) {
        var title = answer.body || 'Answer #' + (answer._order + 1);
        return $filter('truncateByWords')(title, 7);
      };
    }
  ]);
