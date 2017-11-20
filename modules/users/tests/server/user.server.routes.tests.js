'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  TokenlistModel = mongoose.model('Tokenlist'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  _user,
  user_id,
  user,
  user2,
  _user2,
  _user3,
  _user4,
  userInfo,
  token, token2;

/**
 * User routes tests
 */
describe('User routes api register', function() {
  before(function(done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);
    User.remove().exec(done);
  });

  beforeEach(function(done) {
    // Create user credentials with email
    userInfo = {
      email: 'levietd12tqn@gmail.com',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // User data
    _user = {
      "firstName": "Le",
      "lastName": "Dat",
      "email": "levietd12tqn@gmail.com",
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

    _user2 = {
      "firstName": "Le",
      "lastName": "Dat",
      "email": "datle2@goappable.com",
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

    _user3 = {
      "firstName": "Le",
      "lastName": "Dat",
      "email": "datle3w@goappable.com",
      "password": "dat123456"
    };
    done();
  });

  it('should be able to register without organization', function(done) {
    agent.post('/register')
      .send(_user3)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(200);
        done();
      });
  });

  it('should be able to register a new user', function(done) {
    agent.post('/register')
      .send(_user)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(200);
        done();
      });
  });

  it('should be able to show an error when try to register email exist', function(done) {
    agent.post('/register')
      .send(_user)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(1101);
        done();
      });
  });

  it('should be able to show an error when try to register without firstName', function(done) {
    _user2.firstName = '';
    agent.post('/register')
      .send(_user2)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user2.firstName = 'Le';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to register without lastName', function(done) {
    _user2.lastName = '';
    agent.post('/register')
      .send(_user2)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user2.lastName = 'Dat';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to register without password', function(done) {
    _user2.password = '';
    agent.post('/register')
      .send(_user2)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user2.password = 'dat123456';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to register without email', function(done) {
    _user2.email = '';
    agent.post('/register')
      .send(_user2)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user2.email = 'datle2@goappable.com';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to register with organization without name', function(done) {
    _user2.organization.name = '';
    agent.post('/register')
      .send(_user2)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user2.organization.name = 'Appable';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to register with organization without address', function(done) {
    _user2.organization.address = '';
    agent.post('/register')
      .send(_user2)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user2.organization.address = '28 Hoa su';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to register with organization without country', function(done) {
    _user2.organization.country = '';
    agent.post('/register')
      .send(_user2)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user2.organization.address = 'Viet Nam';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to register with organization without phone', function(done) {
    _user2.organization.phone = '';
    agent.post('/register')
      .send(_user2)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user2.organization.phone = '01776763292';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to register with organization without city', function(done) {
    _user2.organization.city = '';
    agent.post('/register')
      .send(_user2)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user2.organization.city = 'Ho Chi Minh';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to register with organization without state', function(done) {
    _user2.organization.state = '';
    agent.post('/register')
      .send(_user2)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user2.organization.state = 'California';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to register with organization without zip code', function(done) {
    _user2.organization.zipCode = '';
    agent.post('/register')
      .send(_user2)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user2.organization.zipCode = '700000';
        res.body.code.should.equal(400);
        done();
      });
  });

  after(function(done) {
    User.remove().exec(done);
  });
});

describe('User routes api verify', function() {
  before(function(done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    User.remove().exec(done);
  });

  beforeEach(function(done) {
    // Create user credentials with email
    // User data
    _user = {
      "firstName": "Le",
      "lastName": "Dat",
      "email": "levietd12tqn@gmail.com",
      "password": "dat123456",
      "active": {
        "status": false,
        "code": 'asdjfbaksfiashdifqwjkehuiqwriiqwebriuweir'
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

    user = new User(_user);

    user.save(function(err) {
      should.not.exist(err);
      done();
    });
  });

  it('should be able to verify without code', function(done) {
    agent.get('/register/verify')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to verify with wrong code', function(done) {
    var code = 'hsfkdhkfshkhkfajhfkajsdhfkashfkashfk';
    agent.get('/register/verify?code=' + code)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(1104);
        done();
      });
  });

  it('should be able to verify with correct code', function(done) {
    agent.get('/register/verify?code=' + _user.active.code)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(200);
        done();
      });
  });

  afterEach(function(done) {
    User.remove().exec(done);
  });
});

