/**
 * Compile sass files.
 */
'use strict';

module.exports = {
  bulbs_cms_dist_styles_to_tmp_dist: {
    options: {
      sourcemap: 'none'
    },
    files: {
      '.tmp/bulbs-cms-dist/quiz.css': 'src/bulbs-cms/quiz.scss'
    }
  }
};
