'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var MockRequest = (function() {
  /** @private */

  /** @private */
  function MockRequest(events) {
    _classCallCheck(this, MockRequest);

    this._method = '';
    this._url = null;
    this._headers = {};
    this._body = null;
    this._events = null;

    this._events = events;
  }

  /**
   * Get/set the HTTP method
   * @param string [method]
   * @returns {MockRequest|string}
   */

  /** @private */

  /** @private */

  /** @private */

  _createClass(MockRequest, [
    {
      key: 'method',
      value: function method(_method) {
        if (arguments.length) {
          this._method = _method;
          return this;
        } else {
          return this._method;
        }
      }

      /**
     * Get/set the HTTP URL
     * @param string [url]
     * @returns {MockRequest|URL|null}
     */
    },
    {
      key: 'url',
      value: function url(_url) {
        if (arguments.length) {
          this._url = _url
            ? new _urlParse2.default(_url, {protocol: ''}, true)
            : null;
          return this;
        } else {
          return this._url;
        }
      }

      /**
     * Get/set a HTTP header
     * @param   {string} name
     * @param   {string} [value]
     * @returns {MockRequest|string|null}
     */
    },
    {
      key: 'header',
      value: function header(name, value) {
        if (arguments.length === 2) {
          this._headers[name.toLowerCase()] = value;
          return this;
        } else {
          return this._headers[name.toLowerCase()] || null;
        }
      }

      /**
     * Get/set all of the HTTP headers
     * @param   {object} [headers]
     * @returns {MockRequest|object}
     */
    },
    {
      key: 'headers',
      value: function headers(_headers) {
        if (arguments.length) {
          for (var name in _headers) {
            if (_headers.hasOwnProperty(name)) {
              this.header(name, _headers[name]);
            }
          }
          return this;
        } else {
          return this._headers;
        }
      }

      /**
     * Get/set the HTTP body
     * @param   {*} [body]
     * @returns {MockRequest|*}
     */
    },
    {
      key: 'body',
      value: function body(_body) {
        if (arguments.length) {
          this._body = _body;
          return this;
        } else {
          return this._body;
        }
      }

      /**
     * Trigger request progress event
     * @param   {number} [loaded]
     * @param   {number} [total]
     * @param   {boolean} [lengthComputable]
     * @returns {MockResponse}
     */
    },
    {
      key: 'progress',
      value: function progress(loaded, total, lengthComputable) {
        //TODO: consider this signature (put lengthComputable first?)
        this._events.dispatchEvent({
          type: 'progress',
          lengthComputable: lengthComputable || true,
          loaded: loaded || 0,
          total: total || 0
        });
        return this;
      }
    }
  ]);

  return MockRequest;
})();

exports.default = MockRequest;
