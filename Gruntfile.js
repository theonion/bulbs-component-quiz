 'use strcit';

 module.exports = function (grunt) {
  require('./package.json');

  var config = grunt.util._.extend(
    require('./resources/js/tasks/config'),
    require('load-grunt-config')(grunt, {
      configPath: require('path').join(process.cwd(), 'resources/js/tasks/options'),
      init: false
    })
  );

  grunt.initConfig(config);

  grunt.loadTasks('resources/js/tasks');

  grunt.task.registerTask(
    'bulbs_cms_dist',
    'Create standalone angular module for bulbs-cms.',
    [
      // clean out old files
      'clean:tmp',
      'clean:builds_bulds_cms_dist',
      // get all scripts together
      'ngtemplates:bulbs_cms_dist_html_to_pre_1',
      'copy:bulbs_cms_dist_scripts_to_pre_1',
      // minify scripts
      'uglify:bulbs_cms_dist_scripts_pre_1_to_tmp_dist',
      // put scripts in compat-builds
      'copy:bulbs_cms_dist_tmp_to_dist',
      // cleanup
      'clean:tmp'
    ]
  );

  grunt.task.registerTask(
    'bulbs_cms_to_django_app_init_py',
    'Create an __init__.py file for django-bulbs-cms app.',
    function () {
      grunt.file.write('compat-builds/django-bulbs-cms/__init__.py');
    }
  );

  grunt.registerTask(
    'build_bulbs_cms_for_django',
    'Convert bulbs-cms project to pre-cms-separation django app.',
    [
      // clean out old files
      'clean:builds_django_bulbs_cms',
      // run bulbs dist task
      'bulbs_cms_dist',
      // do the rest of prep needed for django app
      'bulbs_cms_to_django_app_init_py',
      // copy the whole thing into a place where setup.py can pick it up
      'copy:bulbs_cms_dist_to_django_bulbs_cms'
    ]
  );

 };
