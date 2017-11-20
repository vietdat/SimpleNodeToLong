'use strict';

var validator = require('validator'),
  path = require('path'),
  config = require(path.resolve('./config/config'));

/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {


  res.render('modules/core/server/views/index');
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).json({code: 500, message: 'Oops! Something went wrong...'});
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {
  res.status(404).json({code: 404, message: 'Path not found'});
};
