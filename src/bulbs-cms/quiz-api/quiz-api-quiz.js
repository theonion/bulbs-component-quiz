'use strict';

angular.module('bulbs.quiz.api.quiz', [
  'bulbs.quiz.api.outcome',
  'bulbs.quiz.api.question',
  'restmod'
])
  .factory('Quiz', [
    'restmod',
    function (restmod) {

      return restmod.model('content').mix('NestedDirtyModel', {
        $config: {
          name: 'Quiz',
          plural: 'Quizzes',
          primaryKey: 'id'
        },
        outcomes: {
          belongsToMany: 'QuizOutcome',
          keys: 'outcome_set'
        },
        questions: {
          belongsToMany: 'QuizQuestion',
          keys: 'question_set'
        }
      });
    }]
  );
