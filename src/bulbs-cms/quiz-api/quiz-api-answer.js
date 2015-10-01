'use strict';

angular.module('bulbs.quiz.api.answer', [
  'restmod'
])
  .factory('QuizAnswer', [
    'restmod',
    function (restmod) {

      return restmod.model().mix('NestedDirtyModel', {
        $config: {
          name: 'Answer',
          plural: 'Answers',
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
