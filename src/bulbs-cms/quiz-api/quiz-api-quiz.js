'use strict';

angular.module('bulbs.quiz.api.quiz', [
  'bulbs.quiz.api.outcome',
  'bulbs.quiz.api.question',
  'restmod'
])
  .factory('Quiz', [
    'restmod',
    function (restmod) {

      return restmod.model('quiz').mix('NestedDirtyModel', {
        $config: {
          name: 'Quiz',
          plural: 'Quizzes',
          primaryKey: 'id'
        },
        outcomes: {
          hasMany: 'QuizOutcome',
          map: 'outcome_set',
          path: 'outcome'
        },
        questions: {
          hasMany: 'QuizQuestion',
          map: 'question_set',
          path: 'question'
        }
      });
    }]
  );
