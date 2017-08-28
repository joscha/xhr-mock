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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var MockResponse = (function() {
  /** @private */

  /** @private */
  function MockResponse(events) {
    _classCallCheck(this, MockResponse);

    this._status = -1;
    this._reason = '';
    this._headers = {};
    this._body = '';
    this._target = null;

    this._target = events;
  }

  /**
   * Get/set the HTTP status code
   * @param   {number} [status]
   * @returns {MockResponse|number}
   */

  /** @private */

  /** @private */

  /** @private */

  _createClass(MockResponse, [
    {
      key: 'status',
      value: function status(_status) {
        if (arguments.length) {
          this._status = _status;
          return this;
        } else {
          return this._status;
        }
      }

      /**
     * Get/set the HTTP reason reason
     * @param   {string} [reason]
     * @returns {MockResponse|string}
     */
    },
    {
      key: 'reason',
      value: function reason(_reason) {
        if (arguments.length) {
          this._reason = _reason;
          return this;
        } else {
          return this._reason;
        }
      }

      /**
     * Get/set a HTTP header
     * @param   {string} name
     * @param   {string} [value]
     * @returns {MockResponse|string|null}
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
     * @returns {MockResponse|object}
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
     * Get/set the HTTP body content
     * @param   {string} [body]
     * @returns {MockResponse|string}
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
     * Trigger response progress event
     * @param   {number} [loaded]
     * @param   {number} [total]
     * @param   {boolean} [lengthComputable]
     * @returns {MockResponse}
     */
    },
    {
      key: 'progress',
      value: function progress(loaded, total, lengthComputable) {
        this._target.dispatchEvent({
          type: 'progress',
          lengthComputable: lengthComputable || true,
          loaded: loaded || 0,
          total: total || 0
        });
        return this;
      }
    }
  ]);

  return MockResponse;
})();

exports.default = MockResponse;
