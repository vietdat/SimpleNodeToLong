'use strict';

var _ = require('lodash'),
  config = require('../config'),
  chalk = require('chalk'),
  fs = require('fs'),
  Bunyan = require('bunyan'),
  bunyantcp = require('bunyan-logstash-tcp'),
  PrettyStream = require('bunyan-prettystream'),
  winston = require('winston');

// list of valid formats for the logging
var validTypes = ['info', 'debug', 'trace', 'warn', 'error'];
var prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

var logger = {};

/**
 * The type to use with the logger
 *
 * Returns the log.type option set in the current environment configuration
 */
logger.getLogFormat = function() {
  var type = config.log && config.log.type ? config.log.type.toString() : 'info';

  // make sure we have a valid type
  if (!_.includes(validTypes, type)) {
    type = 'info';

    if (process.env.NODE_ENV !== 'test') {
      console.log();
      console.log(chalk.yellow('Warning: An invalid type was provided. The logger will use the default type of "' + type + '"'));
      console.log();
    }
  }

  return type;
};

logger.reqSerializer = function(req) {
    return {
        method: req.method,
        url: req.url,
        headers: req.headers
    };
};

logger.info = function (loggerName, data){
  var options = _.clone(logger.customLogOptions(loggerName, 'info'), true);
  var log = Bunyan.createLogger(options);
  log.info(data);
};

logger.debug = function (loggerName, data){
  var options = _.clone(logger.customLogOptions(loggerName, 'debug'), true);
  var log = Bunyan.createLogger(options);
  log.debug(data);
};

logger.trace = function (loggerName, data){
  var options = _.clone(logger.customLogOptions(loggerName, 'debug'), true);
  var log = Bunyan.createLogger(options);
  log.trace(data);
};

logger.warn = function (loggerName, data){
  var options = _.clone(logger.customLogOptions(loggerName, 'debug'), true);
  var log = Bunyan.createLogger(options);
  log.warn(data);
};

logger.error = function (loggerName, data){
  var options = _.clone(logger.customLogOptions(loggerName, 'debug'), true);
  var log = Bunyan.createLogger(options);
  log.error(data);
};

module.exports = logger;
