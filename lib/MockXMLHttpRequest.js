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

var _MockRequest = require('./MockRequest');

var _MockRequest2 = _interopRequireDefault(_MockRequest);

var _MockResponse = require('./MockResponse');

var _MockResponse2 = _interopRequireDefault(_MockResponse);

var _MockEventTarget2 = require('./MockEventTarget');

var _MockEventTarget3 = _interopRequireDefault(_MockEventTarget2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var notImplementedError = new Error(
  "This feature hasn't been implmented yet. Please submit an Issue or Pull Request on Github."
);

//https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
//http://www.w3.org/TR/2006/WD-XMLHttpRequest-20060405/
// https://xhr.spec.whatwg.org/

var FORBIDDEN_METHODS = ['CONNECT', 'TRACE', 'TRACK'];

var MockXMLHttpRequest = (function(_MockEventTarget) {
  _inherits(MockXMLHttpRequest, _MockEventTarget);

  _createClass(MockXMLHttpRequest, null, [
    {
      key: 'addHandler',

      /**
     * Add a request handler
     * @param   {function(MockRequest, MockResponse)} fn
     * @returns {void}
     */
      value: function addHandler(fn) {
        this.handlers.push(fn);
      }

      /**
     * Remove a request handler
     * @param   {function(MockRequest, MockResponse)} fn
     * @returns {void}
     */

      /** @private */
    },
    {
      key: 'removeHandler',
      value: function removeHandler(fn) {
        throw notImplementedError;
      }

      /**
     * Remove all request handlers
     * @returns {void}
     */
    },
    {
      key: 'removeAllHandlers',
      value: function removeAllHandlers() {
        this.handlers = [];
      }

      //some libraries (like Mixpanel) use the presence of this field to check if XHR is properly supported
      // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials

      /** @private */

      /** @private */

      /** @private */
    }
  ]);

  function MockXMLHttpRequest() {
    _classCallCheck(this, MockXMLHttpRequest);

    var _this = _possibleConstructorReturn(
      this,
      (MockXMLHttpRequest.__proto__ ||
        Object.getPrototypeOf(MockXMLHttpRequest))
        .call(this)
    );

    _this.timeout = 0;
    _this.withCredentials = false;

    _this._reset();
    return _this;
  }

  /** @private */

  _createClass(MockXMLHttpRequest, [
    {
      key: '_reset',
      value: function _reset() {
        this.upload = new _MockEventTarget3.default();
        this.status = 0;
        this.statusText = '';
        this.response = '';
        this.responseType = '';
        this.responseText = '';
        this.responseXML = null;

        this._request = new _MockRequest2.default(this.upload);
        this._response = new _MockResponse2.default(this);
        this._readyState = MockXMLHttpRequest.UNSENT;
      }
    },
    {
      key: 'getAllResponseHeaders',
      value: function getAllResponseHeaders() {
        if (this.readyState < MockXMLHttpRequest.HEADERS_RECEIVED) {
          return '';
        }

        var headers = this._response.headers();
        var result = Object.keys(headers)
          .map(function(name) {
            return name + ': ' + headers[name] + '\r\n';
          })
          .join('');

        return result;
      }
    },
    {
      key: 'getResponseHeader',
      value: function getResponseHeader(name) {
        if (this.readyState < MockXMLHttpRequest.HEADERS_RECEIVED) {
          return null;
        }

        return this._response.header(name);
      }
    },
    {
      key: 'setRequestHeader',
      value: function setRequestHeader(name, value) {
        if (this.readyState < MockXMLHttpRequest.OPENED) {
          throw new Error('xhr-mock: request must be OPENED.');
        }

        this._request.header(name, value);
      }
    },
    {
      key: 'overrideMimeType',
      value: function overrideMimeType(mime) {
        throw notImplementedError;
      }

      /**
     * @param method
     * @param url
     * @param [async=true]
     * @param [username=null]
     * @param [password=null]
     */
    },
    {
      key: 'open',
      value: function open(method, url) {
        var async =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : true;
        var username =
          arguments.length > 3 && arguments[3] !== undefined
            ? arguments[3]
            : null;
        var password =
          arguments.length > 4 && arguments[4] !== undefined
            ? arguments[4]
            : null;

        if (!async) {
          throw new Error(
            'xhr-mock: Synchronous requests are not yet supported. Please submit a PR.'
          );
        }

        //check method type
        if (FORBIDDEN_METHODS.indexOf(method) !== -1) {
          throw new Error('xhr-mock: Method ' + method + ' is forbidden.');
        }

        //normalize method
        method = method.toUpperCase();

        //create the full url including the username and password
        var fullURL = new _urlParse2.default(url, {protocol: ''});
        fullURL.set('username', username);
        fullURL.set('password', password);

        this._reset();
        this._async = async;
        this._request.method(method).url(fullURL).header('accept', '*/*');

        this.readyState = MockXMLHttpRequest.OPENED;
      }

      /**
     * Handle a request
     * @private
     * @returns {Promise<MockResponse|null>}
     */
    },
    {
      key: '_handleRequest',
      value: function _handleRequest() {
        for (var i = 0; i < MockXMLHttpRequest.handlers.length; ++i) {
          try {
            var result = MockXMLHttpRequest.handlers[i](
              this._request,
              this._response
            );

            if (result) {
              return Promise.resolve(result);
            }
          } catch (error) {
            return Promise.reject(error);
          }
        }

        return Promise.reject(
          new Error('xhr-mock: No XHR handler returned a response.')
        );
      }
    },
    {
      key: 'send',
      value: function send() {
        var _this2 = this;

        var body =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : null;

        //readyState must be opened
        if (this.readyState !== MockXMLHttpRequest.OPENED) {
          throw new Error('xhr-mock: Please call .open() before .send().');
        }

        //body is ignored for GET and HEAD requests
        if (
          this._request.method() === 'get' ||
          this._request.method() === 'head'
        ) {
          body = null;
        }

        //TODO: extract body and content-type https://fetch.spec.whatwg.org/#concept-bodyinit-extract
        this._request.body(body);

        //dispatch a timeout event if we haven't received a response in the specified amount of time
        // - we actually wait for the timeout amount of time because many packages like jQuery and Superagent
        // use setTimeout() to artificially detect a timeout rather than using the native timeout event
        //TODO: handle timeout being changed mid-request
        if (this.timeout) {
          this._timeoutTimer = setTimeout(function() {
            _this2.readyState = MockXMLHttpRequest.DONE;
            _this2.dispatchEvent('timeout');
          }, this.timeout);
        }

        //indicate the request has started being sent
        this.dispatchEvent('loadstart');
        if (body) {
          this.upload.dispatchEvent('loadstart');
        }

        //indicate request progress
        if (body) {
          var _lengthComputable = true;
          var _total = body ? body.length : 0;
          this.upload.dispatchEvent({
            type: 'progress',
            lengthComputable: _lengthComputable,
            loaded: 0,
            total: _total
          });
        }

        this._handleRequest().then(
          function(res) {
            //we've got a response before the timeout period so we don't want to timeout
            clearTimeout(_this2._timeoutTimer);

            //TODO: check if we've been aborted

            //indicate the request body has been fully sent
            if (body) {
              _this2.upload.dispatchEvent({
                type: 'progress',
                lengthComputable: lengthComputable,
                loaded: total,
                total: total
              });
              _this2.upload.dispatchEvent('load');
              _this2.upload.dispatchEvent('loadend');
            }

            //set the response headers on the XHR object
            _this2._response = res;
            _this2.status = res.status();
            _this2.statusText = res.reason();
            _this2.responseType = 'text';
            _this2.readyState = MockXMLHttpRequest.HEADERS_RECEIVED;

            //set the response body on the XHR object (note: it should only be partial data here)
            _this2.response = res.body(); //TODO: detect an object and return JSON, detect XML and return XML
            _this2.responseText = String(res.body());
            _this2.readyState = MockXMLHttpRequest.LOADING;

            //indicate response progress
            //FIXME: response.progress() shouldn't be called before here
            var lengthComputable = Boolean(res.header('content-length'));
            var total = res.header('content-length') || 0;
            _this2.dispatchEvent({
              type: 'progress',
              lengthComputable: lengthComputable,
              loaded: 0,
              total: total
            });
            //FIXME: allow user to specify custom progress here
            _this2.dispatchEvent({
              type: 'progress',
              lengthComputable: lengthComputable,
              loaded: res.body() ? res.body().length : 0,
              total: total
            });

            //indicate the response has been fully received
            _this2.readyState = MockXMLHttpRequest.DONE;
            _this2.dispatchEvent('load');
            _this2.dispatchEvent('loadend');
          },
          function(error) {
            //we've got a response before the timeout period so we don't want to timeout
            clearTimeout(_this2._timeoutTimer);

            _this2.readyState = MockXMLHttpRequest.DONE;
            _this2.dispatchEvent({type: 'error', error: error});
          }
        );
      }
    },
    {
      key: 'abort',
      value: function abort() {
        //FIXME: according to spec

        //we've cancelling the response before the timeout period so we don't want to timeout
        clearTimeout(this._timeoutTimer);

        if (
          this.readyState > MockXMLHttpRequest.OPENED &&
          this.readyState < MockXMLHttpRequest.DONE
        ) {
          // this.readyState = MockXMLHttpRequest.UNSENT; //FIXME
          this.upload.dispatchEvent('abort');
          this.dispatchEvent('abort');
        }
      }
    },
    {
      key: 'readyState',
      get: function get() {
        return this._readyState;
      },
      set: function set(value) {
        this._readyState = value;
        this.dispatchEvent('readystatechange');
      }
    }
  ]);

  return MockXMLHttpRequest;
})(_MockEventTarget3.default);

MockXMLHttpRequest.UNSENT = 0;
MockXMLHttpRequest.OPENED = 1;
MockXMLHttpRequest.HEADERS_RECEIVED = 2;
MockXMLHttpRequest.LOADING = 3;
MockXMLHttpRequest.DONE = 4;
MockXMLHttpRequest.handlers = [];
exports.default = MockXMLHttpRequest;
