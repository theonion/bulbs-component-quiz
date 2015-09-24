'use strict';

angular.module('bulbs.quiz.api.answer', [
  'restmod'
])
  .factory('QuizAnswer', [
    'restmod',
    function (restmod) {

      return restmod.model('answer').mix('NestedDirtyModel', {
        $config: {
          name: 'QuizAnswer',
          plural: 'QuizAnswers',
          primaryKey: 'id'
        },
        question: {
          init: null
        },
        body: {
          init: ''
        },
        outcome: {
          init: null
        },
        isCorrect: {
          init: false
        },
        explanation: {
          init: ''
        },
        points: {
          init: 1
        }
      });
    }]
  );
