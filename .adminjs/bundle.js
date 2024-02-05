(function (React, styledComponents, designSystem, adminjs) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return exports;
    };
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function (method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method,
        method = delegate.iterator[methodName];
      if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var ImageUploadButton = function ImageUploadButton() {
    var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      selectedImage = _useState2[0],
      setSelectedImage = _useState2[1];
    var handleImageChange = function handleImageChange(event) {
      var file = event.target.files[0];
      // You can perform additional validation or processing here if needed

      setSelectedImage(file);
    };
    var handleUpload = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var formData, currentUrl, currentUrlParts, postUrl, response, responseData;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // You can implement the logic to upload the selectedImage here
              console.log("Upload logic goes here:", selectedImage);
              _context.prev = 1;
              formData = new FormData();
              formData.append('image', selectedImage);
              currentUrl = window.location.href;
              currentUrlParts = currentUrl.split('/');
              postUrl = currentUrlParts.slice(0, currentUrlParts.length - 1).join('/') + '/homepage';
              console.log(postUrl);
              _context.next = 10;
              return fetch(postUrl, {
                method: 'POST',
                body: formData
              });
            case 10:
              response = _context.sent;
              if (!response.ok) {
                _context.next = 18;
                break;
              }
              _context.next = 14;
              return response.json();
            case 14:
              responseData = _context.sent;
              console.log('Image uploaded successfully:', responseData);
              _context.next = 19;
              break;
            case 18:
              console.error('Error uploading image:', response.statusText);
            case 19:
              _context.next = 24;
              break;
            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](1);
              console.error('Error uploading image:', _context.t0);
            case 24:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 21]]);
      }));
      return function handleUpload() {
        return _ref.apply(this, arguments);
      };
    }();
    return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("input", {
      type: "file",
      accept: "image/*",
      onChange: handleImageChange
    }), /*#__PURE__*/React__default["default"].createElement("button", {
      onClick: handleUpload
    }, "Upload Image"), selectedImage && /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("p", null, "Selected Image:"), /*#__PURE__*/React__default["default"].createElement("img", {
      src: URL.createObjectURL(selectedImage),
      alt: "Selected",
      style: {
        maxWidth: '100%',
        maxHeight: '200px'
      }
    })));
  };
  var Dashboard = function Dashboard() {
    var _useTranslation2 = adminjs.useTranslation();
      _useTranslation2.translateMessage;
      _useTranslation2.translateButton;
    return /*#__PURE__*/React__default["default"].createElement(designSystem.Box, null, /*#__PURE__*/React__default["default"].createElement("section", {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "32px"
      }
    }, /*#__PURE__*/React__default["default"].createElement("p", {
      style: {
        // fontSize: "3rem",
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      style: {
        fontSize: "3rem",
        fontWeight: "700"
      }
    }, "OneStop"), /*#__PURE__*/React__default["default"].createElement("span", {
      style: {
        fontSize: "3rem",
        fontWeight: "normal",
        color: "#282828"
      }
    }, " ", "Admin"))), /*#__PURE__*/React__default["default"].createElement(ImageUploadButton, null));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Dashboard = Dashboard;

})(React, styled, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9hZG1pbl9wYW5lbC91aS9wYWdlcy9kYXNoYm9hcmQuanN4IiwiLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge3VzZVN0YXRlfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHN0eWxlZCBmcm9tIFwic3R5bGVkLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IHtcclxuICAgIEJveCxcclxuICAgIEgyLFxyXG4gICAgSDUsXHJcbiAgICBINCxcclxuICAgIFRleHQsXHJcbiAgICBJbGx1c3RyYXRpb24sXHJcbiAgICBJbGx1c3RyYXRpb25Qcm9wcyxcclxuICAgIEJ1dHRvbixcclxufSBmcm9tIFwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO1xyXG5cclxuaW1wb3J0IHsgdXNlVHJhbnNsYXRpb24gfSBmcm9tIFwiYWRtaW5qc1wiO1xyXG5cclxuY29uc3QgcGFnZUhlYWRlckhlaWdodCA9IDI4NDtcclxuY29uc3QgcGFnZUhlYWRlclBhZGRpbmdZID0gNzQ7XHJcbmNvbnN0IHBhZ2VIZWFkZXJQYWRkaW5nWCA9IDI1MDtcclxuXHJcbmNvbnN0IEltYWdlVXBsb2FkQnV0dG9uID0gKCkgPT4ge1xyXG4gICAgY29uc3QgW3NlbGVjdGVkSW1hZ2UsIHNldFNlbGVjdGVkSW1hZ2VdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgXHJcbiAgICBjb25zdCBoYW5kbGVJbWFnZUNoYW5nZSA9IChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzWzBdO1xyXG4gICAgICAvLyBZb3UgY2FuIHBlcmZvcm0gYWRkaXRpb25hbCB2YWxpZGF0aW9uIG9yIHByb2Nlc3NpbmcgaGVyZSBpZiBuZWVkZWRcclxuICBcclxuICAgICAgc2V0U2VsZWN0ZWRJbWFnZShmaWxlKTtcclxuICAgIH07XHJcbiAgXHJcbiAgICBjb25zdCBoYW5kbGVVcGxvYWQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIC8vIFlvdSBjYW4gaW1wbGVtZW50IHRoZSBsb2dpYyB0byB1cGxvYWQgdGhlIHNlbGVjdGVkSW1hZ2UgaGVyZVxyXG4gICAgICBjb25zb2xlLmxvZyhcIlVwbG9hZCBsb2dpYyBnb2VzIGhlcmU6XCIsIHNlbGVjdGVkSW1hZ2UpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdpbWFnZScsIHNlbGVjdGVkSW1hZ2UpO1xyXG5cclxuICAgICAgICBjb25zdCBjdXJyZW50VXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFVybFBhcnRzID0gY3VycmVudFVybC5zcGxpdCgnLycpO1xyXG4gICAgICAgIGNvbnN0IHBvc3RVcmwgPSBjdXJyZW50VXJsUGFydHMuc2xpY2UoMCwgY3VycmVudFVybFBhcnRzLmxlbmd0aCAtIDEpLmpvaW4oJy8nKSArICcvaG9tZXBhZ2UnO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBvc3RVcmwpO1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocG9zdFVybCwge1xyXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICBib2R5OiBmb3JtRGF0YSxcclxuICAgICAgICB9KTtcclxuICBcclxuICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdJbWFnZSB1cGxvYWRlZCBzdWNjZXNzZnVsbHk6JywgcmVzcG9uc2VEYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgdXBsb2FkaW5nIGltYWdlOicsIHJlc3BvbnNlLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB1cGxvYWRpbmcgaW1hZ2U6JywgZXJyb3IpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuICBcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgICBhY2NlcHQ9XCJpbWFnZS8qXCJcclxuICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbWFnZUNoYW5nZX1cclxuICAgICAgICAvPlxyXG4gICAgICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlVXBsb2FkfT5VcGxvYWQgSW1hZ2U8L2J1dHRvbj5cclxuICBcclxuICAgICAgICB7c2VsZWN0ZWRJbWFnZSAmJiAoXHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8cD5TZWxlY3RlZCBJbWFnZTo8L3A+XHJcbiAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICBzcmM9e1VSTC5jcmVhdGVPYmplY3RVUkwoc2VsZWN0ZWRJbWFnZSl9XHJcbiAgICAgICAgICAgICAgYWx0PVwiU2VsZWN0ZWRcIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7IG1heFdpZHRoOiAnMTAwJScsIG1heEhlaWdodDogJzIwMHB4JyB9fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG5leHBvcnQgY29uc3QgRGFzaGJvYXJkSGVhZGVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyB0cmFuc2xhdGVNZXNzYWdlIH0gPSB1c2VUcmFuc2xhdGlvbigpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Qm94IG10PVwiMjBweFwiIHB4PVwiMjBweFwiPlxyXG4gICAgICAgICAgICA8SDI+V2VsY29tZSwgQWRtaW48L0gyPlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBEYXNoYm9hcmQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IHRyYW5zbGF0ZU1lc3NhZ2UsIHRyYW5zbGF0ZUJ1dHRvbiB9ID0gdXNlVHJhbnNsYXRpb24oKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJveD5cclxuICAgICAgICAgICAgICAgIDxzZWN0aW9uXHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6XCJmbGV4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6XCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOlwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOlwiMzJweFwiXHJcbiAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgIDxwIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9udFNpemU6IFwiM3JlbVwiLFxyXG4gICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIzcmVtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDpcIjcwMFwiXHJcbiAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICBPbmVTdG9wIFxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIzcmVtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6XCJub3JtYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6XCIjMjgyODI4XCJcclxuICAgICAgICAgICAgICAgICAgICB9fT57XCIgXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgQWRtaW5cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICAgICAgPEltYWdlVXBsb2FkQnV0dG9uIC8+XHJcblxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDsiLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi4vYWRtaW5fcGFuZWwvdWkvcGFnZXMvZGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmQiXSwibmFtZXMiOlsiSW1hZ2VVcGxvYWRCdXR0b24iLCJfdXNlU3RhdGUiLCJ1c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInNlbGVjdGVkSW1hZ2UiLCJzZXRTZWxlY3RlZEltYWdlIiwiaGFuZGxlSW1hZ2VDaGFuZ2UiLCJldmVudCIsImZpbGUiLCJ0YXJnZXQiLCJmaWxlcyIsImhhbmRsZVVwbG9hZCIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsImZvcm1EYXRhIiwiY3VycmVudFVybCIsImN1cnJlbnRVcmxQYXJ0cyIsInBvc3RVcmwiLCJyZXNwb25zZSIsInJlc3BvbnNlRGF0YSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJjb25zb2xlIiwibG9nIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJzcGxpdCIsInNsaWNlIiwibGVuZ3RoIiwiam9pbiIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsInNlbnQiLCJvayIsImpzb24iLCJlcnJvciIsInN0YXR1c1RleHQiLCJ0MCIsInN0b3AiLCJhcHBseSIsImFyZ3VtZW50cyIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJhY2NlcHQiLCJvbkNoYW5nZSIsIm9uQ2xpY2siLCJzcmMiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJhbHQiLCJzdHlsZSIsIm1heFdpZHRoIiwibWF4SGVpZ2h0IiwiRGFzaGJvYXJkIiwiX3VzZVRyYW5zbGF0aW9uMiIsInVzZVRyYW5zbGF0aW9uIiwidHJhbnNsYXRlTWVzc2FnZSIsInRyYW5zbGF0ZUJ1dHRvbiIsIkJveCIsImRpc3BsYXkiLCJqdXN0aWZ5Q29udGVudCIsImFsaWduSXRlbXMiLCJtYXJnaW5Ub3AiLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJjb2xvciIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQW1CQSxJQUFNQSxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQWlCQSxHQUFTO0VBQzVCLEVBQUEsSUFBQUMsU0FBQSxHQUEwQ0MsY0FB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
