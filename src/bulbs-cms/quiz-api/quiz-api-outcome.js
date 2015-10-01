'use strict';

angular.module('bulbs.quiz.api.outcome', [
  'restmod'
])
  .factory('QuizOutcome', [
    'restmod',
    function (restmod) {

      return restmod.model().mix('NestedDirtyModel', {
        $config: {
          name: 'Outcome',
          plural: 'Outcomes',
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
