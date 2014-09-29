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
        'test/test.js': 'test/test.coffee'

    concat:
      main:
        src: ['./dist/calendar.js', './dist/template.js']
        dest: './dist/calendar.js'

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
          './src/calendar.js'
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
            './bower_components/angular-mocks/angular-mocks.js'
            './dist/template.js'
          ]
      unit:
        src: './src/calendar.js'
        options:
          specs: './test/unit.js'
          vendor: [
            './bower_components/angular/angular.js'
            './bower_components/angular-mocks/angular-mocks.js'
            './dist/template.js'
          ]
          keepRunner: true

    ngmin:
      main:
        src: ['./src/calendar.js']
        dest: './dist/calendar.js'

    sass:
      main:
        files:
          'dist/calendar.css': 'src/calendar.scss'

    express:
      all:
        options:
          port: 9000
          bases: './demo/'
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

  grunt.registerTask 'default', build
  grunt.registerTask 'test', test
  grunt.registerTask 'serve', serve