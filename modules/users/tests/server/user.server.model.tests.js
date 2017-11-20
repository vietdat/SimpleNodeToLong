'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

var user, user2;

describe('User Model Unit Test: ', function() {
  before(function(done) {

    user = {
      "firstName": "Le",
      "lastName": "Dat",
      "email": "datle@goappable.com",
      "password": "dat123456",
      "active": {
        "status": true
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

    user2 = {
      "firstName": "Le",
      "lastName": "Dat",
      "email": "datlexxx@goappable.com",
      "password": "dat123456",
      "active": {
        "status": true
      },
      'typeUser': 'organization'
    };

    User.remove().exec(done);
  });

  describe('Method Save', function() {
    it('should begin with no users', function(done) {
      User.find({}, function(err, users) {
        users.should.have.length(0);
        done();
      });
    });
    it('should be able to save without problems', function(done) {
      var data = new User(user);

      data.save(function(err) {
        should.not.exist(err);
        data.remove(function(err) {
          should.not.exist(err);
          done();
        });
      });
    });
    it('should be able to show an error when try to save without first name', function(done) {
      user.firstName = '';
      var data = new User(user);

      data.save(function(err) {
        user.firstName = 'Dat';
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without last name', function(done) {
      user.lastName = '';
      var data = new User(user);

      data.save(function(err) {
        user.lastName = 'Le';
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without email', function(done) {
      user.email = '';
      var data = new User(user);

      data.save(function(err) {
        user.email = 'datle@goappable.com';
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without password', function(done) {
      user.password = '';
      var data = new User(user);

      data.save(function(err) {
        user.password = 'dat123456';
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without active', function(done) {
      user.active = '';
      var data = new User(user);

      data.save(function(err) {
        user.active = {
          "status": true
        };
        should.not.exist(err);
        data.remove(function(err) {
          should.not.exist(err);
          done();
        });
      });
    });
    it('should be able to show an error when try to save without typeUser', function(done) {
      user.typeUser = '';
      var data = new User(user);

      data.save(function(err) {
        user.typeUser = 'organization';
        should.exist(err);
        done();
      });
    });
    it('should be able to save without problems when try to save without organization', function(done) {
      var data = new User(user2);

      data.save(function(err) {
        should.not.exist(err);
        data.remove(function(err) {
          should.not.exist(err);
          done();
        });
      });
    });
  });

  after(function(done) {
    User.remove().exec(done);
  });
});