describe('User router api login', function() {
  before(function(done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);
    User.remove().exec(done);
  });

  beforeEach(function(done) {
    // Create user credentials with email
    // User data
    _user = {
      "firstName": "Le",
      "lastName": "Dat",
      "email": "levietd12tqn@gmail.com",
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

    _user2 = {
      "firstName": "Le",
      "lastName": "Dat",
      "email": "datle2@goappable.com",
      "password": "dat123456",
      "active": {
        "status": 'false'
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

    userInfo = {
      email: 'levietd12tqn@gmail.com',
      password: 'dat123456'
    };

    user = new User(_user);
    user2 = new User(_user2);

    user.save(function(err) {
      should.not.exist(err);
    });
    user2.save(function(err) {
      should.not.exist(err);
      done();
    });

  });

  it('should be able to show an error when try to login without email', function(done) {
    userInfo.email = '';
    agent.post('/login')
      .send(userInfo)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to login without password', function(done) {
    userInfo.password = '';
    agent.post('/login')
      .send(userInfo)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to login not exist email', function(done) {
    userInfo.email = 'abc@xyz.com';
    agent.post('/login')
      .send(userInfo)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(1102);
        done();
      });
  });

  it('should be able to show an error when try to login wrong password', function(done) {
    userInfo.password = '123456';
    agent.post('/login')
      .send(userInfo)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(1102);
        done();
      });
  });

  it('should be able to show an error when try to login with not active account', function(done) {
    userInfo.email = 'datle2@goappable.com';
    agent.post('/login')
      .send(userInfo)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(1101);
        done();
      });
  });

  it('should be able to login with correct active account', function(done) {
    agent.post('/login')
      .send(userInfo)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(200);
        done();
      });
  });

  afterEach(function(done) {
    User.remove().exec(done);
  });
});

describe('User router api logout', function() {
  before(function(done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);
    User.remove().exec(done);
  });

  beforeEach(function(done) {
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTA5NGZlYmJkM2UyODJkYjc0MjczOWYiLCJ0eXBlVXNlciI6Im9yZ2FuaXphdGlvbiIsInBlcm1pc3Npb24iOjAsImlhdCI6MTQ5Mzg4MzEwNCwiZXhwIjoxMDEzMzg4MzEwNH0.tKBn5kWZ6klhaKBCKNlg3I30Kx6WqryGRrS752ccau4';

    _user = {
      "firstName": "Le",
      "lastName": "Dat",
      "email": "levietd12tqn@gmail.com",
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

    user = new User(_user);
    user._id = mongoose.Types.ObjectId("59094febbd3e282db742739f");
    user.save(function(err) {
      should.not.exist(err);
    });

    new TokenlistModel({
      token: token,
      email: 'levietd12tqn@gmail.com',
      status: true
    }).save(done);
  });

  it('should be able to logout with correct token', function(done) {
    agent.get('/logout?token=' + token)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(200);
        done();
      });
  });

  it('should be able to show an error when try to logout without token', function(done) {
    agent.get('/logout')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(401);
        done();
      });
  });

  it('should be able to show an error when try to logout with token is not exist', function(done) {
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdGxlQGdvYXBwYWJsZS5jb20iLCJ0eXBlQWNjb3VudCI6Im9yaWdhbml6YXRpb24iLCJwZXJtaXNzaW9uIjowLCJpYXQiOjE0OTMwOTQzNzgsImV4cCI6MTQ5MzE4MDc3OH0.nDSAbiTPQ43h2jdgjpqxi1DDC9a507KF65d7T_MjsNc';
    agent.get('/logout?token=' + token)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(401);
        done();
      });
  });

  afterEach(function(done) {
    User.remove().exec();
    TokenlistModel.remove().exec(done);
  });
});

