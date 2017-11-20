'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  db: {
    uri: 'mongodb://datle:dat123456@ds157380.mlab.com:57380/learnmongodb',
    // options: {
    //   user: process.env.MONGODB_USERNAME || '',
    //   pass: process.env.MONGODB_PASSWORD || 'canco!tamLong'
    // },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  app: {
    title: defaultEnvConfig.app.title + ' - Staging Environment'
  }
};
