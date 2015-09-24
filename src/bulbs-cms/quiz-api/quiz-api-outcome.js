'use strict';

angular.module('bulbs.quiz.api.outcome', [
  'restmod'
])
  .factory('QuizOutcome', [
    'restmod',
    function (restmod) {

      return restmod.model('outcome').mix('NestedDirtyModel', {
        $config: {
          name: 'QuizOutcome',
          plural: 'QuizOutcomes',
          primaryKey: 'id'
        },
        title: {
          init: ''
        },
        body: {
          init: ''
        },
        sharable: {
          init: false
        },
        minScore: {
          init: 0
        },
        quiz: {
          init: null
        },
        requirePerfect: {
          init: false
        }
      });
    }]
  );
