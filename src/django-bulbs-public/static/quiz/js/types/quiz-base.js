/**
 * Base prototype for any quiz type.
 */

var $ = require('jquery');
var utils = require('../quiz-utils');

var Quiz = function (element, options) {
    this.settings = $.extend({
      outcomeRevealDuration: 500,
      outcomeScrollToOffsetTop: -20,
      sendAnalytics: false
    }, options);

    this.$element = $(element);
    this.$questions = this.getQuestions();
};

/**
 * Get all questions contained inside quiz element.
 *
 * @returns {jquery} collection of all questions.
 */
Quiz.prototype.getQuestions = function () {
  return this.$element.find('.question');
};

/**
 * Do any processing required for questions to function properly.
 */
Quiz.prototype.setupQuestions = function () {};

/**
 * Setup quiz submit.
 */
Quiz.prototype.setupSubmit = function () {
  var self = this;
  this.$element.find('form').on('submit', function (e) {
    e.preventDefault();

    self.$element.find('.check-outcome').hide();
    self.checkOutcome();
  });
};

/**
 * Setup quiz for use.
 */
Quiz.prototype.setup = function () {
  this.$element.find('.check-outcome').css('visibility', 'visible');

  this.setupQuestions();
  this.setupSubmit();
};

/**
 * Check if user has completed this quiz.
 *
 * @returns {boolean} true if quiz is finished, false otherwise.
 */
Quiz.prototype.isQuizFinished = function () { return true; }

/**
 * Calculate user's score. Result of this function will be passed into the
 *  pickOutcome function for outcome choosing.
 *
 * @returns {*} any score result needed for picking an outcome.
 */
Quiz.prototype.calculateScore = function () { return 0; };

/**
 * Choose an outcome given a score.
 *
 * @param {*} score - result of calculateScore function.
 * @returns {jquery} outcome element to display to user.
 */
Quiz.prototype.pickOutcome = function (score) {};

/**
 * Logic to finish up quiz.
 *
 * @param {jquery} $bestOutcome - outcome given by pickOutcome function.
 */
Quiz.prototype.completeQuiz = function ($bestOutcome) {
  if ($bestOutcome) {
    // disable all inputs now that we have an outcome
    this.$element.find('input').prop('disabled', true);

    this.$element.find('.outcomes').show();

    var self = this;
    $bestOutcome.show(this.settings.outcomeRevealDuration, function () {
      window.picturefill($bestOutcome);

      self.$element.addClass('completed');
    });

    $window.scrollTo($bestOutcome, {
      duration: this.settings.outcomeRevealDuration,
      offset: {
        top: this.settings.outcomeScrollToOffsetTop
      }
    });

    if (this.settings.sendAnalytics) {
      utils.sendResultAnalytics($bestOutcome);
    }
  }
};

/**
 * Check if quiz is finished.
 */
Quiz.prototype.checkOutcome = function () {

  if (!this.isQuizFinished()) {
    return false;
  }

  var score = this.calculateScore();
  var $bestOutcome = this.pickOutcome(score);

  this.completeQuiz($bestOutcome);
};