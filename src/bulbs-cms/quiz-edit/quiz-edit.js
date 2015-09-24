'use strict';

angular.module('bulbs.quiz.edit', [
  'bulbs.quiz.edit.outcomes',
  'bulbs.quiz.edit.questions'
])
  .directive('quizEdit', [
    function () {
      return {
        restrict: 'E',
        templateUrl: 'bulbs/quiz-edit/quiz-edit.html',
        scope: {
          article: '=',
          saveArticleDeferred: '='
        },
        controller: [
          '_', '$', '$scope', '$window', '$timeout',
          function (_, $, $scope, $window, $timeout) {


            $scope.onDeleteQuestion = function (question) {
              var question_ra = QuizApi.restangularizeElement(null, question, 'question');
              question_ra.remove().then(function () {
                var questionSet = $scope.article.question_set;
                var idx = questionSet.indexOf(question);
                if (idx >= 0) {
                  questionSet.splice(idx, 1);
                }
              });
            };

          });
        ]
      };
    }
  ]);