describe('User router api profile', function() {
  before(function(done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);
    User.remove().exec(done);
  });

  beforeEach(function(done) {
    // Create user credentials with email
    // User data
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTA5NGZlYmJkM2UyODJkYjc0MjczOWYiLCJ0eXBlVXNlciI6Im9yZ2FuaXphdGlvbiIsInBlcm1pc3Npb24iOjAsImlhdCI6MTQ5Mzg4MzEwNCwiZXhwIjoxMDEzMzg4MzEwNH0.tKBn5kWZ6klhaKBCKNlg3I30Kx6WqryGRrS752ccau4';

    _user = {
      "firstName": "Le",
      "lastName": "Dat",
      "email": "levietd12tqn@gmail.com",
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

    user = new User(_user);
    user._id = mongoose.Types.ObjectId("59094febbd3e282db742739f");
    user.save(function(err) {
      should.not.exist(err);
    });

    new TokenlistModel({
      token: token,
      email: 'levietd12tqn@gmail.com',
      status: true
    }).save(done);
  });

  it('should be able to show an error when try to get profile without token', function(done) {
    agent.get('/user/profile')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(401);
        done();
      });
  });

  it('should be able to show an error when try to get profile with token is not exist', function(done) {
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdGxlQGdvYXBwYWJsZS5jb20iLCJ0eXBlQWNjb3VudCI6Im9yaWdhbml6YXRpb24iLCJwZXJtaXNzaW9uIjowLCJpYXQiOjE0OTMwOTQzNzgsImV4cCI6MTQ5MzE4MDc3OH0.nDSAbiTPQ43h2jdgjpqxi1DDC9a507KF65d7T_MjsNc';
    agent.get('/user/profile?token=' + token)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(401);
        done();
      });
  });

  it('should be able to get profile with correct token', function(done) {
    agent.get('/user/profile?token=' + token)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(200);
        done();
      });
  });
  afterEach(function(done) {
    TokenlistModel.remove().exec();
    User.remove().exec(done);
  });
});

describe('User router api changePassword', function() {
  before(function(done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);
    User.remove().exec(done);
  });

  beforeEach(function(done) {
    // Create user credentials with email
    // User data
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTA5NGZlYmJkM2UyODJkYjc0MjczOWYiLCJ0eXBlVXNlciI6Im9yZ2FuaXphdGlvbiIsInBlcm1pc3Npb24iOjAsImlhdCI6MTQ5Mzg4MzEwNCwiZXhwIjoxMDEzMzg4MzEwNH0.tKBn5kWZ6klhaKBCKNlg3I30Kx6WqryGRrS752ccau4';

    _user = {
      "firstName": "Le",
      "lastName": "Dat",
      "email": "levietd12tqn@gmail.com",
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

    _user3 = {
      'currentPassword': 'dat123456',
      'newPassword': 'dat123123'
    };

    user = new User(_user);
    user._id = mongoose.Types.ObjectId("59094febbd3e282db742739f");
    user_id = user._id;

    user.save(function(err) {
      should.not.exist(err);
    });


    new TokenlistModel({
      token: token,
      email: 'levietd12tqn@gmail.com',
      status: true
    }).save(done);
  });

  it('should be able to show an error when try to change password without token', function(done) {
    agent.put('/user/'+user_id+'/password')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(401);
        done();
      });
  });

  it('should be able to show an error when try to change password with token doesn\'t exist', function(done) {
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdGxlQGdvYXBwYWJsZS5jb20iLCJ0eXBlQWNjb3VudCI6Im9yaWdhbml6YXRpb24iLCJwZXJtaXNzaW9uIjowLCJpYXQiOjE0OTMwOTQzNzgsImV4cCI6MTQ5MzE4MDc3OH0.nDSAbiTPQ43h2jdgjpqxi1DDC9a507KF65d7T_MjsNc';
    agent.put('/user/'+user_id+'/password?token=' + token)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(401);
        done();
      });
  });

  it('should be able to show an error when try to change password without current password', function(done) {
    _user3.currentPassword = '';
    agent.put('/user/'+user_id+'/password?token=' + token)
      .send(_user3)
      .expect(200)
      .end(function(err, res) {
        _user3.currentPassword = 'dat123456';
        if (err) {
          done(err);
        }
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to change password without new password', function(done) {
    _user3.newPassword = '';
    agent.put('/user/'+user_id+'/password?token=' + token)
      .send(_user3)
      .expect(200)
      .end(function(err, res) {
        _user3.newPassword = 'dat123456';
        if (err) {
          done(err);
        }
        res.body.code.should.equal(400);
        done();
      });
  });


  it('should be able to change password with complete data', function(done) {
    agent.put('/user/'+user_id+'/password?token=' + token)
      .send(_user3)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(200);
        done();
      });
  });
  afterEach(function(done) {
    TokenlistModel.remove().exec();
    User.remove().exec(done);
  });
});

