"use strict";angular.module("bulbs.quiz.edit.outcomes.outcome",["bettyEditable","uuid4"]).directive("quizEditOutcomesOutcome",["uuid4",function(a){return{controller:["$scope",function(b){b.uuid=a.generate()}],restrict:"E",templateUrl:"bulbs/quiz-edit/quiz-edit-outcomes/quiz-edit-outcomes-outcome/quiz-edit-outcomes-outcome.html",scope:{outcome:"=",quizStyle:"@"}}}]),angular.module("bulbs.quiz.edit.outcomes",["bulbs.quiz.edit.outcomes.outcome","confirmationModal.factory","restangular","utils"]).directive("quizEditOutcomes",function(){return{controller:["$scope","ConfirmationModal","Restangular","Utils",function(a,b,c,d){var e=function(a){return c.restangularizeElement(null,a,"outcome")};a.outcomeMove=function(b,c){d.moveTo(a.outcomes,b,c)},a.outcomeDelete=function(c,f){var g=a.$new();g.modalOnOk=function(){e(c).remove().then(function(){d.removeFrom(a.outcomes,f)})["catch"](function(){console.error("Failed to remove question")})},g.modalTitle="Delete Outcome",g.modalBody="Deleting this outcome cannot be undone, are you sure you want to delete?",g.modalOkText="Delete",g.modalCancelText="Cancel",new b(g)},a.outcomeAdd=function(){var b=e({quiz:a.quizId,shareable:!0,min_score:0,require_perfect:!1});b.post().then(function(c){b.id=c.id,a.outcomes.push(b)})["catch"](function(){console.error("Failed to add outcome")})}}],restrict:"E",templateUrl:"bulbs/quiz-edit/quiz-edit-outcomes/quiz-edit-outcomes.html",scope:{outcomes:"=",quizId:"=",quizStyle:"@"}}}),angular.module("bulbs.quiz.questions.question.answer",["uuid4"]).directive("quizEditQuestionsQuestionAnswer",["uuid4",function(a){return{controller:["$scope",function(b){b.uuid=a.generate()}],restrict:"E",templateUrl:"bulbs/quiz-edit/quiz-edit-questions/quiz-edit-questions-question/quiz-edit-questions-question-answer/quiz-edit-questions-question-answer.html",scope:{answer:"=",quizStyle:"@",outcomes:"="}}}]),angular.module("bulbs.quiz.edit.questions.question",["bulbs.quiz.questions.question.answer","confirmationModal.factory","restangular","utils"]).directive("quizEditQuestionsQuestion",function(){return{controller:["$scope","ConfirmationModal","Restangular","Utils",function(a,b,c,d){var e=function(a){return c.restangularizeElement(null,a,"answer")};a.answerMove=function(b,c){d.moveTo(a.question.answer_set,b,c)},a.answerDelete=function(c,f){var g=a.$new();g.modalOnOk=function(){e(c).remove().then(function(){d.removeFrom(a.question.answer_set,f)})["catch"](function(){console.error("Failed to remove question")})},g.modalTitle="Delete Answer",g.modalBody="Deleting this answer cannot be undone, are you sure you want to delete?",g.modalOkText="Delete",g.modalCancelText="Cancel",new b(g)},a.answerAdd=function(){var b=e({question:a.question.id,is_correct:!1,points:1});b.post().then(function(c){b.id=c.id,a.question.answer_set.push(b)})["catch"](function(){console.error("Failed to add answer")})}}],restrict:"E",templateUrl:"bulbs/quiz-edit/quiz-edit-questions/quiz-edit-questions-question/quiz-edit-questions-question.html",scope:{outcomes:"=",question:"=",quizId:"=",quizStyle:"@"}}}),angular.module("bulbs.quiz.edit.questions",["bulbs.quiz.edit.questions.question","confirmationModal.factory","restangular","utils"]).directive("quizEditQuestions",function(){return{controller:["$scope","ConfirmationModal","Restangular","Utils",function(a,b,c,d){var e=function(a){return c.restangularizeElement(null,a,"question")};a.questionMove=function(b,c){d.moveTo(a.questions,b,c)},a.questionDelete=function(c,f){var g=a.$new();g.modalOnOk=function(){e(c).remove().then(function(){d.removeFrom(a.questions,f)})["catch"](function(){console.error("Failed to remove question")})},g.modalTitle="Delete Question",g.modalBody="Deleting this question cannot be undone, are you sure you want to delete?",g.modalOkText="Delete",g.modalCancelText="Cancel",new b(g)},a.questionAdd=function(){var b=e({answer_set:[],quiz:a.quizId});b.post().then(function(c){b.id=c.id,a.questions.push(b)})["catch"](function(){console.error("Failed to add question")})}}],restrict:"E",templateUrl:"bulbs/quiz-edit/quiz-edit-questions/quiz-edit-questions.html",scope:{questions:"=",outcomes:"=",quizId:"=",quizStyle:"@"}}}),angular.module("bulbs.quiz.edit",["bulbs.quiz.edit.outcomes","bulbs.quiz.edit.questions"]).directive("quizEdit",[function(){return{restrict:"E",templateUrl:"bulbs/quiz-edit/quiz-edit.html",scope:{article:"="}}}]),angular.module("bulbs.quiz",["bulbs.quiz.edit","bulbs.quiz.templates"]),angular.module("bulbs.quiz.templates",[]).run(["$templateCache",function(a){a.put("bulbs/quiz-edit/quiz-edit-outcomes/quiz-edit-outcomes-outcome/quiz-edit-outcomes-outcome.html",'<div class=col-sm-7><div class=form-group><label for="quizEditOutcomesOutcomeHeadline{{ uuid }}">Result Headline</label><input id="quizEditOutcomesOutcomeHeadline{{ uuid }}" class=form-control ng-model=outcome.title placeholder="Title of result"></div><div class=form-group><label for="quizEditOutcomesOutcomeDescription{{ uuid }}">Result Description</label><textarea id="quizEditOutcomesOutcomeDescription{{ uuid }}" class=form-control rows=3 ng-model=outcome.body placeholder="Description of result">\n    </textarea></div><div class=form-group ng-show="quizStyle === \'tally\' || quizStyle === \'test\' || quizStyle === \'cosmo\'"><label for="quizEditOutcomesOutcomeScore{{ uuid }}">This result requires a minimum score of</label><input id="quizEditOutcomesOutcomeScore{{ uuid }}" class=form-control type=number ng-model=outcome.min_score placeholder=0 size=5></div><div class=form-group><label for="quizEditOutcomesOutcomeShareable{{ uuid }}">This result is shareable</label><input id="quizEditOutcomesOutcomeShareable{{ uuid }}" type=checkbox ng-model=outcome.shareable></div><div class=quiz-edit-outcomes-outcome-perfect ng-show="quizStyle === \'multiple\'"><label>Perfect score required</label><input type=checkbox ng-model=outcome.require_perfect></div></div><div class=col-sm-5><label>Add Image</label><betty-editable image=outcome.detail_image ratio=1x1 add-styles="fa fa-camera-retro add-image-box quiz-image-box"></betty-editable></div>'),a.put("bulbs/quiz-edit/quiz-edit-outcomes/quiz-edit-outcomes.html",'<h4>Possible Results</h4><ul class=quiz-panel-list><li class="panel panel-default quiz-panel" ng-repeat="outcome in outcomes"><div class=panel-heading data-toggle=collapse data-target="#outcome{{ $index }}"><div class=quiz-panel-heading><span>Result {{ $index + 1 }}</span> <span ng-if=outcome.title>:</span> <span ng-bind-html="outcome.title | truncateByWords:7"></span></div><div class=quiz-panel-toolbar><div class=btn-group><button class="btn btn-xs btn-info" ng-click="outcomeMove($index, $index - 1); $event.stopPropagation();" ng-disabled=$first><span class="fa fa-chevron-up"></span></button> <button class="btn btn-xs btn-info" ng-click="outcomeMove($index, $index + 1); $event.stopPropagation();" ng-disabled=$last><span class="fa fa-chevron-down"></span></button></div><div class=btn-group><button class="btn btn-xs btn-danger" title="Delete outcome" ng-click="outcomeDelete(outcome, $index); $event.stopPropagation();"><span class="fa fa-trash-o"></span></button></div></div></div><quiz-edit-outcomes-outcome id="outcome{{ $index }}" class="panel-body collapse in" outcome=outcome quiz-style="{{ quizStyle }}"></quiz-edit-outcomes-outcome></li></ul><div><button class="btn btn-primary" ng-click=outcomeAdd()><span class="fa fa-plus"></span> <span>Add A Result</span></button></div>'),a.put("bulbs/quiz-edit/quiz-edit-questions/quiz-edit-questions-question/quiz-edit-questions-question-answer/quiz-edit-questions-question-answer.html",'<div class=col-sm-7><div class=form-group><label>Text</label><onion-editor ng-model=answer.body role=singleline placeholder=Answer formatting=bold,italic,strike></onion-editor></div><div class="form-group form-inline" ng-show="quizStyle === \'tally\' || quizStyle === \'cosmo\'"><label for="answerPoints{{ uuid }}">Points</label><input id="answerPoints{{ uuid }}" class=form-control type=number ng-model=answer.points placeholder=1 size=3></div><div class=form-group ng-show="quizStyle === \'multiple\'"><label for="answerOutcome{{ uuid }}">Connect the answer with this result</label><select id="answerOutcome{{ uuid }}" class=form-control ng-model=answer.outcome ng-options="outcome.id as outcome.title for outcome in outcomes"></select></div><div class=form-group ng-show="quizStyle === \'test\'"><label for="answerCorrect{{ uuid }}">Correct?</label><input id="answerCorrect{{ uuid }}" type=checkbox ng-model=answer.is_correct></div><div class=form-group ng-show="quizStyle === \'test\'"><label>Answer Explanation</label><onion-editor ng-model=answer.explanation role=multiline placeholder="Answer Explanation"></onion-editor></div></div><div class=col-sm-5><label>Add Image</label><betty-editable image=answer.detail_image ratio=1x1 add-styles="fa fa-camera-retro add-image-box quiz-image-box"></betty-editable></div>'),a.put("bulbs/quiz-edit/quiz-edit-questions/quiz-edit-questions-question/quiz-edit-questions-question.html",'<div><div><label>Question</label><onion-editor ng-model=question.body role=multiline placeholder="Question Body"></onion-editor></div><div ng-show="[\'multiple\', \'cosmo\', \'test\'].indexOf(quizStyle) > -1"><label>Optional post-answer content</label><onion-editor ng-model=question.post_answer_body role=multiline placeholder="Post Answer Body"></onion-editor></div></div><ul class=quiz-panel-list><li class="panel panel-default quiz-panel" ng-repeat="answer in question.answer_set"><div class=panel-heading data-toggle=collapse data-target="#answer{{ $index }}"><div class=quiz-panel-heading><span>Answer {{ $index + 1 }}</span> <span ng-if=answer.body>:</span> <span ng-bind-html="answer.body | truncateByWords:7"></span></div><div class=quiz-panel-toolbar><div class=btn-group><button class="btn btn-xs btn-info" ng-click="answerMove($index, $index - 1); $event.stopPropagation();" ng-disabled=$first><span class="fa fa-chevron-up"></span></button> <button class="btn btn-xs btn-info" ng-click="answerMove($index, $index + 1); $event.stopPropagation();" ng-disabled=$last><span class="fa fa-chevron-down"></span></button></div><div class=btn-group><button class="btn btn-xs btn-danger" title="Delete answer" ng-click="answerDelete(answer, $index); $event.stopPropagation();"><span class="fa fa-trash-o"></span></button></div></div></div><quiz-edit-questions-question-answer id="answer{{ $index }}" class="panel-body collapse in" answer=answer outcomes=outcomes quiz-style="{{ quizStyle }}"></quiz-edit-questions-question-answer></li></ul><div><button class="btn btn-primary" ng-click=answerAdd()><span class="fa fa-plus"></span> <span>Add An Answer</span></button></div>'),a.put("bulbs/quiz-edit/quiz-edit-questions/quiz-edit-questions.html",'<h4>Questions</h4><ul class=quiz-panel-list><li class="panel panel-default quiz-panel" ng-repeat="question in questions"><div class=panel-heading data-toggle=collapse data-target="#question{{ $index }}"><div class=quiz-panel-heading><span>Question {{ $index + 1 }}</span></div><div class=quiz-panel-toolbar><div class=btn-group><button class="btn btn-xs btn-info" ng-click="questionMove($index, $index - 1); $event.stopPropagation();" ng-disabled=$first><span class="fa fa-chevron-up"></span></button> <button class="btn btn-xs btn-info" ng-click="questionMove($index, $index + 1); $event.stopPropagation();" ng-disabled=$last><span class="fa fa-chevron-down"></span></button></div><div class=btn-group><button class="btn btn-xs btn-danger" title="Delete question" ng-click="questionDelete(question, $index); $event.stopPropagation();"><span class="fa fa-trash-o"></span></button></div></div></div><quiz-edit-questions-question id="question{{ $index }}" class="panel-body collapse in" outcomes=outcomes question=question quiz-style="{{ quizStyle }}"></quiz-edit-questions-question></li></ul><div><button class="btn btn-primary" ng-click=questionAdd()><span class="fa fa-plus"></span> <span>Add A Question</span></button></div>'),a.put("bulbs/quiz-edit/quiz-edit.html",'<section class="well row"><div class=quiz-options-header><h4>Quiz Options</h4><span class=quiz-helper-text><span>Quiz Type:</span> <span ng-if="article.quiz_style === \'tally\'">One Question (tally)</span> <span ng-if="article.quiz_style === \'test\'">Scored Test (test)</span> <span ng-if="article.quiz_style === \'multiple\'">Open Ended (multiple)</span> <span ng-if="article.quiz_style === \'cosmo\'">COSMOde (cosmo)</span></span></div><div class=form-group ng-show="article.quiz_style === \'test\'"><label for=revealAnswers>Reveal other answers after answering</label><input id=revealAnswers type=checkbox ng-model=article.show_all_answers></div><div class=form-group><label for=resultButtonText><span>Result Button Text</span> <span class=quiz-helper-text>(Optional: Defaults to "Get Results")</span></label><input id=resultButtonText class=form-control ng-model=article.result_button_text placeholder="Get Results"></div></section><quiz-edit-outcomes class="well row" outcomes=article.outcome_set quiz-id=article.id quiz-style="{{ article.quiz_style }}"></quiz-edit-outcomes><quiz-edit-questions class="well row" questions=article.question_set outcomes=article.outcome_set quiz-id=article.id quiz-style="{{ article.quiz_style }}"></quiz-edit-questions>')}]);