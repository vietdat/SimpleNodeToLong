'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  UserModel = mongoose.model('User'),
  TokenlistModel = mongoose.model('Tokenlist'),
  express = require(path.resolve('./config/lib/express')),
  data_test = require(path.resolve('./config/lib/data.test')),
  handle_data = require(path.resolve('./config/lib/handle.data.test.js')),
  async = require('async');

describe('API Invitation Member Of Organization', function() {
  var app, agent, user;
  before(function(done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    async.series({
      user: function(callback) {
        //create user account
        handle_data.saveUser(data_test.user(), function(err, doc) {
          if (err) {
            callback(err);
            return;
          }
          console.log('User is:: ', doc);
          callback(null, doc);
        });
      }
    }, function(err, results) {
      if (err) {
        done(err);
        return;
      }

      user = results.user;
      done();
    });
  });

  beforeEach(function(done) {
    done();
  });

  it('should be able to invite a member ', function(done) {
    agent.post('/organization/invitation?token=' + user.token)
      .send({
        'organization_member_mail': 'datle@goappable.com'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(200);
        res.body.message.should.equal('Invite success');
        done();
      });
  });

  afterEach(function(done) {
    done();
  });

  after(function(done) {
    async.series([
      function(next) {
        UserModel.remove().exec(next);
      },
      function(next) {
        TokenlistModel.remove().exec(next);
      }
    ], function(err) {
      should.not.exist(err);
      done();
    });
  });
});

describe('API Check Member is exist', function() {
  var app, agent, user;
  before(function(done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    async.series({
      user: function(callback) {
        //create user account
        handle_data.saveUser(data_test.user(), function(err, doc) {
          if (err) {
            callback(err);
            return;
          }
          console.log('User is:: ', doc);
          callback(null, doc);
        });
      }
    }, function(err, results) {
      if (err) {
        done(err);
        return;
      }

      user = results.user;
      done();
    });
  });

  beforeEach(function(done) {
    //create new user
    let user_test = {
      "firstName": "Le",
      "lastName": "Dat",
      "email": "levietd112tq12n@gmail.com",
      "password": "dat123456",
      "active": {
        "status": 'true'
      },
      'typeUser': 'organization',
      "organization": {
        "name": "Appable",
        "address": "28 Hoa Su, phuong 7, quan phu nhuan, Tp Ho Chi Minh",
        "country": "viet nam",
        "phone": "016687989898",
        "city": "Ho Chi Minh",
        "state": "California",
        "zipCode": "1000000"
      }
    };

    new UserModel(user_test).save(done);
  });

  it('should be able to check exist member ', function(done) {
    agent.post('/organization/invitation?token=' + user.token)
      .send({
        'organization_member_mail': 'datle@goappable.com'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(200);
        res.body.message.should.equal('Invite success');
        done();
      });
  });

  afterEach(function(done) {
    done();
  });

  after(function(done) {
    async.series([
      function(next) {
        UserModel.remove().exec(next);
      },
      function(next) {
        TokenlistModel.remove().exec(next);
      }
    ], function(err) {
      should.not.exist(err);
      done();
    });
  });
});
