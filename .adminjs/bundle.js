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
      // You can perform additional validation or processing here if needed

      setSelectedImage(file);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9hZG1pbl9wYW5lbC91aS9wYWdlcy9kYXNoYm9hcmQuanN4IiwiLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge3VzZVN0YXRlfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHN0eWxlZCBmcm9tIFwic3R5bGVkLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IHtcclxuICAgIEJveCxcclxuICAgIEgyLFxyXG4gICAgSDUsXHJcbiAgICBINCxcclxuICAgIFRleHQsXHJcbiAgICBJbGx1c3RyYXRpb24sXHJcbiAgICBJbGx1c3RyYXRpb25Qcm9wcyxcclxuICAgIEJ1dHRvbixcclxufSBmcm9tIFwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO1xyXG5cclxuaW1wb3J0IHsgdXNlVHJhbnNsYXRpb24gfSBmcm9tIFwiYWRtaW5qc1wiO1xyXG5cclxuY29uc3QgcGFnZUhlYWRlckhlaWdodCA9IDI4NDtcclxuY29uc3QgcGFnZUhlYWRlclBhZGRpbmdZID0gNzQ7XHJcbmNvbnN0IHBhZ2VIZWFkZXJQYWRkaW5nWCA9IDI1MDtcclxuXHJcbmNvbnN0IEltYWdlVXBsb2FkQnV0dG9uID0gKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRVcmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICAgIGNvbnN0IGN1cnJlbnRVcmxQYXJ0cyA9IGN1cnJlbnRVcmwuc3BsaXQoJy8nKTtcclxuICAgIGNvbnN0IHBvc3RVcmwgPSBjdXJyZW50VXJsUGFydHMuc2xpY2UoMCwgY3VycmVudFVybFBhcnRzLmxlbmd0aCAtIDEpLmpvaW4oJy8nKSArICcvaG9tZXBhZ2UnO1xyXG4gICAgY29uc3QgaW1hZ2VVcmwgPSBjdXJyZW50VXJsUGFydHMuc2xpY2UoMCwgY3VycmVudFVybFBhcnRzLmxlbmd0aCAtIDEpLmpvaW4oJy8nKSArICcvaG9tZUltYWdlJztcclxuICAgIGNvbnN0IFtzZWxlY3RlZEltYWdlLCBzZXRTZWxlY3RlZEltYWdlXSA9IHVzZVN0YXRlKGltYWdlVXJsKTtcclxuICBcclxuICAgIGNvbnN0IGhhbmRsZUltYWdlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGZpbGUgPSBldmVudC50YXJnZXQuZmlsZXNbMF07XHJcbiAgICAgIC8vIFlvdSBjYW4gcGVyZm9ybSBhZGRpdGlvbmFsIHZhbGlkYXRpb24gb3IgcHJvY2Vzc2luZyBoZXJlIGlmIG5lZWRlZFxyXG4gIFxyXG4gICAgICBzZXRTZWxlY3RlZEltYWdlKGZpbGUpO1xyXG4gICAgfTtcclxuICBcclxuICAgIGNvbnN0IGhhbmRsZVVwbG9hZCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgLy8gWW91IGNhbiBpbXBsZW1lbnQgdGhlIGxvZ2ljIHRvIHVwbG9hZCB0aGUgc2VsZWN0ZWRJbWFnZSBoZXJlXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJVcGxvYWQgbG9naWMgZ29lcyBoZXJlOlwiLCBzZWxlY3RlZEltYWdlKTtcclxuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnaW1hZ2UnLCBzZWxlY3RlZEltYWdlKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2cocG9zdFVybCk7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChwb3N0VXJsLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBib2R5OiBmb3JtRGF0YSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0ltYWdlIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseTonLCByZXNwb25zZURhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHVwbG9hZGluZyBpbWFnZTonLCByZXNwb25zZS5zdGF0dXNUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgfTtcclxuICBcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICBkaXNwbGF5OlwiZmxleFwiLFxyXG4gICAgICAgIGp1c3RpZnlDb250ZW50OlwiY2VudGVyXCIsXHJcbiAgICAgICAgYWxpZ25JdGVtczpcImNlbnRlclwiLFxyXG4gICAgICAgIG1hcmdpblRvcDpcIjMycHhcIlxyXG4gICAgICB9fT5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgIHR5cGU9XCJmaWxlXCJcclxuICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxyXG4gICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUltYWdlQ2hhbmdlfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVVcGxvYWR9PlVwbG9hZCBJbWFnZTwvYnV0dG9uPlxyXG4gIFxyXG4gICAgICAgIHtzZWxlY3RlZEltYWdlICYmIChcclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxwPlNlbGVjdGVkIEltYWdlOjwvcD5cclxuICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgIHNyYz17VVJMLmNyZWF0ZU9iamVjdFVSTChzZWxlY3RlZEltYWdlKX1cclxuICAgICAgICAgICAgICBhbHQ9XCJTZWxlY3RlZFwiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgbWF4V2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiAnMjAwcHgnIH19XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBEYXNoYm9hcmRIZWFkZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IHRyYW5zbGF0ZU1lc3NhZ2UgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxCb3ggbXQ9XCIyMHB4XCIgcHg9XCIyMHB4XCI+XHJcbiAgICAgICAgICAgIDxIMj5XZWxjb21lLCBBZG1pbjwvSDI+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IERhc2hib2FyZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgdHJhbnNsYXRlTWVzc2FnZSwgdHJhbnNsYXRlQnV0dG9uIH0gPSB1c2VUcmFuc2xhdGlvbigpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Qm94PlxyXG4gICAgICAgICAgICAgICAgPHNlY3Rpb25cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTpcImZsZXhcIixcclxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDpcImNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6XCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6XCIzMnB4XCJcclxuICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgPHAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAvLyBmb250U2l6ZTogXCIzcmVtXCIsXHJcbiAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjNyZW1cIixcclxuICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OlwiNzAwXCJcclxuICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIE9uZVN0b3AgXHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjNyZW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDpcIm5vcm1hbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjpcIiMyODI4MjhcIlxyXG4gICAgICAgICAgICAgICAgICAgIH19PntcIiBcIn1cclxuICAgICAgICAgICAgICAgICAgICBBZG1pblxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgICAgICA8SW1hZ2VVcGxvYWRCdXR0b24gLz5cclxuXHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkOyIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9hZG1pbl9wYW5lbC91aS9wYWdlcy9kYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRhc2hib2FyZCA9IERhc2hib2FyZCJdLCJuYW1lcyI6WyJJbWFnZVVwbG9hZEJ1dHRvbiIsImN1cnJlbnRVcmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJjdXJyZW50VXJsUGFydHMiLCJzcGxpdCIsInBvc3RVcmwiLCJzbGljZSIsImxlbmd0aCIsImpvaW4iLCJpbWFnZVVybCIsIl91c2VTdGF0ZSIsInVzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5Iiwic2VsZWN0ZWRJbWFnZSIsInNldFNlbGVjdGVkSW1hZ2UiLCJoYW5kbGVJbWFnZUNoYW5nZSIsImV2ZW50IiwiZmlsZSIsInRhcmdldCIsImZpbGVzIiwiaGFuZGxlVXBsb2FkIiwiX3JlZiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsIm1hcmsiLCJfY2FsbGVlIiwiZm9ybURhdGEiLCJyZXNwb25zZSIsInJlc3BvbnNlRGF0YSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJjb25zb2xlIiwibG9nIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJzZW50Iiwib2siLCJqc29uIiwiZXJyb3IiLCJzdGF0dXNUZXh0Iiwic3RvcCIsImFwcGx5IiwiYXJndW1lbnRzIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJkaXNwbGF5IiwianVzdGlmeUNvbnRlbnQiLCJhbGlnbkl0ZW1zIiwibWFyZ2luVG9wIiwidHlwZSIsImFjY2VwdCIsIm9uQ2hhbmdlIiwib25DbGljayIsInNyYyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImFsdCIsIm1heFdpZHRoIiwibWF4SGVpZ2h0IiwiRGFzaGJvYXJkIiwiX3VzZVRyYW5zbGF0aW9uMiIsInVzZVRyYW5zbGF0aW9uIiwidHJhbnNsYXRlTWVzc2FnZSIsInRyYW5zbGF0ZUJ1dHRvbiIsIkJveCIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsImNvbG9yIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBbUJBLElBQU1BLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBaUJBLEdBQVM7RUFFNUIsRUFBQSxJQUFNQyxVQUFVLEdBQUdDLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxJQUFJLENBQUE7RUFDdkMsRUFBQSxJQUFNQyxlQUFlLEdBQUdKLFVBQVUsQ0FBQ0ssS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzdDLElBQU1DLE9BQU8sR0FBR0YsZUFBZSxDQUFDRyxLQUFLLENBQUMsQ0FBQyxFQUFFSCxlQUFlLENBQUNJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQTtJQUM1RixJQUFNQyxRQUFRLEdBQUdOLGVBQWUsQ0FBQ0csS0FBSyxDQUFDLENBQUMsRUFBRUgsZUFBZSxDQUFDSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUNDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUE7RUFDOUYsRUFBQSxJQUFBRSxTQUFBLEdBQTBDQyxjQUFRLENBQUNGLFFBQVEsQ0FBQztNQUFBRyxVQUFBLEdBQUFDLGNBQUEsQ0FBQUgsU0FBQSxFQUFBLENBQUEsQ0FBQTtFQUFyREksSUFBQUEsYUFBYSxHQUFBRixVQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUVHLElBQUFBLGdCQUFnQixHQUFBSCxVQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7RUFFdEMsRUFBQSxJQUFNSSxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQWlCQSxDQUFJQyxLQUFLLEVBQUs7TUFDbkMsSUFBTUMsSUFBSSxHQUFHRCxLQUFLLENBQUNFLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQ2xDOztNQUVBTCxnQkFBZ0IsQ0FBQ0csSUFBSSxDQUFDLENBQUE7S0FDdkIsQ0FBQTtFQUVELEVBQUEsSUFBTUcsWUFBWSxnQkFBQSxZQUFBO01BQUEsSUFBQUMsSUFBQSxHQUFBQyxpQkFBQSxlQUFBQyxtQkFBQSxFQUFBQyxDQUFBQSxJQUFBLENBQUcsU0FBQUMsT0FBQSxHQUFBO0VBQUEsTUFBQSxJQUFBQyxRQUFBLEVBQUFDLFFBQUEsRUFBQUMsWUFBQSxDQUFBO0VBQUEsTUFBQSxPQUFBTCxtQkFBQSxFQUFBLENBQUFNLElBQUEsQ0FBQSxTQUFBQyxTQUFBQyxRQUFBLEVBQUE7RUFBQSxRQUFBLE9BQUEsQ0FBQSxFQUFBLFFBQUFBLFFBQUEsQ0FBQUMsSUFBQSxHQUFBRCxRQUFBLENBQUFFLElBQUE7RUFBQSxVQUFBLEtBQUEsQ0FBQTtFQUNuQjtFQUNFQyxZQUFBQSxPQUFPLENBQUNDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRXRCLGFBQWEsQ0FBQyxDQUFBO0VBQy9DYSxZQUFBQSxRQUFRLEdBQUcsSUFBSVUsUUFBUSxFQUFFLENBQUE7RUFDL0JWLFlBQUFBLFFBQVEsQ0FBQ1csTUFBTSxDQUFDLE9BQU8sRUFBRXhCLGFBQWEsQ0FBQyxDQUFBO0VBR3ZDcUIsWUFBQUEsT0FBTyxDQUFDQyxHQUFHLENBQUMvQixPQUFPLENBQUMsQ0FBQTtFQUFDMkIsWUFBQUEsUUFBQSxDQUFBRSxJQUFBLEdBQUEsQ0FBQSxDQUFBO2NBQUEsT0FDRUssS0FBSyxDQUFDbEMsT0FBTyxFQUFFO0VBQ2xDbUMsY0FBQUEsTUFBTSxFQUFFLE1BQU07RUFDZEMsY0FBQUEsSUFBSSxFQUFFZCxRQUFBQTtFQUNWLGFBQUMsQ0FBQyxDQUFBO0VBQUEsVUFBQSxLQUFBLENBQUE7Y0FISUMsUUFBUSxHQUFBSSxRQUFBLENBQUFVLElBQUEsQ0FBQTtjQUFBLElBS1ZkLENBQUFBLFFBQVEsQ0FBQ2UsRUFBRSxFQUFBO0VBQUFYLGNBQUFBLFFBQUEsQ0FBQUUsSUFBQSxHQUFBLEVBQUEsQ0FBQTtFQUFBLGNBQUEsTUFBQTtFQUFBLGFBQUE7RUFBQUYsWUFBQUEsUUFBQSxDQUFBRSxJQUFBLEdBQUEsRUFBQSxDQUFBO0VBQUEsWUFBQSxPQUNnQk4sUUFBUSxDQUFDZ0IsSUFBSSxFQUFFLENBQUE7RUFBQSxVQUFBLEtBQUEsRUFBQTtjQUFwQ2YsWUFBWSxHQUFBRyxRQUFBLENBQUFVLElBQUEsQ0FBQTtFQUNsQlAsWUFBQUEsT0FBTyxDQUFDQyxHQUFHLENBQUMsOEJBQThCLEVBQUVQLFlBQVksQ0FBQyxDQUFBO0VBQUNHLFlBQUFBLFFBQUEsQ0FBQUUsSUFBQSxHQUFBLEVBQUEsQ0FBQTtFQUFBLFlBQUEsTUFBQTtFQUFBLFVBQUEsS0FBQSxFQUFBO2NBRTFEQyxPQUFPLENBQUNVLEtBQUssQ0FBQyx3QkFBd0IsRUFBRWpCLFFBQVEsQ0FBQ2tCLFVBQVUsQ0FBQyxDQUFBO0VBQUMsVUFBQSxLQUFBLEVBQUEsQ0FBQTtFQUFBLFVBQUEsS0FBQSxLQUFBO2NBQUEsT0FBQWQsUUFBQSxDQUFBZSxJQUFBLEVBQUEsQ0FBQTtFQUFBLFNBQUE7RUFBQSxPQUFBLEVBQUFyQixPQUFBLENBQUEsQ0FBQTtPQUdwRSxDQUFBLENBQUEsQ0FBQTtFQUFBLElBQUEsT0FBQSxTQXBCS0wsWUFBWUEsR0FBQTtFQUFBLE1BQUEsT0FBQUMsSUFBQSxDQUFBMEIsS0FBQSxDQUFBLElBQUEsRUFBQUMsU0FBQSxDQUFBLENBQUE7RUFBQSxLQUFBLENBQUE7S0FvQmpCLEVBQUEsQ0FBQTtJQUVELG9CQUNFQyx5QkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLEtBQUssRUFBRTtFQUNWQyxNQUFBQSxPQUFPLEVBQUMsTUFBTTtFQUNkQyxNQUFBQSxjQUFjLEVBQUMsUUFBUTtFQUN2QkMsTUFBQUEsVUFBVSxFQUFDLFFBQVE7RUFDbkJDLE1BQUFBLFNBQVMsRUFBQyxNQUFBO0VBQ1osS0FBQTtLQUNFTixlQUFBQSx5QkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBO0VBQ0VNLElBQUFBLElBQUksRUFBQyxNQUFNO0VBQ1hDLElBQUFBLE1BQU0sRUFBQyxTQUFTO0VBQ2hCQyxJQUFBQSxRQUFRLEVBQUUzQyxpQkFBQUE7RUFBa0IsR0FDN0IsQ0FBQyxlQUNGa0MseUJBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUFRUyxJQUFBQSxPQUFPLEVBQUV2QyxZQUFBQTtFQUFhLEdBQUEsRUFBQyxjQUFvQixDQUFDLEVBRW5EUCxhQUFhLGlCQUNab0MseUJBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQSxJQUFBLGVBQ0VELHlCQUFBLENBQUFDLGFBQUEsQ0FBRyxHQUFBLEVBQUEsSUFBQSxFQUFBLGlCQUFrQixDQUFDLGVBQ3RCRCx5QkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VVLElBQUFBLEdBQUcsRUFBRUMsR0FBRyxDQUFDQyxlQUFlLENBQUNqRCxhQUFhLENBQUU7RUFDeENrRCxJQUFBQSxHQUFHLEVBQUMsVUFBVTtFQUNkWixJQUFBQSxLQUFLLEVBQUU7RUFBRWEsTUFBQUEsUUFBUSxFQUFFLE1BQU07RUFBRUMsTUFBQUEsU0FBUyxFQUFFLE9BQUE7RUFBUSxLQUFBO0tBQy9DLENBQ0UsQ0FFSixDQUFDLENBQUE7RUFFVixDQUFDLENBQUE7RUFXSSxJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsR0FBUztFQUMzQixFQUFBLElBQUFDLGdCQUFBLEdBQThDQyxzQkFBYyxFQUFFLENBQUE7TUFBdENELGdCQUFBLENBQWhCRSxnQkFBZ0IsQ0FBQTtNQUFpQkYsZ0JBQUEsQ0FBZkcsZ0JBQWU7SUFDekMsb0JBQ0lyQix5QkFBQSxDQUFBQyxhQUFBLENBQUNxQixnQkFBRyxFQUNJdEIsSUFBQUEsZUFBQUEseUJBQUEsQ0FBQUMsYUFBQSxDQUFBLFNBQUEsRUFBQTtFQUNBQyxJQUFBQSxLQUFLLEVBQUU7RUFDSEMsTUFBQUEsT0FBTyxFQUFDLE1BQU07RUFDZEMsTUFBQUEsY0FBYyxFQUFDLFFBQVE7RUFDdkJDLE1BQUFBLFVBQVUsRUFBQyxRQUFRO0VBQ25CQyxNQUFBQSxTQUFTLEVBQUMsTUFBQTtFQUNkLEtBQUE7S0FDQU4sZUFBQUEseUJBQUEsQ0FBQUMsYUFBQSxDQUFBLEdBQUEsRUFBQTtFQUFHQyxJQUFBQSxLQUFLLEVBQUU7RUFDTjtFQUFBLEtBQUE7S0FFQUYsZUFBQUEseUJBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNQyxJQUFBQSxLQUFLLEVBQUU7RUFDYnFCLE1BQUFBLFFBQVEsRUFBRSxNQUFNO0VBQ2hCQyxNQUFBQSxVQUFVLEVBQUMsS0FBQTtFQUNmLEtBQUE7RUFBRSxHQUFBLEVBQUMsU0FFTyxDQUFDLGVBQ1B4Qix5QkFBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0VBQU1DLElBQUFBLEtBQUssRUFBRTtFQUNUcUIsTUFBQUEsUUFBUSxFQUFFLE1BQU07RUFDaEJDLE1BQUFBLFVBQVUsRUFBQyxRQUFRO0VBQ25CQyxNQUFBQSxLQUFLLEVBQUMsU0FBQTtFQUNWLEtBQUE7RUFBRSxHQUFBLEVBQUUsR0FBRyxFQUFDLE9BRUYsQ0FDSCxDQUNFLENBQUMsZUFFZHpCLHlCQUFBLENBQUFDLGFBQUEsQ0FBQ3JELGlCQUFpQixFQUFBLElBQUUsQ0FFbkIsQ0FBQyxDQUFBO0VBRWQsQ0FBQzs7RUMvSEQ4RSxPQUFPLENBQUNDLGNBQWMsR0FBRyxFQUFFLENBQUE7RUFFM0JELE9BQU8sQ0FBQ0MsY0FBYyxDQUFDVixTQUFTLEdBQUdBLFNBQVM7Ozs7OzsifQ==
