'use strict';

angular.module('bulbs.quiz.api.question', [
  'bulbs.quiz.api.answer',
  'restmod'
])
  .factory('QuizQuestion', [
    'restmod',
    function (restmod) {

      return restmod.model('question').mix('NestedDirtyModel', {
        $config: {
          name: 'QuizQuestion',
          plural: 'QuizQuestions',
          primaryKey: 'id'
        },
        answers: {
          belongsToMany: 'QuizAnswer',
          keys: 'answer_set'
        }
      });
    }]
  );
