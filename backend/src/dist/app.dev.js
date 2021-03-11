"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./env.js");

require("./mongoose.js");

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("./routes/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import env and config
// import libs
var app = (0, _express["default"])(); // set router

(0, _index["default"])(app);
app.set('port', process.env.PORT || 5000);
var _default = app;
exports["default"] = _default;