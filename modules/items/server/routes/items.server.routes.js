'use strict';

var items = require('../controllers/items.server.controller');

module.exports = function(app) {
  app.route('/abc')
    .get(items.getContactList);
}
