'use strict';

angular.module('bulbs.quiz.edit', [])
.directive('quizEdit', [
  function() {
    return {
      restrict: 'E',
      templateUrl: '/cms/partials/quiz/quiz-edit.html',
      scope: {
        article: '=',
        saveArticleDeferred: '='
      },
      controller: [
        '_', '$', '$scope', '$window', '$timeout',
        function(_, $, $scope, $window, $timeout) {
          $scope.onAddAnswer = function (question) {
            var answer = QuizApi.restangularizeElement(null, {
              question: question.id,
              body: '',
              outcome: null,
              is_correct: false,
              explanation: '',
              points: 1
            }, 'answer');
            answer.post().then(function (answer) {
              var answerSet = question.answer_set;
              answerSet.push(answer);
            });
          };
          $scope.onDeleteAnswer = function (question, answer) {
            answer_ra = QuizApi.restangularizeElement(null, answer, 'answer');
            answer_ra.remove().then(function () {
              var answerSet = question.answer_set;
              var idx = answerSet.indexOf(answer);
              if (idx >= 0) {
                answerSet.splice(idx, 1);
              }
            });
          };
          $scope.onAddOutcome = function () {
            var outcome = QuizApi.restangularizeElement(null, {
              title: '',
              quiz: $scope.article.id,
              body: '',
              shareable: false,
              min_score: 0,
              require_perfect: false
            }, 'outcome');
            outcome.post().then(function (outcome) {
              var outcomeSet = $scope.article.outcome_set;
              outcomeSet.push(outcome);
            });
          };
          $scope.onDeleteOutcome = function (outcome) {
            outcome_ra = QuizApi.restangularizeElement(null, outcome, 'outcome');
            outcome_ra.remove().then(function () {
              var outcomeSet = $scope.article.outcome_set;
              var idx = outcomeSet.indexOf(outcome);
              if (idx >= 0) {
                outcomeSet.splice(idx, 1);
              }
            });
          };
          $scope.onAddQuestion = function () {
            var question = QuizApi.restangularizeElement(null, {
              quiz: $scope.article.id,
              body: '',
              post_answer_body: '',
              answer_set: [],
              outcome: null
            }, 'question');
            question.post().then(function (question) {
              var questionSet = $scope.article.question_set;
              questionSet.push(question);
            });
          };
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
          $scope.onMoveListObject = function (objList, startIndex, newIndex) {
            if (startIndex >= 0 && newIndex >= 0 && newIndex < objList.length) {
              var obj = objList[startIndex];
              objList.splice(startIndex, 1);
              objList.splice(newIndex, 0, obj);
              for (var i = 0; i < objList.length; i++) {
                var thisObj = objList[i];
                thisObj._order = i;
              }
            }
          };
          // This should probably be a filter
          $scope.formatAnswerTitle = function (answer) {
            return answer.body || 'Answer #' + (answer._order + 1);
          };
        });
      ]
    };
  }
]);
