/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1.0',
      banner: '/*! GoTTC - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://github.com/escalant3/go-ttc/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'Gregory Pike & Diego M. Escalante; Licensed MIT */'
    },
    lint: {
      files: ['grunt.js', 'js/*.js', 'test/**/*.js']
    },
    qunit: {
      files: ['test/**/*.html']
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', 
          'js/lib/*.js',
          'js/*.js',
          'js/controllers/*.js',
          'js/services/*.js',
          'js/directives/*js'
        ],
        dest: 'dist/goTTC.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/goTTC.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {}
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit concat min');
  grunt.registerTask('build', 'concat min');

};
