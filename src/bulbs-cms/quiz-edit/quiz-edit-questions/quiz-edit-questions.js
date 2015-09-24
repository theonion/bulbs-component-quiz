'use strict';

angular.module('bulbs.quiz.edit.questions', [
  'bulbs.quiz.edit.questions.question',
  // HACK : import utils from another 3rd party package, not bulbs-cms
  'utils'
])
    .directive('quizEditQuestions', function () {
      return {
        controller: [
          '$scope', 'Utils'
          function ($scope) {

            $scope.questionMove = function (index, indexTo) {
              Utils.moveTo(questions, index, indexTo);
            };

            $scope.questionDelete = function (question, index) {
              QuizApi
                .restangularizeElement(null, question, 'question')
                .remove()
                .then(function () {
                  Utils.removeFrom(questions, index);
                });
            };

            $scope.questionAdd = function () {
              var questionData = {
                quiz: articleId,
                body: '',
                post_answer_body: '',
                answer_set: [],
                outcome: null
              };

              QuizApi
                .restangularizeElement(null, questionData, 'question');
                .post()
                .then(function (question) {
                  questions.push(question);
                });
            };
          }
        ],
        restrict: 'E',
        templateUrl: 'bulbs/quiz-edit/quiz-edit-questions/quiz-edit-questions.html',
        scope: {
          articleId: '=',
          questions: '=',
          quizStyle: '@'
        }
      };
    });
