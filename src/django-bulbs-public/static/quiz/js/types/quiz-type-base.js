/**
 * Base prototype for any quiz type.
 */

var $ = window.jQuery;
var Analytics = require('bulbs-public-analytics-manager/src/analytics-manager');


var Quiz = function (element, options) {
    this.settings = $.extend({
      getAnalyticsObject: function ($outcome) {
        return {
          eventCategory: 'Quiz result: ' + $outcome.find('.quiz-outcome').text(),
          eventAction: 'Quiz result',
          eventLabel: 'None'
        };
      },
      outcomeRevealDuration: 500,
      outcomeScrollToOffsetTop: -20,
      answerRevealDuration: 100,
      scrollToDuration: 250,
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
  this.$element.find('.check-outcome').show();

  this.setupQuestions();
  this.setupSubmit();
};

/**
 * Check if user has completed this quiz.
 *
 * @returns {boolean} true if quiz is finished, false otherwise.
 */
Quiz.prototype.isQuizFinished = function () { return true; };

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
 * Interface with Analytics to send an analytics event based on given outcome.
 *
 * @param {jquery} $outcome - outcome to base analytics event on.
 */
Quiz.prototype.sendResultAnalytics = function ($outcome) {
  Analytics.sendEvent(this.settings.getAnalyticsObject($outcome));
};

/**
 * Logic to finish up quiz.
 *
 * @param {jquery} $bestOutcome - outcome given by pickOutcome function.
 */
Quiz.prototype.completeQuiz = function ($bestOutcome) {
  if ($bestOutcome) {

    this.$element.find('input').prop('disabled', true);
    this.$element.find('.outcomes').show();
    this.$element.addClass('completed');

    var self = this;
    $bestOutcome.show(this.settings.outcomeRevealDuration, function () {
      window.picturefill($bestOutcome);
    });

    $.scrollTo($bestOutcome, {
      duration: this.settings.outcomeRevealDuration,
      offset: {
        top: this.settings.outcomeScrollToOffsetTop
      }
    });

    if (this.settings.sendAnalytics) {
      this.sendResultAnalytics($bestOutcome);
    }
  }
};

/**
 * Check if quiz is finished.
 *
 * @returns {boolean} true if quiz is complete, false otherwise.
 */
Quiz.prototype.checkOutcome = function () {

  if (!this.isQuizFinished()) {
    return false;
  }

  var score = this.calculateScore();
  var $bestOutcome = this.pickOutcome(score);

  this.completeQuiz($bestOutcome);

  return true;
};

module.exports = Quiz;
