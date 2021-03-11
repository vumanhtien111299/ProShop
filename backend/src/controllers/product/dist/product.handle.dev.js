"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductsDetail = exports.List = void 0;

var product = _interopRequireWildcard(require("./product.process.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var List = function List(req, res) {
  var _ref, data, status;

  return regeneratorRuntime.async(function List$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(product.ListProduct());

        case 2:
          _ref = _context.sent;
          data = _ref.data;
          status = _ref.status;
          return _context.abrupt("return", res.status(status).send(data));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.List = List;

var ProductsDetail = function ProductsDetail(req, res) {
  var _ref2, data, status;

  return regeneratorRuntime.async(function ProductsDetail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(product.ProductDetail(req.params.id));

        case 2:
          _ref2 = _context2.sent;
          data = _ref2.data;
          status = _ref2.status;
          return _context2.abrupt("return", res.status(status).send(data));

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.ProductsDetail = ProductsDetail;