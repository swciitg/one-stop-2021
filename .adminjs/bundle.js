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
    var currentUrl = window.location.href;
    var currentUrlParts = currentUrl.split('/');
    var postUrl = currentUrlParts.slice(0, currentUrlParts.length - 1).join('/') + '/homepage';
    var imageUrl = currentUrlParts.slice(0, currentUrlParts.length - 1).join('/') + '/homeImage';
    var _useState = React.useState(imageUrl),
      _useState2 = _slicedToArray(_useState, 2),
      selectedImage = _useState2[0],
      setSelectedImage = _useState2[1];
    var handleImageChange = function handleImageChange(event) {
      var file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    };
    var handleUpload = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var formData, response, responseData;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // You can implement the logic to upload the selectedImage here
              console.log("Upload logic goes here:", selectedImage);
              formData = new FormData();
              formData.append('image', selectedImage);
              console.log(postUrl);
              _context.next = 6;
              return fetch(postUrl, {
                method: 'POST',
                body: formData
              });
            case 6:
              response = _context.sent;
              if (!response.ok) {
                _context.next = 14;
                break;
              }
              _context.next = 10;
              return response.json();
            case 10:
              responseData = _context.sent;
              console.log('Image uploaded successfully:', responseData);
              _context.next = 15;
              break;
            case 14:
              console.error('Error uploading image:', response.statusText);
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee);
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
        marginTop: "32px"
      }
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      type: "file",
      accept: "image/*",
      onChange: handleImageChange
    }), /*#__PURE__*/React__default["default"].createElement("button", {
      onClick: handleUpload
    }, "Upload Image"), selectedImage && /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("p", null, "Selected Image:"), /*#__PURE__*/React__default["default"].createElement("img", {
      src: selectedImage,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9hZG1pbl9wYW5lbC91aS9wYWdlcy9kYXNoYm9hcmQuanN4IiwiLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge3VzZVN0YXRlfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHN0eWxlZCBmcm9tIFwic3R5bGVkLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IHtcclxuICAgIEJveCxcclxuICAgIEgyLFxyXG4gICAgSDUsXHJcbiAgICBINCxcclxuICAgIFRleHQsXHJcbiAgICBJbGx1c3RyYXRpb24sXHJcbiAgICBJbGx1c3RyYXRpb25Qcm9wcyxcclxuICAgIEJ1dHRvbixcclxufSBmcm9tIFwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO1xyXG5cclxuaW1wb3J0IHsgdXNlVHJhbnNsYXRpb24gfSBmcm9tIFwiYWRtaW5qc1wiO1xyXG5cclxuY29uc3QgcGFnZUhlYWRlckhlaWdodCA9IDI4NDtcclxuY29uc3QgcGFnZUhlYWRlclBhZGRpbmdZID0gNzQ7XHJcbmNvbnN0IHBhZ2VIZWFkZXJQYWRkaW5nWCA9IDI1MDtcclxuXHJcbmNvbnN0IEltYWdlVXBsb2FkQnV0dG9uID0gKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRVcmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICAgIGNvbnN0IGN1cnJlbnRVcmxQYXJ0cyA9IGN1cnJlbnRVcmwuc3BsaXQoJy8nKTtcclxuICAgIGNvbnN0IHBvc3RVcmwgPSBjdXJyZW50VXJsUGFydHMuc2xpY2UoMCwgY3VycmVudFVybFBhcnRzLmxlbmd0aCAtIDEpLmpvaW4oJy8nKSArICcvaG9tZXBhZ2UnO1xyXG4gICAgY29uc3QgaW1hZ2VVcmwgPSBjdXJyZW50VXJsUGFydHMuc2xpY2UoMCwgY3VycmVudFVybFBhcnRzLmxlbmd0aCAtIDEpLmpvaW4oJy8nKSArICcvaG9tZUltYWdlJztcclxuICAgIGNvbnN0IFtzZWxlY3RlZEltYWdlLCBzZXRTZWxlY3RlZEltYWdlXSA9IHVzZVN0YXRlKGltYWdlVXJsKTtcclxuICBcclxuICAgIGNvbnN0IGhhbmRsZUltYWdlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGZpbGUgPSBldmVudC50YXJnZXQuZmlsZXNbMF07XHJcbiAgICAgIHNldFNlbGVjdGVkSW1hZ2UoVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKSk7XHJcbiAgICB9O1xyXG4gIFxyXG4gICAgY29uc3QgaGFuZGxlVXBsb2FkID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAvLyBZb3UgY2FuIGltcGxlbWVudCB0aGUgbG9naWMgdG8gdXBsb2FkIHRoZSBzZWxlY3RlZEltYWdlIGhlcmVcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlVwbG9hZCBsb2dpYyBnb2VzIGhlcmU6XCIsIHNlbGVjdGVkSW1hZ2UpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdpbWFnZScsIHNlbGVjdGVkSW1hZ2UpO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhwb3N0VXJsKTtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHBvc3RVcmwsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGJvZHk6IGZvcm1EYXRhLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSW1hZ2UgdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5OicsIHJlc3BvbnNlRGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgdXBsb2FkaW5nIGltYWdlOicsIHJlc3BvbnNlLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICB9O1xyXG4gIFxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgIGRpc3BsYXk6XCJmbGV4XCIsXHJcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6XCJjZW50ZXJcIixcclxuICAgICAgICBhbGlnbkl0ZW1zOlwiY2VudGVyXCIsXHJcbiAgICAgICAgbWFyZ2luVG9wOlwiMzJweFwiXHJcbiAgICAgIH19PlxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgdHlwZT1cImZpbGVcIlxyXG4gICAgICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiXHJcbiAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW1hZ2VDaGFuZ2V9XHJcbiAgICAgICAgLz5cclxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZVVwbG9hZH0+VXBsb2FkIEltYWdlPC9idXR0b24+XHJcbiAgXHJcbiAgICAgICAge3NlbGVjdGVkSW1hZ2UgJiYgKFxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPHA+U2VsZWN0ZWQgSW1hZ2U6PC9wPlxyXG4gICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgc3JjPXtzZWxlY3RlZEltYWdlfVxyXG4gICAgICAgICAgICAgIGFsdD1cIlNlbGVjdGVkXCJcclxuICAgICAgICAgICAgICBzdHlsZT17eyBtYXhXaWR0aDogJzEwMCUnLCBtYXhIZWlnaHQ6ICcyMDBweCcgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IERhc2hib2FyZEhlYWRlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgdHJhbnNsYXRlTWVzc2FnZSB9ID0gdXNlVHJhbnNsYXRpb24oKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJveCBtdD1cIjIwcHhcIiBweD1cIjIwcHhcIj5cclxuICAgICAgICAgICAgPEgyPldlbGNvbWUsIEFkbWluPC9IMj5cclxuICAgICAgICA8L0JveD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgRGFzaGJvYXJkID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyB0cmFuc2xhdGVNZXNzYWdlLCB0cmFuc2xhdGVCdXR0b24gfSA9IHVzZVRyYW5zbGF0aW9uKCk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxCb3g+XHJcbiAgICAgICAgICAgICAgICA8c2VjdGlvblxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OlwiZmxleFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OlwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczpcImNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDpcIjMycHhcIlxyXG4gICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICA8cCBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvbnRTaXplOiBcIjNyZW1cIixcclxuICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiM3JlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6XCI3MDBcIlxyXG4gICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgT25lU3RvcCBcclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiM3JlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0Olwibm9ybWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOlwiIzI4MjgyOFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfX0+e1wiIFwifVxyXG4gICAgICAgICAgICAgICAgICAgIEFkbWluXHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICAgIDxJbWFnZVVwbG9hZEJ1dHRvbiAvPlxyXG5cclxuICAgICAgICA8L0JveD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmQ7IiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4uL2FkbWluX3BhbmVsL3VpL3BhZ2VzL2Rhc2hib2FyZCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRGFzaGJvYXJkID0gRGFzaGJvYXJkIl0sIm5hbWVzIjpbIkltYWdlVXBsb2FkQnV0dG9uIiwiY3VycmVudFVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImN1cnJlbnRVcmxQYXJ0cyIsInNwbGl0IiwicG9zdFVybCIsInNsaWNlIiwibGVuZ3RoIiwiam9pbiIsImltYWdlVXJsIiwiX3VzZVN0YXRlIiwidXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJzZWxlY3RlZEltYWdlIiwic2V0U2VsZWN0ZWRJbWFnZSIsImhhbmRsZUltYWdlQ2hhbmdlIiwiZXZlbnQiLCJmaWxlIiwidGFyZ2V0IiwiZmlsZXMiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJoYW5kbGVVcGxvYWQiLCJfcmVmIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwibWFyayIsIl9jYWxsZWUiLCJmb3JtRGF0YSIsInJlc3BvbnNlIiwicmVzcG9uc2VEYXRhIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsImNvbnNvbGUiLCJsb2ciLCJGb3JtRGF0YSIsImFwcGVuZCIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsInNlbnQiLCJvayIsImpzb24iLCJlcnJvciIsInN0YXR1c1RleHQiLCJzdG9wIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsImRpc3BsYXkiLCJqdXN0aWZ5Q29udGVudCIsImFsaWduSXRlbXMiLCJtYXJnaW5Ub3AiLCJ0eXBlIiwiYWNjZXB0Iiwib25DaGFuZ2UiLCJvbkNsaWNrIiwic3JjIiwiYWx0IiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJEYXNoYm9hcmQiLCJfdXNlVHJhbnNsYXRpb24yIiwidXNlVHJhbnNsYXRpb24iLCJ0cmFuc2xhdGVNZXNzYWdlIiwidHJhbnNsYXRlQnV0dG9uIiwiQm94IiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwiY29sb3IiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
