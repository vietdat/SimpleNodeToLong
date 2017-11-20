'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  ItemModel = mongoose.model('Item'),
  _ = require('lodash'),
  async = require('async');

exports.getContactList = function(req, res) {
  async.auto({
    init: function(done) {
      ItemModel.find().lean().exec(function() {
        done(null, 'Ahihi');
      });
    }
  }, function(err, data) {
    if (err) {
      res.json(err);
      return;
    }
    res.json({
      code: 200,
      message: data.init
    });
    return;

  });
}
