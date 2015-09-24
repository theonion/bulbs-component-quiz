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
        }
      });
    }]
  );
