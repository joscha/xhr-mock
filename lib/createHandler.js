'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

/**
 * Mock a request
 * @param   {string}    [method]
 * @param   {string}    [url]
 * @param   {Function}  fn
 * @returns {Function}
 */
exports.default = function(method, url, fn) {
  var matches = function matches(req) {
    var requestMethod = req.method();
    var requestURL = req.url().toString();

    if (requestMethod.toUpperCase() !== method.toUpperCase()) {
      return false;
    }

    if (url instanceof RegExp) {
      return url.test(requestURL);
    }

    return requestURL === url;
  };

  return function(req, res) {
    if (matches(req)) {
      return fn(req, res);
    } else {
      return false;
    }
  };
};
