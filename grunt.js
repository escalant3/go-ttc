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
    ngTemplates: {
      GoTTC: {
        simple: {
          options: {
            base: 'js/templates'
          },
          src: ['js/templates/favourite-station.html'],
          dest: 'dist/templates.js'
        }
      }
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
          'js/values/*.js',
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
    server: {
      base: './www',
      port: 8000
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

  grunt.registerTask('compile', function(){
    var content,
        destFile,
        templateCode;

    var FILES = [
      "js/templates/favourite-station.html",
      "js/templates/intersection-search.html",
      "js/templates/settings-pane.html"
    ];

    destFile = "www/js/templates/templates.js";

    templateCode = "angular.module('GoTTC').run(['$templateCache', function($templateCache) {";
    for(var i=0 ; i < FILES.length ; i++) {

      content = grunt.file.read("www/" + FILES[i]);
      content = content.replace(/"/g, '\\"').replace(/\r?\n/g, '" +\n    "');
      templateCode += "$templateCache.put(\"" + FILES[i] + "\", \"" + content + "\");";
    }
    templateCode += "}]);";

    grunt.file.write(destFile, templateCode);

  });


};
