'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _global = require('global');

var _global2 = _interopRequireDefault(_global);

var _createHandler = require('./createHandler');

var _createHandler2 = _interopRequireDefault(_createHandler);

var _MockXMLHttpRequest = require('./MockXMLHttpRequest');

var _MockXMLHttpRequest2 = _interopRequireDefault(_MockXMLHttpRequest);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var realXHR = _global2.default.XMLHttpRequest;
var mockXHR = _MockXMLHttpRequest2.default;

var XHRMock = {
  /**
   * Replace the native XHR with the mock XHR and remove any handlers
   * @returns {XHRMock}
   */
  setup: function setup() {
    _global2.default.XMLHttpRequest = mockXHR;
    this.reset();
    return this;
  },

  /**
   * Restore the native XHR and remove any handlers
   * @returns {XHRMock}
   */
  teardown: function teardown() {
    this.reset();
    _global2.default.XMLHttpRequest = realXHR;
    return this;
  },

  /**
   * Remove any handlers
   * @returns {XHRMock}
   */
  reset: function reset() {
    _MockXMLHttpRequest2.default.removeAllHandlers();
    return this;
  },

  /**
   * Mock a request
   * @param   {string}    [method]
   * @param   {string}    [url]
   * @param   {Function}  fn
   * @returns {XHRMock}
   */
  mock: function mock(method, url, fn) {
    var handler =
      arguments.length === 3
        ? (0, _createHandler2.default)(method, url, fn)
        : method;
    _MockXMLHttpRequest2.default.addHandler(handler);
    return this;
  },

  /**
   * Mock a GET request
   * @param   {String}    url
   * @param   {Function}  fn
   * @returns {XHRMock}
   */
  get: function get(url, fn) {
    return this.mock('GET', url, fn);
  },

  /**
   * Mock a POST request
   * @param   {String}    url
   * @param   {Function}  fn
   * @returns {XHRMock}
   */
  post: function post(url, fn) {
    return this.mock('POST', url, fn);
  },

  /**
   * Mock a PUT request
   * @param   {String}    url
   * @param   {Function}  fn
   * @returns {XHRMock}
   */
  put: function put(url, fn) {
    return this.mock('PUT', url, fn);
  },

  /**
   * Mock a PATCH request
   * @param   {String}    url
   * @param   {Function}  fn
   * @returns {XHRMock}
   */
  patch: function patch(url, fn) {
    return this.mock('PATCH', url, fn);
  },

  /**
   * Mock a DELETE request
   * @param   {String}    url
   * @param   {Function}  fn
   * @returns {XHRMock}
   */
  delete: function _delete(url, fn) {
    return this.mock('DELETE', url, fn);
  }
};

exports.default = XHRMock;
