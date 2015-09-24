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
        }
      });
    }]
  );
