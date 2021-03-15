"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.logout = exports.login = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _user = require("../constants/user.constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var login = function login(email, password) {
  return function _callee(dispatch) {
    var config, _ref, data;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch({
              type: _user.USER_LOGIN_REQUEST
            });
            config = {
              headers: {
                'content-Type': 'application/json'
              }
            };
            _context.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].post('/api/login', {
              email: email,
              password: password
            }, config));

          case 5:
            _ref = _context.sent;
            data = _ref.data;
            dispatch({
              type: _user.USER_LOGIN_SUCCESS,
              payload: data
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            dispatch({
              type: _user.USER_LOGIN_FAIL,
              payload: _context.t0.response && _context.t0.response.data.message ? _context.t0.response.data.message : _context.t0.message
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 11]]);
  };
};

exports.login = login;

var logout = function logout() {
  return function (dispatch) {
    localStorage.removeItem('userInfo');
    dispatch({
      type: _user.USER_LOGOUT
    });
  };
};

exports.logout = logout;

var register = function register(name, email, password) {
  return function _callee2(dispatch) {
    var config, _ref2, data;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            dispatch({
              type: _user.USER_REGISTER_REQUEST
            });
            config = {
              headers: {
                'content-Type': 'application/json'
              }
            };
            _context2.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].post('/api/register', {
              name: name,
              email: email,
              password: password
            }, config));

          case 5:
            _ref2 = _context2.sent;
            data = _ref2.data;
            dispatch({
              type: _user.USER_REGISTER_SUCCESS,
              payload: data
            }); // after register then login

            dispatch({
              type: _user.USER_LOGIN_SUCCESS,
              payload: data
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            dispatch({
              type: _user.USER_REGISTER_FAIL,
              payload: _context2.t0.response && _context2.t0.response.data.message ? _context2.t0.response.data.message : _context2.t0.message
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 12]]);
  };
};

exports.register = register;