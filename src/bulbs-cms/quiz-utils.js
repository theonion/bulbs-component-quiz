'use strict';

angular.module('bulbs.quiz.utils', [])
  .service('QuizUtils', [
    function () {

      return {
        /**
         * Ensure the _order property of objects in given list match the object's
         *  current position in the list.
         *
         * @param {array} list - objects with _order property to fix.
         */
        fixOrderingProperty: function (list) {
          list.forEach(function (obj, i) {
            if (obj.hasOwnProperty('_order')) {
              obj._order = i;
            }
          });
        }
      };
    }
  ]);
