/**
 * Creates cachable templates js file for quick template access.
 */
'use strict';

module.exports = {
  options: {
    url: function (url) {
      return 'bulbs/' + url;
    },
    htmlmin: {
      collapseBooleanAttributes:      true,
      collapseWhitespace:             true,
      removeAttributeQuotes:          true,
      removeComments:                 true,
      removeEmptyAttributes:          true,
      removeRedundantAttributes:      true,
      removeScriptTypeAttributes:     true,
      removeStyleLinkTypeAttributes:  true
    },
    module: 'bulbs.quiz.templates',
    standalone: true
  },
  bulbs_cms_dist_html_to_pre_1: {
    cwd: 'src/bulbs-cms',
    src: '**/*.html',
    dest: '.tmp/bulbs-cms-dist-pre-1/scripts/templates.js'
  },
};
