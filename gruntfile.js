'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  defaultAssets = require('./config/assets/default'),
  testAssets = require('./config/assets/test'),
  testConfig = require('./config/env/test'),
  defaultConfig = require('./config/env/default'),
  fs = require('fs'),
  chalk = require('chalk'),
  path = require('path');

module.exports = function (grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env: {
      test: {
        NODE_ENV: 'test'
      },
      local: {
        NODE_ENV: 'local'
      },
      dev: {
        NODE_ENV: 'development'
      },
      prod: {
        NODE_ENV: 'production'
      }
    },
    watch: {
      serverViews: {
        files: defaultAssets.server.views,
        options: {
          livereload: false
        }
      },
      serverJS: {
        files: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS),
        tasks: ['jshint'],
        options: {
          livereload: false
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug=5959'],
          ext: 'js,html',
          watch: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config),
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });
          }
        }
      }
    },
    concurrent: {
      default: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
    jshint: {
      all: {
        src: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS, testAssets.tests.server),
        options: {
          jshintrc: true,
          node: true,
          mocha: true,
          jasmine: true
        }
      }
    },
    eslint: {
      options: {},
      target: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS, testAssets.tests.server,testAssets.tests.e2e)
    },
    mochaTest: {
      src: testAssets.tests.server,
      options: {
        reporter: 'spec',
        timeout: 1000000
      }
    },
    mocha_istanbul: {
      coverage: {
        src: testAssets.tests.server,
        options: {
          print: 'detail',
          coverage: true,
          require: 'test.js',
          coverageFolder: 'coverage/server',
          reportFormats: ['cobertura','lcovonly'],
          check: {
            lines: 40,
            statements: 40
          }
        }
      }
    },
    copy: {
      localConfig: {
        src: 'config/env/local.example.js',
        dest: 'config/env/local.js',
        filter: function () {
          return !fs.existsSync('config/env/local.js');
        }
      }
    }
  });

  grunt.event.on('coverage', function(lcovFileContents, done) {
    // Set coverage config so karma-coverage knows to run coverage
    testConfig.coverage = true;
    require('coveralls').handleInput(lcovFileContents, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // Load NPM tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-protractor-coverage');

  // Make sure upload directory exists
  grunt.task.registerTask('mkdir:upload', 'Task that makes sure upload directory exists.', function () {
    // Get the callback
    var done = this.async();
    grunt.file.mkdir(path.normalize(__dirname + '/public/uploads'));
    done();
  });

  // Make sure log directory exists
  grunt.task.registerTask('mkdir:log', 'Task that makes sure log directory exists.', function () {
    // Get the callback
    // var done = this.async();
    //grunt.file.mkdir(path.normalize(config.log.fileLogger.directoryPath));
    // fs.mkdir(defaultConfig.log.fileLogger.directoryPath, function (err) {
    //   if (err && err.code !== 'EEXIST') {
    //     //console.error(err);
    //     console.log(chalk.red(err));
    //     done(err);
    //   }
    //   done();
    // });
  });

  // Connect to the MongoDB instance and load the models
  grunt.task.registerTask('mongoose', 'Task that connects to the MongoDB instance and loads the application models.', function () {
    // Get the callback
    var done = this.async();

    // Use mongoose configuration
    var mongoose = require('./config/lib/mongoose.js');

    // Connect to database
    mongoose.connect(function (db) {
      done();
    });
  });

  // Drops the MongoDB database, used in e2e testing
  grunt.task.registerTask('dropdb', 'drop the database', function () {
    // async mode
    var done = this.async();

    // Use mongoose configuration
    var mongoose = require('./config/lib/mongoose.js');

    mongoose.connect(function (db) {
      db.connection.db.dropDatabase(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Successfully dropped db: ', db.connection.db.databaseName);
        }
        db.connection.db.close(done);
      });
    });
  });

  grunt.task.registerTask('server', 'Starting the server', function () {
    // Get the callback
    var done = this.async();
    var path = require('path');
    var app = require(path.resolve('./config/lib/app'));
    var server = app.start(function () {
      done();
    });
  });

  // Run the project tests
  grunt.registerTask('test', ['env:test', 'mkdir:upload', 'mkdir:log', 'copy:localConfig', 'server', 'mochaTest']);
  grunt.registerTask('test:server', ['env:test','server', 'mochaTest']);
  // Run project coverage
  grunt.registerTask('coverage', ['env:test','mocha_istanbul:coverage']);
  // Run the project in local development
  grunt.registerTask(' z', ['env:local', 'mkdir:upload', 'mkdir:log', 'copy:localConfig', 'concurrent:default']);

  // Run the project in development mode
  grunt.registerTask('default', ['env:dev', 'mkdir:upload', 'mkdir:log', 'copy:localConfig', 'concurrent:default']);

  // Run the project in production mode
  grunt.registerTask('prod', ['env:prod', 'mkdir:upload', 'mkdir:log', 'copy:localConfig', 'concurrent:default']);
};
