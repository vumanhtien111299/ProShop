"use strict";

var _app = _interopRequireDefault(require("./src/app.js"));

var _logger = require("./src/utils/logger.js");

var _errorMiddleware = require("./src/middleware/errorMiddleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_app["default"].use(_errorMiddleware.notFound);

_app["default"].use(_errorMiddleware.errorHandler);

var PORT = _app["default"].get('port');

_app["default"].listen(PORT, function () {
  _logger.logger.success("Server running in ".concat(process.env.NODE_ENV, " on port ").concat(PORT));
});