describe('User router api forgotPassword', function() {
  before(function(done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    User.remove().exec(done);
  });

  beforeEach(function(done) {
    // Create user credentials with email
    // User data
    _user = {
      "firstName": "Le",
      "lastName": "Dat",
      "email": "levietd12tqn@gmail.com",
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

    user = new User(_user);
    user._id = mongoose.Types.ObjectId("59094febbd3e282db742739f");
    _user3 = {
      'email': 'levietd12tqn@gmail.com'
    };
    user.save(function(err) {
      should.not.exist(err);
    });

    done();
  });

  it('should be able to show an error when try to forgot password without email', function(done) {
    agent.post('/user/forgot')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to forgot password with email doesn\'t exist', function(done) {
    _user3.email = 'dat@abc.com';
    agent.post('/user/forgot')
      .send(_user3)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(404);
        done();
      });
  });

  it('should be able to forgot password with complete data', function(done) {
    agent.post('/user/forgot')
      .send(_user3)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(200);
        done();
      });
  });
  afterEach(function(done) {
    User.remove().exec(done);
  });
});

describe('User router api resetPassword', function() {
  before(function(done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    User.remove().exec(done);
  });

  beforeEach(function(done) {
    // Create user credentials with email
    // User data
    _user = {
      "firstName": "Le",
      "lastName": "Dat",
      "email": "levietd12tqn@gmail.com",
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
      },
      "resetPasswordExpires": "2020-05-03",
      "resetPasswordToken": "e9cec1f8962307a23f5c210dabdf71147f66ef82"
    };

    user = new User(_user);

    token = 'e9cec1f8962307a23f5c210dabdf71147f66ef82';

    _user3 = {
      'password': 'levietd12tqn@g'
    };
    user.save(function(err) {
      should.not.exist(err);
    });

    done();
  });

  it('should be able to show an error when try to reset password without password', function(done) {
    agent.post('/user/reset/'+token)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to reset password with wrong token', function(done) {
    token = 'asdkfjaskdjfkajsdfkjaskdfhaskdhfkashdfkjs';
    agent.post('/user/reset/'+token)
      .send(_user3)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(404);
        done();
      });
  });

  it('should be able to reset password with complete data', function(done) {
    agent.post('/user/reset/'+token)
      .send(_user3)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(200);
        done();
      });
  });
  afterEach(function(done) {
    User.remove().exec(done);
  });
});

