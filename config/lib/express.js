'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
  express = require('express'),
  logger = require('./logger'),
  bunyanLogger = require('bunyan'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session),
  favicon = require('serve-favicon'),
  compress = require('compression'),
  chalk = require('chalk'),
  methodOverride = require('method-override'),
  cookieParser = require('cookie-parser'),
  helmet = require('helmet'),
  flash = require('connect-flash'),
  hbs = require('express-hbs'),
  path = require('path'),
  _ = require('lodash'),
  lusca = require('lusca');

const log = console.log;
const REQUEST_SIZE_LIMIT = '5mb';

/**
 * Initialize local variables
 */
module.exports.initLocalVariables = function (app) {
  // Setting application local variables
  app.locals.title = config.app.title;
  app.locals.description = config.app.description;
  if (config.secure && config.secure.ssl === true) {
    app.locals.secure = config.secure.ssl;
  }
  app.locals.keywords = config.app.keywords;
  app.locals.env = process.env.NODE_ENV;
  app.locals.domain = config.domain;

  // Passing the request url to environment locals
  app.use(function (req, res, next) {
    res.locals.host = req.protocol + '://' + req.headers.host;
    res.locals.remote = req.headers.origin;
    res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
    next();
  });

};

/**
 * Initialize application middleware
 */
module.exports.initMiddleware = function (app) {
  // Should be placed before express.static
  app.use(compress({
    filter: function (req, res) {
      if (req.headers['x-no-compression']) {
        return false
      }
      return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  // Enable logger (bunyan) if enabled in the configuration file
  // if (_.has(config, 'log.level')) {
  //   app.use(require('express-bunyan-logger')(logger.standardLogOptions()));
  // }
  // const tcpLogger = bunyanLogger.createLogger(logger.tcpLogOptions());
  //
  // process.on('uncaughtException', function(error) {
  //   console.log(error.stack);
  //   if(process.env.LOG_ENV){
  //     tcpLogger.error(error.stack);
  //   }
  // }).on('unhandledRejection', function(reason, p){
  //   if(process.env.LOG_ENV){
  //     tcpLogger.error(reason);
  //   }
  // }).on('warning', function(warning){
  //   console.log('warning, ... ',warning);
  // });

  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
    // Disable views cache
    app.set('view cache', false);
  } else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory';
  }

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    limit: REQUEST_SIZE_LIMIT,
    extended: true
  }));
  app.use(bodyParser.json({limit: REQUEST_SIZE_LIMIT}));
  app.use(methodOverride());

  // Add the cookie parser and flash middleware
  app.use(cookieParser());
  app.use(flash());
  app.all('/*', function(req, res, next) {
    // CORS headers
    res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,x-time-zone,X-Access-Token,X-Key,Authorization');
    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });

};

/**
 * Configure view engine
 */
module.exports.initViewEngine = function (app) {
  app.engine('server.view.html', hbs.express4({
    extname: '.server.view.html'
  }));
  app.set('view engine', 'server.view.html');
  app.set('views', path.resolve('./'));
};

/**
 * Configure Express session
 */
module.exports.initSession = function (app, db) {
  // Express MongoDB session storage
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    cookie: {
      maxAge: config.sessionCookie.maxAge,
      httpOnly: config.sessionCookie.httpOnly,
      secure: config.sessionCookie.secure && config.secure.ssl
    },
    name: config.sessionKey,
    store: new MongoStore({
      mongooseConnection: db.connection,
      collection: config.sessionCollection
    })
  }));

  // Add Lusca CSRF Middleware
  app.use(lusca(config.csrf));
};

/**
 * Invoke modules server configuration
 */
module.exports.initModulesConfiguration = function (app, db) {
  config.files.server.configs.forEach(function (configPath) {
    require(path.resolve(configPath))(app, db);
  });
};

/**
 * Configure Helmet headers configuration
 */
module.exports.initHelmetHeaders = function (app) {
  // Use helmet to secure Express headers
  const SIX_MONTHS = 15778476000;
  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.use(helmet.hsts({
    maxAge: SIX_MONTHS,
    includeSubdomains: true,
    force: true
  }));
  app.disable('x-powered-by');
};

/**
 * Configure the modules static routes
 */
module.exports.initModulesClientRoutes = function (app) {
  // Setting the app router and static folder
  app.use('/', express.static(path.resolve('./public'), { maxAge: 86400000 }));
};

/**
 * Configure the modules ACL policies
 */
module.exports.initModulesServerPolicies = function (app) {
  // Globbing policy files
  config.files.server.policies.forEach(function (policyPath) {
    require(path.resolve(policyPath)).invokeRolesPolicies();
  });
};

/**
 * Configure the modules server routes
 */
module.exports.initModulesServerRoutes = function (app) {
  // Globbing routing files
  config.files.server.routes.forEach(function (routePath) {
    require(path.resolve(routePath))(app);
  });
};

/**
 * Configure error handling
 */
module.exports.initErrorRoutes = function (app) {
  app.use(function (err, req, res, next) {
    // If the error object doesn't exists
    if (!err) {
      return next();
    }
    console.error(err.stack);
    // Redirect to error page
    res.json({code: 500, message:'server-error'});
  });
  app.use(function(req, res) {
    res.status(400).json({code: 404, message: 'Path Not Found'});
  });
};

/**
 * Configure Socket.io
 */
module.exports.configureSocketIO = function (app, db) {
  // Load the Socket.io configuration
  var server = require('./socket.io')(app, db);

  // Return server object
  return server;
};

/**
 * Initialize the Express application
 */
module.exports.init = function (db) {
  // Initialize express app
  var app = express();

  // Initialize local variables
  this.initLocalVariables(app);

  // Initialize Express middleware
  this.initMiddleware(app);

  // Initialize Express view engine
  this.initViewEngine(app);

  // Initialize Helmet security headers
  this.initHelmetHeaders(app);

  // Initialize modules static client routes, before session!
  this.initModulesClientRoutes(app);

  // Initialize Express session
  this.initSession(app, db);

  // Initialize Modules configuration
  this.initModulesConfiguration(app);

  // Initialize modules server authorization policies
  this.initModulesServerPolicies(app);

  // Initialize modules server routes
  this.initModulesServerRoutes(app);

  // Initialize error routes
  this.initErrorRoutes(app);



  // Configure Socket.io
  let server = this.configureSocketIO(app, db);

  return server;
};
