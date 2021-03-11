"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductDetail = exports.ListProduct = void 0;

var _productModel = require("../../models/productModel.js");

var _logger = require("../../utils/logger.js");

var ListProduct = function ListProduct() {
  var filter,
      response,
      products,
      _args = arguments;
  return regeneratorRuntime.async(function ListProduct$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          filter = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          response = {
            status: 200,
            message: 'Showing list Product',
            data: {}
          };
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(_productModel.Product.find(filter));

        case 5:
          products = _context.sent;
          response.data = products || [];

          _logger.logger.success('Get List success'); // logger.log(products)


          _context.next = 15;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](2);

          _logger.logger.fail(_context.t0.message);

          response.status = 500;
          response.message = _context.t0.message;

        case 15:
          return _context.abrupt("return", response);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 10]]);
};

exports.ListProduct = ListProduct;

var ProductDetail = function ProductDetail(id) {
  var response, products;
  return regeneratorRuntime.async(function ProductDetail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          response = {
            status: 200,
            message: 'Showing Detail Product',
            data: {}
          };
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_productModel.Product.findById(id));

        case 4:
          products = _context2.sent;
          response.data = products || [];
          console.log('----products', products);

          if (products) {
            _logger.logger.success('Get Detail Product Success');

            _logger.logger.log(products);
          }

          _context2.next = 15;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);

          _logger.logger.fail(_context2.t0.message);

          response.status = 500;
          response.message = _context2.t0.message;

        case 15:
          return _context2.abrupt("return", response);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

exports.ProductDetail = ProductDetail;