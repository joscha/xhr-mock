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

var MockEvent = function MockEvent(type) {
  _classCallCheck(this, MockEvent);

  this.type = type;
};

var MockEventTarget = (function() {
  function MockEventTarget() {
    _classCallCheck(this, MockEventTarget);

    this._listeners = {};
  }

  _createClass(MockEventTarget, [
    {
      key: 'addEventListener',
      value: function addEventListener(type, listener) {
        //TODO: support once

        if (!this._listeners[type]) {
          this._listeners[type] = [];
        }

        if (this._listeners[type].indexOf(listener) === -1) {
          this._listeners[type].push(listener);
        }
      }
    },
    {
      key: 'removeEventListener',
      value: function removeEventListener(type, listener) {
        if (!this._listeners[type]) {
          return;
        }

        var index = this._listeners[type].indexOf(listener);
        if (index !== -1) {
          this._listeners[type].splice(index, 1);
        }
      }
    },
    {
      key: 'dispatchEvent',
      value: function dispatchEvent(event) {
        var _this = this;

        if (typeof event === 'string') {
          event = {type: event};
        }

        //set the event target
        event.target = this;
        event.currentTarget = this;

        //call any built-in listeners
        if (this['on' + event.type]) {
          this['on' + event.type](event);
        }

        if (!this._listeners[event.type]) {
          return;
        }

        this._listeners[event.type].forEach(function(listener) {
          return listener.call(_this, event);
        });
      }
    }
  ]);

  return MockEventTarget;
})();

exports.default = MockEventTarget;
