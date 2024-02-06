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
    return /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "64px"
      }
    }, /*#__PURE__*/React__default["default"].createElement("input", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9hZG1pbl9wYW5lbC91aS9wYWdlcy9kYXNoYm9hcmQuanN4IiwiLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge3VzZVN0YXRlfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHN0eWxlZCBmcm9tIFwic3R5bGVkLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IHtcclxuICAgIEJveCxcclxuICAgIEgyLFxyXG4gICAgSDUsXHJcbiAgICBINCxcclxuICAgIFRleHQsXHJcbiAgICBJbGx1c3RyYXRpb24sXHJcbiAgICBJbGx1c3RyYXRpb25Qcm9wcyxcclxuICAgIEJ1dHRvbixcclxufSBmcm9tIFwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO1xyXG5cclxuaW1wb3J0IHsgdXNlVHJhbnNsYXRpb24gfSBmcm9tIFwiYWRtaW5qc1wiO1xyXG5cclxuY29uc3QgcGFnZUhlYWRlckhlaWdodCA9IDI4NDtcclxuY29uc3QgcGFnZUhlYWRlclBhZGRpbmdZID0gNzQ7XHJcbmNvbnN0IHBhZ2VIZWFkZXJQYWRkaW5nWCA9IDI1MDtcclxuXHJcbmNvbnN0IEltYWdlVXBsb2FkQnV0dG9uID0gKCkgPT4ge1xyXG4gICAgY29uc3QgW3NlbGVjdGVkSW1hZ2UsIHNldFNlbGVjdGVkSW1hZ2VdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgXHJcbiAgICBjb25zdCBoYW5kbGVJbWFnZUNoYW5nZSA9IChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzWzBdO1xyXG4gICAgICAvLyBZb3UgY2FuIHBlcmZvcm0gYWRkaXRpb25hbCB2YWxpZGF0aW9uIG9yIHByb2Nlc3NpbmcgaGVyZSBpZiBuZWVkZWRcclxuICBcclxuICAgICAgc2V0U2VsZWN0ZWRJbWFnZShmaWxlKTtcclxuICAgIH07XHJcbiAgXHJcbiAgICBjb25zdCBoYW5kbGVVcGxvYWQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIC8vIFlvdSBjYW4gaW1wbGVtZW50IHRoZSBsb2dpYyB0byB1cGxvYWQgdGhlIHNlbGVjdGVkSW1hZ2UgaGVyZVxyXG4gICAgICBjb25zb2xlLmxvZyhcIlVwbG9hZCBsb2dpYyBnb2VzIGhlcmU6XCIsIHNlbGVjdGVkSW1hZ2UpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdpbWFnZScsIHNlbGVjdGVkSW1hZ2UpO1xyXG5cclxuICAgICAgICBjb25zdCBjdXJyZW50VXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFVybFBhcnRzID0gY3VycmVudFVybC5zcGxpdCgnLycpO1xyXG4gICAgICAgIGNvbnN0IHBvc3RVcmwgPSBjdXJyZW50VXJsUGFydHMuc2xpY2UoMCwgY3VycmVudFVybFBhcnRzLmxlbmd0aCAtIDEpLmpvaW4oJy8nKSArICcvaG9tZXBhZ2UnO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBvc3RVcmwpO1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocG9zdFVybCwge1xyXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICBib2R5OiBmb3JtRGF0YSxcclxuICAgICAgICB9KTtcclxuICBcclxuICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdJbWFnZSB1cGxvYWRlZCBzdWNjZXNzZnVsbHk6JywgcmVzcG9uc2VEYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgdXBsb2FkaW5nIGltYWdlOicsIHJlc3BvbnNlLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB1cGxvYWRpbmcgaW1hZ2U6JywgZXJyb3IpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuICBcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICBkaXNwbGF5OlwiZmxleFwiLFxyXG4gICAgICAgIGp1c3RpZnlDb250ZW50OlwiY2VudGVyXCIsXHJcbiAgICAgICAgYWxpZ25JdGVtczpcImNlbnRlclwiLFxyXG4gICAgICAgIG1hcmdpblRvcDpcIjY0cHhcIlxyXG4gICAgICB9fT5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgIHR5cGU9XCJmaWxlXCJcclxuICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxyXG4gICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUltYWdlQ2hhbmdlfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVVcGxvYWR9PlVwbG9hZCBJbWFnZTwvYnV0dG9uPlxyXG4gIFxyXG4gICAgICAgIHtzZWxlY3RlZEltYWdlICYmIChcclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxwPlNlbGVjdGVkIEltYWdlOjwvcD5cclxuICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgIHNyYz17VVJMLmNyZWF0ZU9iamVjdFVSTChzZWxlY3RlZEltYWdlKX1cclxuICAgICAgICAgICAgICBhbHQ9XCJTZWxlY3RlZFwiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgbWF4V2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiAnMjAwcHgnIH19XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBEYXNoYm9hcmRIZWFkZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IHRyYW5zbGF0ZU1lc3NhZ2UgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxCb3ggbXQ9XCIyMHB4XCIgcHg9XCIyMHB4XCI+XHJcbiAgICAgICAgICAgIDxIMj5XZWxjb21lLCBBZG1pbjwvSDI+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IERhc2hib2FyZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgdHJhbnNsYXRlTWVzc2FnZSwgdHJhbnNsYXRlQnV0dG9uIH0gPSB1c2VUcmFuc2xhdGlvbigpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Qm94PlxyXG4gICAgICAgICAgICAgICAgPHNlY3Rpb25cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTpcImZsZXhcIixcclxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDpcImNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6XCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6XCIzMnB4XCJcclxuICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgPHAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAvLyBmb250U2l6ZTogXCIzcmVtXCIsXHJcbiAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjNyZW1cIixcclxuICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OlwiNzAwXCJcclxuICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIE9uZVN0b3AgXHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjNyZW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDpcIm5vcm1hbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjpcIiMyODI4MjhcIlxyXG4gICAgICAgICAgICAgICAgICAgIH19PntcIiBcIn1cclxuICAgICAgICAgICAgICAgICAgICBBZG1pblxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgICAgICA8SW1hZ2VVcGxvYWRCdXR0b24gLz5cclxuXHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkOyIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9hZG1pbl9wYW5lbC91aS9wYWdlcy9kYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRhc2hib2FyZCA9IERhc2hib2FyZCJdLCJuYW1lcyI6WyJJbWFnZVVwbG9hZEJ1dHRvbiIsIl91c2VTdGF0ZSIsInVzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5Iiwic2VsZWN0ZWRJbWFnZSIsInNldFNlbGVjdGVkSW1hZ2UiLCJoYW5kbGVJbWFnZUNoYW5nZSIsImV2ZW50IiwiZmlsZSIsInRhcmdldCIsImZpbGVzIiwiaGFuZGxlVXBsb2FkIiwiX3JlZiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsIm1hcmsiLCJfY2FsbGVlIiwiZm9ybURhdGEiLCJjdXJyZW50VXJsIiwiY3VycmVudFVybFBhcnRzIiwicG9zdFVybCIsInJlc3BvbnNlIiwicmVzcG9uc2VEYXRhIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsImNvbnNvbGUiLCJsb2ciLCJGb3JtRGF0YSIsImFwcGVuZCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInNwbGl0Iiwic2xpY2UiLCJsZW5ndGgiLCJqb2luIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5Iiwic2VudCIsIm9rIiwianNvbiIsImVycm9yIiwic3RhdHVzVGV4dCIsInQwIiwic3RvcCIsImFwcGx5IiwiYXJndW1lbnRzIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJkaXNwbGF5IiwianVzdGlmeUNvbnRlbnQiLCJhbGlnbkl0ZW1zIiwibWFyZ2luVG9wIiwidHlwZSIsImFjY2VwdCIsIm9uQ2hhbmdlIiwib25DbGljayIsInNyYyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImFsdCIsIm1heFdpZHRoIiwibWF4SGVpZ2h0IiwiRGFzaGJvYXJkIiwiX3VzZVRyYW5zbGF0aW9uMiIsInVzZVRyYW5zbGF0aW9uIiwidHJhbnNsYXRlTWVzc2FnZSIsInRyYW5zbGF0ZUJ1dHRvbiIsIkJveCIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsImNvbG9yIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBbUJBLElBQU1BLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBaUJBLEdBQVM7RUFDNUIsRUFBQSxJQUFBQyxTQUFBLEdBQTBDQyxjQUFRLENBQUMsSUFBSSxDQUFDO01BQUFDLFVBQUEsR0FBQUMsY0FBQSxDQUFBSCxTQUFBLEVBQUEsQ0FBQSxDQUFBO0VBQWpESSxJQUFBQSxhQUFhLEdBQUFGLFVBQUEsQ0FBQSxDQUFBLENBQUE7RUFBRUcsSUFBQUEsZ0JBQWdCLEdBQUFILFVBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtFQUV0QyxFQUFBLElBQU1JLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBaUJBLENBQUlDLEtBQUssRUFBSztNQUNuQyxJQUFNQyxJQUFJLEdBQUdELEtBQUssQ0FBQ0UsTUFBTSxDQUFDQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFDbEM7O01BRUFMLGdCQUFnQixDQUFDRyxJQUFJLENBQUMsQ0FBQTtLQUN2QixDQUFBO0VBRUQsRUFBQSxJQUFNRyxZQUFZLGdCQUFBLFlBQUE7TUFBQSxJQUFBQyxJQUFBLEdBQUFDLGlCQUFBLGVBQUFDLG1CQUFBLEVBQUFDLENBQUFBLElBQUEsQ0FBRyxTQUFBQyxPQUFBLEdBQUE7UUFBQSxJQUFBQyxRQUFBLEVBQUFDLFVBQUEsRUFBQUMsZUFBQSxFQUFBQyxPQUFBLEVBQUFDLFFBQUEsRUFBQUMsWUFBQSxDQUFBO0VBQUEsTUFBQSxPQUFBUixtQkFBQSxFQUFBLENBQUFTLElBQUEsQ0FBQSxTQUFBQyxTQUFBQyxRQUFBLEVBQUE7RUFBQSxRQUFBLE9BQUEsQ0FBQSxFQUFBLFFBQUFBLFFBQUEsQ0FBQUMsSUFBQSxHQUFBRCxRQUFBLENBQUFFLElBQUE7RUFBQSxVQUFBLEtBQUEsQ0FBQTtFQUNuQjtFQUNBQyxZQUFBQSxPQUFPLENBQUNDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRXpCLGFBQWEsQ0FBQyxDQUFBO0VBQUNxQixZQUFBQSxRQUFBLENBQUFDLElBQUEsR0FBQSxDQUFBLENBQUE7RUFFOUNULFlBQUFBLFFBQVEsR0FBRyxJQUFJYSxRQUFRLEVBQUUsQ0FBQTtFQUMvQmIsWUFBQUEsUUFBUSxDQUFDYyxNQUFNLENBQUMsT0FBTyxFQUFFM0IsYUFBYSxDQUFDLENBQUE7RUFFakNjLFlBQUFBLFVBQVUsR0FBR2MsTUFBTSxDQUFDQyxRQUFRLENBQUNDLElBQUksQ0FBQTtFQUNqQ2YsWUFBQUEsZUFBZSxHQUFHRCxVQUFVLENBQUNpQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7RUFDdkNmLFlBQUFBLE9BQU8sR0FBR0QsZUFBZSxDQUFDaUIsS0FBSyxDQUFDLENBQUMsRUFBRWpCLGVBQWUsQ0FBQ2tCLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQTtFQUM1RlYsWUFBQUEsT0FBTyxDQUFDQyxHQUFHLENBQUNULE9BQU8sQ0FBQyxDQUFBO0VBQUNLLFlBQUFBLFFBQUEsQ0FBQUUsSUFBQSxHQUFBLEVBQUEsQ0FBQTtjQUFBLE9BQ0VZLEtBQUssQ0FBQ25CLE9BQU8sRUFBRTtFQUNwQ29CLGNBQUFBLE1BQU0sRUFBRSxNQUFNO0VBQ2RDLGNBQUFBLElBQUksRUFBRXhCLFFBQUFBO0VBQ1IsYUFBQyxDQUFDLENBQUE7RUFBQSxVQUFBLEtBQUEsRUFBQTtjQUhJSSxRQUFRLEdBQUFJLFFBQUEsQ0FBQWlCLElBQUEsQ0FBQTtjQUFBLElBS1ZyQixDQUFBQSxRQUFRLENBQUNzQixFQUFFLEVBQUE7RUFBQWxCLGNBQUFBLFFBQUEsQ0FBQUUsSUFBQSxHQUFBLEVBQUEsQ0FBQTtFQUFBLGNBQUEsTUFBQTtFQUFBLGFBQUE7RUFBQUYsWUFBQUEsUUFBQSxDQUFBRSxJQUFBLEdBQUEsRUFBQSxDQUFBO0VBQUEsWUFBQSxPQUNjTixRQUFRLENBQUN1QixJQUFJLEVBQUUsQ0FBQTtFQUFBLFVBQUEsS0FBQSxFQUFBO2NBQXBDdEIsWUFBWSxHQUFBRyxRQUFBLENBQUFpQixJQUFBLENBQUE7RUFDbEJkLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDhCQUE4QixFQUFFUCxZQUFZLENBQUMsQ0FBQTtFQUFDRyxZQUFBQSxRQUFBLENBQUFFLElBQUEsR0FBQSxFQUFBLENBQUE7RUFBQSxZQUFBLE1BQUE7RUFBQSxVQUFBLEtBQUEsRUFBQTtjQUUxREMsT0FBTyxDQUFDaUIsS0FBSyxDQUFDLHdCQUF3QixFQUFFeEIsUUFBUSxDQUFDeUIsVUFBVSxDQUFDLENBQUE7RUFBQyxVQUFBLEtBQUEsRUFBQTtFQUFBckIsWUFBQUEsUUFBQSxDQUFBRSxJQUFBLEdBQUEsRUFBQSxDQUFBO0VBQUEsWUFBQSxNQUFBO0VBQUEsVUFBQSxLQUFBLEVBQUE7RUFBQUYsWUFBQUEsUUFBQSxDQUFBQyxJQUFBLEdBQUEsRUFBQSxDQUFBO2NBQUFELFFBQUEsQ0FBQXNCLEVBQUEsR0FBQXRCLFFBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtjQUcvREcsT0FBTyxDQUFDaUIsS0FBSyxDQUFDLHdCQUF3QixFQUFBcEIsUUFBQSxDQUFBc0IsRUFBTyxDQUFDLENBQUE7RUFBQyxVQUFBLEtBQUEsRUFBQSxDQUFBO0VBQUEsVUFBQSxLQUFBLEtBQUE7Y0FBQSxPQUFBdEIsUUFBQSxDQUFBdUIsSUFBQSxFQUFBLENBQUE7RUFBQSxTQUFBO0VBQUEsT0FBQSxFQUFBaEMsT0FBQSxFQUFBLElBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtPQUdsRCxDQUFBLENBQUEsQ0FBQTtFQUFBLElBQUEsT0FBQSxTQTFCS0wsWUFBWUEsR0FBQTtFQUFBLE1BQUEsT0FBQUMsSUFBQSxDQUFBcUMsS0FBQSxDQUFBLElBQUEsRUFBQUMsU0FBQSxDQUFBLENBQUE7RUFBQSxLQUFBLENBQUE7S0EwQmpCLEVBQUEsQ0FBQTtJQUVELG9CQUNFQyx5QkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLEtBQUssRUFBRTtFQUNWQyxNQUFBQSxPQUFPLEVBQUMsTUFBTTtFQUNkQyxNQUFBQSxjQUFjLEVBQUMsUUFBUTtFQUN2QkMsTUFBQUEsVUFBVSxFQUFDLFFBQVE7RUFDbkJDLE1BQUFBLFNBQVMsRUFBQyxNQUFBO0VBQ1osS0FBQTtLQUNFTixlQUFBQSx5QkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBO0VBQ0VNLElBQUFBLElBQUksRUFBQyxNQUFNO0VBQ1hDLElBQUFBLE1BQU0sRUFBQyxTQUFTO0VBQ2hCQyxJQUFBQSxRQUFRLEVBQUV0RCxpQkFBQUE7RUFBa0IsR0FDN0IsQ0FBQyxlQUNGNkMseUJBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUFRUyxJQUFBQSxPQUFPLEVBQUVsRCxZQUFBQTtFQUFhLEdBQUEsRUFBQyxjQUFvQixDQUFDLEVBRW5EUCxhQUFhLGlCQUNaK0MseUJBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQSxJQUFBLGVBQ0VELHlCQUFBLENBQUFDLGFBQUEsQ0FBRyxHQUFBLEVBQUEsSUFBQSxFQUFBLGlCQUFrQixDQUFDLGVBQ3RCRCx5QkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VVLElBQUFBLEdBQUcsRUFBRUMsR0FBRyxDQUFDQyxlQUFlLENBQUM1RCxhQUFhLENBQUU7RUFDeEM2RCxJQUFBQSxHQUFHLEVBQUMsVUFBVTtFQUNkWixJQUFBQSxLQUFLLEVBQUU7RUFBRWEsTUFBQUEsUUFBUSxFQUFFLE1BQU07RUFBRUMsTUFBQUEsU0FBUyxFQUFFLE9BQUE7RUFBUSxLQUFBO0tBQy9DLENBQ0UsQ0FFSixDQUFDLENBQUE7RUFFVixDQUFDLENBQUE7RUFXSSxJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsR0FBUztFQUMzQixFQUFBLElBQUFDLGdCQUFBLEdBQThDQyxzQkFBYyxFQUFFLENBQUE7TUFBdENELGdCQUFBLENBQWhCRSxnQkFBZ0IsQ0FBQTtNQUFpQkYsZ0JBQUEsQ0FBZkcsZ0JBQWU7SUFDekMsb0JBQ0lyQix5QkFBQSxDQUFBQyxhQUFBLENBQUNxQixnQkFBRyxFQUNJdEIsSUFBQUEsZUFBQUEseUJBQUEsQ0FBQUMsYUFBQSxDQUFBLFNBQUEsRUFBQTtFQUNBQyxJQUFBQSxLQUFLLEVBQUU7RUFDSEMsTUFBQUEsT0FBTyxFQUFDLE1BQU07RUFDZEMsTUFBQUEsY0FBYyxFQUFDLFFBQVE7RUFDdkJDLE1BQUFBLFVBQVUsRUFBQyxRQUFRO0VBQ25CQyxNQUFBQSxTQUFTLEVBQUMsTUFBQTtFQUNkLEtBQUE7S0FDQU4sZUFBQUEseUJBQUEsQ0FBQUMsYUFBQSxDQUFBLEdBQUEsRUFBQTtFQUFHQyxJQUFBQSxLQUFLLEVBQUU7RUFDTjtFQUFBLEtBQUE7S0FFQUYsZUFBQUEseUJBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNQyxJQUFBQSxLQUFLLEVBQUU7RUFDYnFCLE1BQUFBLFFBQVEsRUFBRSxNQUFNO0VBQ2hCQyxNQUFBQSxVQUFVLEVBQUMsS0FBQTtFQUNmLEtBQUE7RUFBRSxHQUFBLEVBQUMsU0FFTyxDQUFDLGVBQ1B4Qix5QkFBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0VBQU1DLElBQUFBLEtBQUssRUFBRTtFQUNUcUIsTUFBQUEsUUFBUSxFQUFFLE1BQU07RUFDaEJDLE1BQUFBLFVBQVUsRUFBQyxRQUFRO0VBQ25CQyxNQUFBQSxLQUFLLEVBQUMsU0FBQTtFQUNWLEtBQUE7RUFBRSxHQUFBLEVBQUUsR0FBRyxFQUFDLE9BRUYsQ0FDSCxDQUNFLENBQUMsZUFFZHpCLHlCQUFBLENBQUFDLGFBQUEsQ0FBQ3JELGlCQUFpQixFQUFBLElBQUUsQ0FFbkIsQ0FBQyxDQUFBO0VBRWQsQ0FBQzs7RUNoSUQ4RSxPQUFPLENBQUNDLGNBQWMsR0FBRyxFQUFFLENBQUE7RUFFM0JELE9BQU8sQ0FBQ0MsY0FBYyxDQUFDVixTQUFTLEdBQUdBLFNBQVM7Ozs7OzsifQ==