describe('User routes api edit profile', function() {
  User.remove().exec();
  TokenlistModel.remove().exec();
  before(function(done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    // User data
    _user = {
      "firstName": "Le",
      "lastName": "Dat",
      "email": "levietd12tqn@gmail.com",
      "password": "dat123456",
      "active": {
        "status": true
      },
      'typeUser': 'individual',
    };

    _user2 = {
      "firstName": "Le",
      "lastName": "Dat",
      "email": "datle2@goappable.com",
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

    _user3 = {
      "firstName": "Le",
      "lastName": "Dat",
      "email": "datle3w@goappable.com"
    };

    _user4 = {
      "firstName": "Lefd",
      "lastName": "Datwewewe",
      "email": "datle2@goappable.com",
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

    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTA5NGZlYmJkM2UyODJkYjc0MjczOWYiLCJ0eXBlVXNlciI6Im9yZ2FuaXphdGlvbiIsInBlcm1pc3Npb24iOjAsImlhdCI6MTQ5Mzg4MzEwNCwiZXhwIjoxMDEzMzg4MzEwNH0.tKBn5kWZ6klhaKBCKNlg3I30Kx6WqryGRrS752ccau4';
    token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhZGY3ZDhiY2FkMTYxZTczNDc3MGEiLCJ0eXBlVXNlciI6Im9yZ2FuaXphdGlvbiIsInBlcm1pc3Npb24iOjAsImlhdCI6MTQ5Mzg4NDg3MCwiZXhwIjoyMzU3ODg0ODcwfQ.zLxktNj0VR5R14W2GA_qOTUkEPQBl82nQm0VciK_gW0';

    user = new User(_user);
    user._id = mongoose.Types.ObjectId("59094febbd3e282db742739f");
    user.save(function(err) {
      should.not.exist(err);
    });

    user2 = new User(_user2);
    user2._id = mongoose.Types.ObjectId("590adf7d8bcad161e734770a");
    user2.save(function(err) {
      should.not.exist(err);
    });

    new TokenlistModel({
      token: token,
      email: 'levietd12tqn@gmail.com',
      status: true
    }).save();

    new TokenlistModel({
      token: token2,
      email: 'datle2@goappable.com',
      status: true
    }).save();

    done();
  });

  it('should be able to show an error when try to edit without firstName', function(done) {
    _user3.firstName = '';
    agent.put('/user/'+user._id+'/edit-profile?token='+token)
      .send(_user3)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user3.firstName = 'Le12ds';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to edit without lastName', function(done) {
    _user3.lastName = '';
    agent.put('/user/'+user._id+'/edit-profile?token='+token)
      .send(_user3)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user3.lastName = 'Dat';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to edit with organization without name', function(done) {
    _user4.organization.name = '';
    agent.put('/user/'+user2._id+'/edit-profile?token='+token2)
      .send(_user4)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user4.organization.name = 'Appable';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to edit with organization without address', function(done) {
    _user4.organization.address = '';
    agent.put('/user/'+user2._id+'/edit-profile?token='+token2)
      .send(_user4)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user4.organization.address = '28 Hoa su';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to edit with organization without country', function(done) {
    _user4.organization.country = '';
    agent.put('/user/'+user2._id+'/edit-profile?token='+token2)
      .send(_user4)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user4.organization.country = 'Viet Nam';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to edit with organization without phone', function(done) {
    _user4.organization.phone = '';
    agent.put('/user/'+user2._id+'/edit-profile?token='+token2)
      .send(_user4)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user4.organization.phone = '01776763292';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to edit with organization without city', function(done) {
    _user4.organization.city = '';
    agent.put('/user/'+user2._id+'/edit-profile?token='+token2)
      .send(_user4)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user4.organization.city = 'Ho Chi Minh';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to register with organization without state', function(done) {
    _user4.organization.state = '';
    agent.put('/user/'+user2._id+'/edit-profile?token='+token2)
      .send(_user4)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user4.organization.state = 'California';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to show an error when try to register with organization without zip code', function(done) {
    _user4.organization.zipCode = '';
    agent.put('/user/'+user2._id+'/edit-profile?token='+token2)
      .send(_user4)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        _user4.organization.zipCode = '700000';
        res.body.code.should.equal(400);
        done();
      });
  });

  it('should be able to edit', function(done) {
    agent.put('/user/'+user._id+'/edit-profile?token='+token)
      .send(_user3)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(200);
        done();
      });
  });

  it('should be able to edit account organization', function(done) {
    agent.put('/user/'+user2._id+'/edit-profile?token='+token2)
      .send(_user4)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        res.body.code.should.equal(200);
        done();
      });
  });

  after(function(done) {
    User.remove().exec();
    TokenlistModel.remove().exec(done);
  });
});
