"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserLogin = void 0;

var _userModel = require("../../models/userModel.js");

var _logger = require("../../utils/logger.js");

var UserLogin = function UserLogin(email) {
  var response, user;
  return regeneratorRuntime.async(function UserLogin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          response = {
            status: 200,
            message: 'User login success !',
            data: {}
          };
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_userModel.User.findOne({
            email: email
          }));

        case 4:
          user = _context.sent;
          response.data = user || [];
          _context.t0 = user;

          if (!_context.t0) {
            _context.next = 11;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap(user.matchPassword(password));

        case 10:
          _context.t0 = _context.sent;

        case 11:
          if (!_context.t0) {
            _context.next = 15;
            break;
          }

          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
          });
          _context.next = 17;
          break;

        case 15:
          res.status(401);
          throw new Error('Invalid email or password');

        case 17:
          _logger.logger.success('Get List success'); // logger.log(products)


          _context.next = 25;
          break;

        case 20:
          _context.prev = 20;
          _context.t1 = _context["catch"](1);

          _logger.logger.fail(_context.t1.message);

          response.status = 500;
          response.message = _context.t1.message;

        case 25:
          return _context.abrupt("return", response);

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 20]]);
};

exports.UserLogin = UserLogin;