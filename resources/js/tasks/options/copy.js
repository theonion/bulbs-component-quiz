/**
 * Copy files into necessary locations.
 */
'use strict';

module.exports = {
  bulbs_cms_dist_scripts_to_pre_1: {
    src: 'src/bulbs-cms/**/*.js',
    dest: '.tmp/bulbs-cms-dist-pre-1/scripts',
    expand: true,
    flatten: true
  },
  bulbs_cms_dist_tmp_to_dist: {
    src: '.tmp/bulbs-cms-dist/*',
    dest: 'compat-builds/bulbs-cms-dist',
    expand: true,
    flatten: true
  },
  bulbs_cms_dist_to_django_bulbs_cms: {
    src: 'compat-builds/bulbs-cms-dist/*',
    dest: 'compat-builds/django-bulbs-cms/static/cms/quiz/',
    expand: true,
    flatten: true
  }
};
