// Generated by CoffeeScript 1.9.3
(function() {
  var BusinessError, ControllerLoader, ParamError, UnauthorizedError, config, exception;

  BusinessError = require('./errors/businessError');

  ParamError = require('./errors/paramError');

  UnauthorizedError = require('./errors/unauthorizedError');

  config = require(process.cwd() + '/lib/common/config');

  exception = function(err, req, res, next) {
    if (err instanceof BusinessError) {
      return res.json({
        errCode: err.code,
        errText: err.message
      });
    } else if (err instanceof ParamError) {
      res.status(400);
      return res.end();
    } else if (err instanceof UnauthorizedError) {
      res.status(401);
      return res.end();
    } else {
      console.log('Error: ' + req.url);
      console.log(err.stack);
      res.status(500);
      return res.send(err.stack);
    }
  };

  ControllerLoader = (function() {
    function ControllerLoader() {}

    ControllerLoader.prototype.loadAll = function(app) {
      var controllerPath;
      app.disable('x-powered-by');
      controllerPath = process.cwd() + '/controllers';
      require('fs').readdirSync(controllerPath).forEach(function(file) {
        return require(process.cwd() + '/controllers/' + file)(app);
      });
      return app.use(exception);
    };

    return ControllerLoader;

  })();

  module.exports = {
    session: function(redis, gen_session_id) {
      var RedisStore, option, session, sessionProcess, store;
      session = require('express-session');
      store = null;
      if (redis) {
        RedisStore = require('connect-redis')(session);
        store = new RedisStore({
          host: config.redis.host,
          port: config.redis.port
        });
        store.on('connect', function() {
          return console.log('session store connected!');
        });
        store.on('disconnect', function(err) {
          return console.log('session store disconnected!');
        });
      }
      option = {
        store: store,
        secret: config.session_secret || 'keyboard cat',
        resave: false,
        saveUninitialized: false
      };
      if (!gen_session_id) {
        option.genid = function() {};
      }
      sessionProcess = session(option);
      return function(req, res, next) {
        if (req && req.headers.authorization && req.headers.authorization.indexOf('Bearer ' === 0)) {
          return next();
        } else {
          return sessionProcess(req, res, next);
        }
      };
    },
    controllerLoader: new ControllerLoader(),
    BusinessError: BusinessError,
    ParamError: ParamError,
    UnauthorizedError: UnauthorizedError
  };

}).call(this);