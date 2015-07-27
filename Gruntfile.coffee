module.exports = (grunt) ->
  [
    'grunt-contrib-clean'
    'grunt-contrib-coffee'
    'grunt-contrib-concat'
    'grunt-contrib-jasmine'
    'grunt-contrib-sass'
    'grunt-contrib-watch'
    'grunt-coveralls'
    'grunt-html2js'
    'grunt-ngmin',
    'grunt-express'
  ]
  .forEach grunt.loadNpmTasks

  # task sets
  build = ['html2js', 'ngmin', 'concat', 'sass', 'clean']
  test = ['html2js', 'coffee', 'jasmine:unit']
  serve = ['express', 'watch']

  # task defs
  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    clean:
      main: [
        './dist/template.js'
      ]


    coffee:
      files:
        'test/unit.js': 'test/unit.coffee'

    concat:
      main:
        src: ['./dist/turnCalendar.js', './dist/template.js']
        dest: './dist/turnCalendar.js'

    coveralls:
      options:
        force: true
      main:
        src: 'reports/lcov/lcov.info'

    html2js:
      main:
        src: './src/*.html'
        dest: './dist/template.js'
      options:
        base: './src'
        module: 'calendarTemplates'

    jasmine:
      coverage:
        src: [
          './src/turnCalendar.js'
        ]
        options:
          specs: ['./test/unit.js']
          template: require 'grunt-template-jasmine-istanbul'
          templateOptions:
            coverage: 'reports/lcov/lcov.json'
            report: [
              {
                type: 'html'
                options:
                  dir: 'reports/html'
              }
              {
                type: 'lcov'
                options:
                  dir: 'reports/lcov'
              }
            ]
          type: 'lcovonly'
          vendor: [
            './bower_components/angular/angular.js'
            './bower_components/angular-mocks/angular-mocks.js',
            './bower_components/jquery/dist/jquery.js',
            './bower_components/timezone-js/src/date.js',
            './dist/template.js'
          ]
      unit:
        src: './src/turnCalendar.js'
        options:
          specs: './test/*.js'
          vendor: [
            './bower_components/angular/angular.js'
            './bower_components/angular-mocks/angular-mocks.js',
            './bower_components/jquery/dist/jquery.js',
            './bower_components/timezone-js/src/date.js',
            './dist/template.js'
          ]
          keepRunner: true

    ngmin:
      main:
        src: ['./src/turnCalendar.js']
        dest: './dist/turnCalendar.js'

    sass:
      main:
        files:
          'dist/turnCalendar.css': 'src/turnCalendar.scss'

    express:
      all:
        options:
          port: 9000
          bases: ['./demo/', './']
          livereload: true

    watch:
      main:
        files: [
          './src/*'
          './bower_components/*'
          './node_modules/*'
        ]
        tasks: build
        options:
          interrupt: true
          spawn: false
          livereload: 9106
      test:
        files: './test/*.js'
        tasks: test
        options:
          interrupt: true
          spawn: false

  grunt.registerTask 'build', build
  grunt.registerTask 'test', test
  grunt.registerTask 'serve', serve