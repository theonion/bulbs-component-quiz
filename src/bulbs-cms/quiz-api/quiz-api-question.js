'use strict';

angular.module('bulbs.quiz.api.question', [
  'bulbs.quiz.api.answer',
  'restmod'
])
  .factory('QuizQuestion', [
    'restmod',
    function (restmod) {

      return restmod.model().mix('NestedDirtyModel', {
        $config: {
          name: 'Question',
          plural: 'Questions',
          primaryKey: 'id'
        },
        answers: {
          hasMany: 'QuizAnswer',
          map: 'answer_set',
          path: 'answer'
        },
        body: {
          init: ''
        },
        postAnswerBody: {
          init: ''
        },
        outcome: {
          init: null
        },
        quiz: {
          init: null
        }
      });
    }]
  );
