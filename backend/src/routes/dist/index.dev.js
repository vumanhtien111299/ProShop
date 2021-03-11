"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _productRoutes = _interopRequireDefault(require("./product.routes.js"));

var _userRoutes = _interopRequireDefault(require("./user.routes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var _default = function _default(app) {
  // Prefix path
  app.use('/api', router);
  router.get('/', function (res, req) {
    return res.send('Hello');
  }); // Product routes

  (0, _productRoutes["default"])(router); //User routes

  (0, _userRoutes["default"])(router);
};

exports["default"] = _default;