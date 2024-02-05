(function (React, adminjs, designSystem) {
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
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
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
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var Edit = function Edit(_ref) {
    var property = _ref.property,
      record = _ref.record,
      onChange = _ref.onChange;
    var params = record.params;
    var _ref2 = property,
      custom = _ref2.custom;
    var path = adminjs.flat.get(params, custom.filePathProperty);
    var key = adminjs.flat.get(params, custom.keyProperty);
    var file = adminjs.flat.get(params, custom.fileProperty);
    var _useState = React.useState(key),
      _useState2 = _slicedToArray(_useState, 2),
      originalKey = _useState2[0],
      setOriginalKey = _useState2[1];
    var _useState3 = React.useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      filesToUpload = _useState4[0],
      setFilesToUpload = _useState4[1];
    React.useEffect(function () {
      // it means means that someone hit save and new file has been uploaded
      // in this case fliesToUpload should be cleared.
      // This happens when user turns off redirect after new/edit
      if (typeof key === 'string' && key !== originalKey || typeof key !== 'string' && !originalKey || typeof key !== 'string' && Array.isArray(key) && key.length !== originalKey.length) {
        setOriginalKey(key);
        setFilesToUpload([]);
      }
    }, [key, originalKey]);
    var onUpload = function onUpload(files) {
      setFilesToUpload(files);
      onChange(custom.fileProperty, files);
    };
    var handleRemove = function handleRemove() {
      onChange(custom.fileProperty, null);
    };
    var handleMultiRemove = function handleMultiRemove(singleKey) {
      var index = (adminjs.flat.get(record.params, custom.keyProperty) || []).indexOf(singleKey);
      var filesToDelete = adminjs.flat.get(record.params, custom.filesToDeleteProperty) || [];
      if (path && path.length > 0) {
        var newPath = path.map(function (currentPath, i) {
          return i !== index ? currentPath : null;
        });
        var newParams = adminjs.flat.set(record.params, custom.filesToDeleteProperty, [].concat(_toConsumableArray(filesToDelete), [index]));
        newParams = adminjs.flat.set(newParams, custom.filePathProperty, newPath);
        onChange(_objectSpread2(_objectSpread2({}, record), {}, {
          params: newParams
        }));
      } else {
        // eslint-disable-next-line no-console
        console.log('You cannot remove file when there are no uploaded files yet');
      }
    };
    return /*#__PURE__*/React__default["default"].createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default["default"].createElement(designSystem.Label, null, property.label), /*#__PURE__*/React__default["default"].createElement(designSystem.DropZone, {
      onChange: onUpload,
      multiple: custom.multiple,
      validate: {
        mimeTypes: custom.mimeTypes,
        maxSize: custom.maxSize
      },
      files: filesToUpload
    }), !custom.multiple && key && path && !filesToUpload.length && file !== null && /*#__PURE__*/React__default["default"].createElement(designSystem.DropZoneItem, {
      filename: key,
      src: path,
      onRemove: handleRemove
    }), custom.multiple && key && key.length && path ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, key.map(function (singleKey, index) {
      // when we remove items we set only path index to nulls.
      // key is still there. This is because
      // we have to maintain all the indexes. So here we simply filter out elements which
      // were removed and display only what was left
      var currentPath = path[index];
      return currentPath ? /*#__PURE__*/React__default["default"].createElement(designSystem.DropZoneItem, {
        key: singleKey,
        filename: singleKey,
        src: path[index],
        onRemove: function onRemove() {
          return handleMultiRemove(singleKey);
        }
      }) : '';
    })) : '');
  };

  var AudioMimeTypes = ['audio/aac', 'audio/midi', 'audio/x-midi', 'audio/mpeg', 'audio/ogg', 'application/ogg', 'audio/opus', 'audio/wav', 'audio/webm', 'audio/3gpp2'];
  var ImageMimeTypes = ['image/bmp', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/vnd.microsoft.icon', 'image/tiff', 'image/webp'];

  // eslint-disable-next-line import/no-extraneous-dependencies
  var SingleFile = function SingleFile(props) {
    var name = props.name,
      path = props.path,
      mimeType = props.mimeType,
      width = props.width;
    if (path && path.length) {
      if (mimeType && ImageMimeTypes.includes(mimeType)) {
        return /*#__PURE__*/React__default["default"].createElement("img", {
          src: path,
          style: {
            maxHeight: width,
            maxWidth: width
          },
          alt: name
        });
      }
      if (mimeType && AudioMimeTypes.includes(mimeType)) {
        return /*#__PURE__*/React__default["default"].createElement("audio", {
          controls: true,
          src: path
        }, "Your browser does not support the", /*#__PURE__*/React__default["default"].createElement("code", null, "audio"), /*#__PURE__*/React__default["default"].createElement("track", {
          kind: "captions"
        }));
      }
    }
    return /*#__PURE__*/React__default["default"].createElement(designSystem.Box, null, /*#__PURE__*/React__default["default"].createElement(designSystem.Button, {
      as: "a",
      href: path,
      ml: "default",
      size: "sm",
      rounded: true,
      target: "_blank"
    }, /*#__PURE__*/React__default["default"].createElement(designSystem.Icon, {
      icon: "DocumentDownload",
      color: "white",
      mr: "default"
    }), name));
  };
  var File = function File(_ref) {
    var width = _ref.width,
      record = _ref.record,
      property = _ref.property;
    var _ref2 = property,
      custom = _ref2.custom;
    var path = adminjs.flat.get(record === null || record === void 0 ? void 0 : record.params, custom.filePathProperty);
    if (!path) {
      return null;
    }
    var name = adminjs.flat.get(record === null || record === void 0 ? void 0 : record.params, custom.fileNameProperty ? custom.fileNameProperty : custom.keyProperty);
    var mimeType = custom.mimeTypeProperty && adminjs.flat.get(record === null || record === void 0 ? void 0 : record.params, custom.mimeTypeProperty);
    if (!property.custom.multiple) {
      if (custom.opts && custom.opts.baseUrl) {
        path = "".concat(custom.opts.baseUrl, "/").concat(name);
      }
      return /*#__PURE__*/React__default["default"].createElement(SingleFile, {
        path: path,
        name: name,
        width: width,
        mimeType: mimeType
      });
    }
    if (custom.opts && custom.opts.baseUrl) {
      var baseUrl = custom.opts.baseUrl || '';
      path = path.map(function (singlePath, index) {
        return "".concat(baseUrl, "/").concat(name[index]);
      });
    }
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, path.map(function (singlePath, index) {
      return /*#__PURE__*/React__default["default"].createElement(SingleFile, {
        key: singlePath,
        path: singlePath,
        name: name[index],
        width: width,
        mimeType: mimeType[index]
      });
    }));
  };

  var List = function List(props) {
    return /*#__PURE__*/React__default["default"].createElement(File, _extends({
      width: 100
    }, props));
  };

  var Show = function Show(props) {
    var property = props.property;
    return /*#__PURE__*/React__default["default"].createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default["default"].createElement(designSystem.Label, null, property.label), /*#__PURE__*/React__default["default"].createElement(File, _extends({
      width: "100%"
    }, props)));
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
    }, " ", "Admin"))));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Component0 = Edit;
  AdminJS.UserComponents.Component1 = List;
  AdminJS.UserComponents.Component2 = Show;
  AdminJS.UserComponents.Dashboard = Dashboard;

})(React, AdminJS, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2VkaXQudHN4IiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvdHlwZXMvbWltZS10eXBlcy50eXBlLnRzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9maWxlLnRzeCIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvbGlzdC50c3giLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL3Nob3cudHN4IiwiLi4vYWRtaW5fcGFuZWwvdWkvcGFnZXMvZGFzaGJvYXJkLmpzeCIsIi5lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgRkMsIHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEVkaXRQcm9wZXJ0eVByb3BzLCBmbGF0IH0gZnJvbSAnYWRtaW5qcydcbmltcG9ydCB7IERyb3Bab25lLCBGb3JtR3JvdXAsIExhYmVsLCBEcm9wWm9uZUl0ZW0gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJ1xuaW1wb3J0IFByb3BlcnR5Q3VzdG9tIGZyb20gJy4uL3R5cGVzL3Byb3BlcnR5LWN1c3RvbS50eXBlJ1xuXG5jb25zdCBFZGl0OiBGQzxFZGl0UHJvcGVydHlQcm9wcz4gPSAoeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9KSA9PiB7XG4gIGNvbnN0IHsgcGFyYW1zIH0gPSByZWNvcmRcbiAgY29uc3QgeyBjdXN0b20gfSA9IHByb3BlcnR5IGFzIHVua25vd24gYXMgeyBjdXN0b206IFByb3BlcnR5Q3VzdG9tIH1cblxuICBjb25zdCBwYXRoID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSlcbiAgY29uc3Qga2V5ID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20ua2V5UHJvcGVydHkpXG4gIGNvbnN0IGZpbGUgPSBmbGF0LmdldChwYXJhbXMsIGN1c3RvbS5maWxlUHJvcGVydHkpXG5cbiAgY29uc3QgW29yaWdpbmFsS2V5LCBzZXRPcmlnaW5hbEtleV0gPSB1c2VTdGF0ZShrZXkpXG4gIGNvbnN0IFtmaWxlc1RvVXBsb2FkLCBzZXRGaWxlc1RvVXBsb2FkXSA9IHVzZVN0YXRlPEFycmF5PEZpbGU+PihbXSlcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIGl0IG1lYW5zIG1lYW5zIHRoYXQgc29tZW9uZSBoaXQgc2F2ZSBhbmQgbmV3IGZpbGUgaGFzIGJlZW4gdXBsb2FkZWRcbiAgICAvLyBpbiB0aGlzIGNhc2UgZmxpZXNUb1VwbG9hZCBzaG91bGQgYmUgY2xlYXJlZC5cbiAgICAvLyBUaGlzIGhhcHBlbnMgd2hlbiB1c2VyIHR1cm5zIG9mZiByZWRpcmVjdCBhZnRlciBuZXcvZWRpdFxuICAgIGlmIChcbiAgICAgICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiBrZXkgIT09IG9yaWdpbmFsS2V5KVxuICAgICAgfHwgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnICYmICFvcmlnaW5hbEtleSlcbiAgICAgIHx8ICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyAmJiBBcnJheS5pc0FycmF5KGtleSkgJiYga2V5Lmxlbmd0aCAhPT0gb3JpZ2luYWxLZXkubGVuZ3RoKVxuICAgICkge1xuICAgICAgc2V0T3JpZ2luYWxLZXkoa2V5KVxuICAgICAgc2V0RmlsZXNUb1VwbG9hZChbXSlcbiAgICB9XG4gIH0sIFtrZXksIG9yaWdpbmFsS2V5XSlcblxuICBjb25zdCBvblVwbG9hZCA9IChmaWxlczogQXJyYXk8RmlsZT4pOiB2b2lkID0+IHtcbiAgICBzZXRGaWxlc1RvVXBsb2FkKGZpbGVzKVxuICAgIG9uQ2hhbmdlKGN1c3RvbS5maWxlUHJvcGVydHksIGZpbGVzKVxuICB9XG5cbiAgY29uc3QgaGFuZGxlUmVtb3ZlID0gKCkgPT4ge1xuICAgIG9uQ2hhbmdlKGN1c3RvbS5maWxlUHJvcGVydHksIG51bGwpXG4gIH1cblxuICBjb25zdCBoYW5kbGVNdWx0aVJlbW92ZSA9IChzaW5nbGVLZXkpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IChmbGF0LmdldChyZWNvcmQucGFyYW1zLCBjdXN0b20ua2V5UHJvcGVydHkpIHx8IFtdKS5pbmRleE9mKHNpbmdsZUtleSlcbiAgICBjb25zdCBmaWxlc1RvRGVsZXRlID0gZmxhdC5nZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmZpbGVzVG9EZWxldGVQcm9wZXJ0eSkgfHwgW11cbiAgICBpZiAoXG4gICAgICBwYXRoICYmIHBhdGgubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgY29uc3QgbmV3UGF0aCA9IHBhdGgubWFwKChjdXJyZW50UGF0aCwgaSkgPT4gKGkgIT09IGluZGV4ID8gY3VycmVudFBhdGggOiBudWxsKSlcbiAgICAgIGxldCBuZXdQYXJhbXMgPSBmbGF0LnNldChcbiAgICAgICAgcmVjb3JkLnBhcmFtcyxcbiAgICAgICAgY3VzdG9tLmZpbGVzVG9EZWxldGVQcm9wZXJ0eSxcbiAgICAgICAgWy4uLmZpbGVzVG9EZWxldGUsIGluZGV4XSxcbiAgICAgIClcbiAgICAgIG5ld1BhcmFtcyA9IGZsYXQuc2V0KG5ld1BhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHksIG5ld1BhdGgpXG5cbiAgICAgIG9uQ2hhbmdlKHtcbiAgICAgICAgLi4ucmVjb3JkLFxuICAgICAgICBwYXJhbXM6IG5ld1BhcmFtcyxcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmxvZygnWW91IGNhbm5vdCByZW1vdmUgZmlsZSB3aGVuIHRoZXJlIGFyZSBubyB1cGxvYWRlZCBmaWxlcyB5ZXQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPEZvcm1Hcm91cD5cbiAgICAgIDxMYWJlbD57cHJvcGVydHkubGFiZWx9PC9MYWJlbD5cbiAgICAgIDxEcm9wWm9uZVxuICAgICAgICBvbkNoYW5nZT17b25VcGxvYWR9XG4gICAgICAgIG11bHRpcGxlPXtjdXN0b20ubXVsdGlwbGV9XG4gICAgICAgIHZhbGlkYXRlPXt7XG4gICAgICAgICAgbWltZVR5cGVzOiBjdXN0b20ubWltZVR5cGVzIGFzIEFycmF5PHN0cmluZz4sXG4gICAgICAgICAgbWF4U2l6ZTogY3VzdG9tLm1heFNpemUsXG4gICAgICAgIH19XG4gICAgICAgIGZpbGVzPXtmaWxlc1RvVXBsb2FkfVxuICAgICAgLz5cbiAgICAgIHshY3VzdG9tLm11bHRpcGxlICYmIGtleSAmJiBwYXRoICYmICFmaWxlc1RvVXBsb2FkLmxlbmd0aCAmJiBmaWxlICE9PSBudWxsICYmIChcbiAgICAgICAgPERyb3Bab25lSXRlbSBmaWxlbmFtZT17a2V5fSBzcmM9e3BhdGh9IG9uUmVtb3ZlPXtoYW5kbGVSZW1vdmV9IC8+XG4gICAgICApfVxuICAgICAge2N1c3RvbS5tdWx0aXBsZSAmJiBrZXkgJiYga2V5Lmxlbmd0aCAmJiBwYXRoID8gKFxuICAgICAgICA8PlxuICAgICAgICAgIHtrZXkubWFwKChzaW5nbGVLZXksIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAvLyB3aGVuIHdlIHJlbW92ZSBpdGVtcyB3ZSBzZXQgb25seSBwYXRoIGluZGV4IHRvIG51bGxzLlxuICAgICAgICAgICAgLy8ga2V5IGlzIHN0aWxsIHRoZXJlLiBUaGlzIGlzIGJlY2F1c2VcbiAgICAgICAgICAgIC8vIHdlIGhhdmUgdG8gbWFpbnRhaW4gYWxsIHRoZSBpbmRleGVzLiBTbyBoZXJlIHdlIHNpbXBseSBmaWx0ZXIgb3V0IGVsZW1lbnRzIHdoaWNoXG4gICAgICAgICAgICAvLyB3ZXJlIHJlbW92ZWQgYW5kIGRpc3BsYXkgb25seSB3aGF0IHdhcyBsZWZ0XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UGF0aCA9IHBhdGhbaW5kZXhdXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFBhdGggPyAoXG4gICAgICAgICAgICAgIDxEcm9wWm9uZUl0ZW1cbiAgICAgICAgICAgICAgICBrZXk9e3NpbmdsZUtleX1cbiAgICAgICAgICAgICAgICBmaWxlbmFtZT17c2luZ2xlS2V5fVxuICAgICAgICAgICAgICAgIHNyYz17cGF0aFtpbmRleF19XG4gICAgICAgICAgICAgICAgb25SZW1vdmU9eygpID0+IGhhbmRsZU11bHRpUmVtb3ZlKHNpbmdsZUtleSl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogJydcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC8+XG4gICAgICApIDogJyd9XG4gICAgPC9Gb3JtR3JvdXA+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRWRpdFxuIiwiZXhwb3J0IGNvbnN0IEF1ZGlvTWltZVR5cGVzID0gW1xuICAnYXVkaW8vYWFjJyxcbiAgJ2F1ZGlvL21pZGknLFxuICAnYXVkaW8veC1taWRpJyxcbiAgJ2F1ZGlvL21wZWcnLFxuICAnYXVkaW8vb2dnJyxcbiAgJ2FwcGxpY2F0aW9uL29nZycsXG4gICdhdWRpby9vcHVzJyxcbiAgJ2F1ZGlvL3dhdicsXG4gICdhdWRpby93ZWJtJyxcbiAgJ2F1ZGlvLzNncHAyJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IFZpZGVvTWltZVR5cGVzID0gW1xuICAndmlkZW8veC1tc3ZpZGVvJyxcbiAgJ3ZpZGVvL21wZWcnLFxuICAndmlkZW8vb2dnJyxcbiAgJ3ZpZGVvL21wMnQnLFxuICAndmlkZW8vd2VibScsXG4gICd2aWRlby8zZ3BwJyxcbiAgJ3ZpZGVvLzNncHAyJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IEltYWdlTWltZVR5cGVzID0gW1xuICAnaW1hZ2UvYm1wJyxcbiAgJ2ltYWdlL2dpZicsXG4gICdpbWFnZS9qcGVnJyxcbiAgJ2ltYWdlL3BuZycsXG4gICdpbWFnZS9zdmcreG1sJyxcbiAgJ2ltYWdlL3ZuZC5taWNyb3NvZnQuaWNvbicsXG4gICdpbWFnZS90aWZmJyxcbiAgJ2ltYWdlL3dlYnAnLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgQ29tcHJlc3NlZE1pbWVUeXBlcyA9IFtcbiAgJ2FwcGxpY2F0aW9uL3gtYnppcCcsXG4gICdhcHBsaWNhdGlvbi94LWJ6aXAyJyxcbiAgJ2FwcGxpY2F0aW9uL2d6aXAnLFxuICAnYXBwbGljYXRpb24vamF2YS1hcmNoaXZlJyxcbiAgJ2FwcGxpY2F0aW9uL3gtdGFyJyxcbiAgJ2FwcGxpY2F0aW9uL3ppcCcsXG4gICdhcHBsaWNhdGlvbi94LTd6LWNvbXByZXNzZWQnLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgRG9jdW1lbnRNaW1lVHlwZXMgPSBbXG4gICdhcHBsaWNhdGlvbi94LWFiaXdvcmQnLFxuICAnYXBwbGljYXRpb24veC1mcmVlYXJjJyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5hbWF6b24uZWJvb2snLFxuICAnYXBwbGljYXRpb24vbXN3b3JkJyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50JyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1mb250b2JqZWN0JyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQucHJlc2VudGF0aW9uJyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuc3ByZWFkc2hlZXQnLFxuICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC50ZXh0JyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50JyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5wcmVzZW50YXRpb25tbC5wcmVzZW50YXRpb24nLFxuICAnYXBwbGljYXRpb24vdm5kLnJhcicsXG4gICdhcHBsaWNhdGlvbi9ydGYnLFxuICAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsJyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLnNoZWV0Jyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IFRleHRNaW1lVHlwZXMgPSBbXG4gICd0ZXh0L2NzcycsXG4gICd0ZXh0L2NzdicsXG4gICd0ZXh0L2h0bWwnLFxuICAndGV4dC9jYWxlbmRhcicsXG4gICd0ZXh0L2phdmFzY3JpcHQnLFxuICAnYXBwbGljYXRpb24vanNvbicsXG4gICdhcHBsaWNhdGlvbi9sZCtqc29uJyxcbiAgJ3RleHQvamF2YXNjcmlwdCcsXG4gICd0ZXh0L3BsYWluJyxcbiAgJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcsXG4gICdhcHBsaWNhdGlvbi94bWwnLFxuICAndGV4dC94bWwnLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgQmluYXJ5RG9jc01pbWVUeXBlcyA9IFtcbiAgJ2FwcGxpY2F0aW9uL2VwdWIremlwJyxcbiAgJ2FwcGxpY2F0aW9uL3BkZicsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBGb250TWltZVR5cGVzID0gW1xuICAnZm9udC9vdGYnLFxuICAnZm9udC90dGYnLFxuICAnZm9udC93b2ZmJyxcbiAgJ2ZvbnQvd29mZjInLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgT3RoZXJNaW1lVHlwZXMgPSBbXG4gICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAnYXBwbGljYXRpb24veC1jc2gnLFxuICAnYXBwbGljYXRpb24vdm5kLmFwcGxlLmluc3RhbGxlcit4bWwnLFxuICAnYXBwbGljYXRpb24veC1odHRwZC1waHAnLFxuICAnYXBwbGljYXRpb24veC1zaCcsXG4gICdhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCcsXG4gICd2bmQudmlzaW8nLFxuICAnYXBwbGljYXRpb24vdm5kLm1vemlsbGEueHVsK3htbCcsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBNaW1lVHlwZXMgPSBbXG4gIC4uLkF1ZGlvTWltZVR5cGVzLFxuICAuLi5WaWRlb01pbWVUeXBlcyxcbiAgLi4uSW1hZ2VNaW1lVHlwZXMsXG4gIC4uLkNvbXByZXNzZWRNaW1lVHlwZXMsXG4gIC4uLkRvY3VtZW50TWltZVR5cGVzLFxuICAuLi5UZXh0TWltZVR5cGVzLFxuICAuLi5CaW5hcnlEb2NzTWltZVR5cGVzLFxuICAuLi5PdGhlck1pbWVUeXBlcyxcbiAgLi4uRm9udE1pbWVUeXBlcyxcbiAgLi4uT3RoZXJNaW1lVHlwZXMsXG5dXG5cbnR5cGUgUG9wdWxhck1pbWVUeXBlcyA9IHR5cGVvZiBNaW1lVHlwZXNbbnVtYmVyXVxuXG5leHBvcnQgdHlwZSBNaW1lVHlwZSA9IFBvcHVsYXJNaW1lVHlwZXMgfCB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZ1xufVxuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llc1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEljb24gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJ1xuaW1wb3J0IHsgZmxhdCwgU2hvd1Byb3BlcnR5UHJvcHMgfSBmcm9tICdhZG1pbmpzJ1xuaW1wb3J0IFJlYWN0LCB7IEZDIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBBdWRpb01pbWVUeXBlcywgSW1hZ2VNaW1lVHlwZXMgfSBmcm9tICcuLi90eXBlcy9taW1lLXR5cGVzLnR5cGUnXG5pbXBvcnQgUHJvcGVydHlDdXN0b20gZnJvbSAnLi4vdHlwZXMvcHJvcGVydHktY3VzdG9tLnR5cGUnXG5cbnR5cGUgUHJvcHMgPSBTaG93UHJvcGVydHlQcm9wcyAmIHtcbiAgd2lkdGg/OiBudW1iZXIgfCBzdHJpbmc7XG59O1xuXG50eXBlIFNpbmdsZUZpbGVQcm9wcyA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICBwYXRoPzogc3RyaW5nO1xuICBtaW1lVHlwZT86IHN0cmluZztcbiAgd2lkdGg/OiBudW1iZXIgfCBzdHJpbmc7XG59O1xuXG5jb25zdCBTaW5nbGVGaWxlOiBGQzxTaW5nbGVGaWxlUHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgbmFtZSwgcGF0aCwgbWltZVR5cGUsIHdpZHRoIH0gPSBwcm9wc1xuXG4gIGlmIChwYXRoICYmIHBhdGgubGVuZ3RoKSB7XG4gICAgaWYgKG1pbWVUeXBlICYmIEltYWdlTWltZVR5cGVzLmluY2x1ZGVzKG1pbWVUeXBlIGFzIGFueSkpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxpbWdcbiAgICAgICAgICBzcmM9e3BhdGh9XG4gICAgICAgICAgc3R5bGU9e3sgbWF4SGVpZ2h0OiB3aWR0aCwgbWF4V2lkdGg6IHdpZHRoIH19XG4gICAgICAgICAgYWx0PXtuYW1lfVxuICAgICAgICAvPlxuICAgICAgKVxuICAgIH1cbiAgICBpZiAobWltZVR5cGUgJiYgQXVkaW9NaW1lVHlwZXMuaW5jbHVkZXMobWltZVR5cGUgYXMgYW55KSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGF1ZGlvIGNvbnRyb2xzIHNyYz17cGF0aH0+XG4gICAgICAgICAgWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlXG4gICAgICAgICAgPGNvZGU+YXVkaW88L2NvZGU+XG4gICAgICAgICAgPHRyYWNrIGtpbmQ9XCJjYXB0aW9uc1wiIC8+XG4gICAgICAgIDwvYXVkaW8+XG4gICAgICApXG4gICAgfVxuICB9XG4gIHJldHVybiAoXG4gICAgPEJveD5cbiAgICAgIDxCdXR0b24gYXM9XCJhXCIgaHJlZj17cGF0aH0gbWw9XCJkZWZhdWx0XCIgc2l6ZT1cInNtXCIgcm91bmRlZCB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgPEljb24gaWNvbj1cIkRvY3VtZW50RG93bmxvYWRcIiBjb2xvcj1cIndoaXRlXCIgbXI9XCJkZWZhdWx0XCIgLz5cbiAgICAgICAge25hbWV9XG4gICAgICA8L0J1dHRvbj5cbiAgICA8L0JveD5cbiAgKVxufVxuXG5jb25zdCBGaWxlOiBGQzxQcm9wcz4gPSAoeyB3aWR0aCwgcmVjb3JkLCBwcm9wZXJ0eSB9KSA9PiB7XG4gIGNvbnN0IHsgY3VzdG9tIH0gPSBwcm9wZXJ0eSBhcyB1bmtub3duIGFzIHsgY3VzdG9tOiBQcm9wZXJ0eUN1c3RvbSB9XG5cbiAgbGV0IHBhdGggPSBmbGF0LmdldChyZWNvcmQ/LnBhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHkpXG5cbiAgaWYgKCFwYXRoKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGNvbnN0IG5hbWUgPSBmbGF0LmdldChcbiAgICByZWNvcmQ/LnBhcmFtcyxcbiAgICBjdXN0b20uZmlsZU5hbWVQcm9wZXJ0eSA/IGN1c3RvbS5maWxlTmFtZVByb3BlcnR5IDogY3VzdG9tLmtleVByb3BlcnR5LFxuICApXG5cbiAgY29uc3QgbWltZVR5cGUgPSBjdXN0b20ubWltZVR5cGVQcm9wZXJ0eVxuICAgICYmIGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20ubWltZVR5cGVQcm9wZXJ0eSlcblxuICBpZiAoIXByb3BlcnR5LmN1c3RvbS5tdWx0aXBsZSkge1xuICAgIGlmIChjdXN0b20ub3B0cyAmJiBjdXN0b20ub3B0cy5iYXNlVXJsKSB7XG4gICAgICBwYXRoID0gYCR7Y3VzdG9tLm9wdHMuYmFzZVVybH0vJHtuYW1lfWBcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxTaW5nbGVGaWxlIHBhdGg9e3BhdGh9IG5hbWU9e25hbWV9IHdpZHRoPXt3aWR0aH0gbWltZVR5cGU9e21pbWVUeXBlfSAvPlxuICAgIClcbiAgfVxuICBpZiAoY3VzdG9tLm9wdHMgJiYgY3VzdG9tLm9wdHMuYmFzZVVybCkge1xuICAgIGNvbnN0IGJhc2VVcmwgPSBjdXN0b20ub3B0cy5iYXNlVXJsIHx8ICcnXG4gICAgcGF0aCA9IHBhdGgubWFwKChzaW5nbGVQYXRoLCBpbmRleCkgPT4gYCR7YmFzZVVybH0vJHtuYW1lW2luZGV4XX1gKVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge3BhdGgubWFwKChzaW5nbGVQYXRoLCBpbmRleCkgPT4gKFxuICAgICAgICA8U2luZ2xlRmlsZVxuICAgICAgICAgIGtleT17c2luZ2xlUGF0aH1cbiAgICAgICAgICBwYXRoPXtzaW5nbGVQYXRofVxuICAgICAgICAgIG5hbWU9e25hbWVbaW5kZXhdfVxuICAgICAgICAgIHdpZHRoPXt3aWR0aH1cbiAgICAgICAgICBtaW1lVHlwZT17bWltZVR5cGVbaW5kZXhdfVxuICAgICAgICAvPlxuICAgICAgKSl9XG4gICAgPC8+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRmlsZVxuIiwiaW1wb3J0IFJlYWN0LCB7IEZDIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBTaG93UHJvcGVydHlQcm9wcyB9IGZyb20gJ2FkbWluanMnXG5cbmltcG9ydCBGaWxlIGZyb20gJy4vZmlsZSdcblxuY29uc3QgTGlzdDogRkM8U2hvd1Byb3BlcnR5UHJvcHM+ID0gKHByb3BzKSA9PiAoPEZpbGUgd2lkdGg9ezEwMH0gey4uLnByb3BzfSAvPilcblxuZXhwb3J0IGRlZmF1bHQgTGlzdFxuIiwiaW1wb3J0IFJlYWN0LCB7IEZDIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBTaG93UHJvcGVydHlQcm9wcyB9IGZyb20gJ2FkbWluanMnXG5pbXBvcnQgeyBGb3JtR3JvdXAsIExhYmVsIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcblxuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlJ1xuXG5jb25zdCBTaG93OiBGQzxTaG93UHJvcGVydHlQcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBwcm9wZXJ0eSB9ID0gcHJvcHNcblxuICByZXR1cm4gKFxuICAgIDxGb3JtR3JvdXA+XG4gICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XG4gICAgICA8RmlsZSB3aWR0aD1cIjEwMCVcIiB7Li4ucHJvcHN9IC8+XG4gICAgPC9Gb3JtR3JvdXA+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hvd1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gXCJzdHlsZWQtY29tcG9uZW50c1wiO1xyXG5pbXBvcnQge1xyXG4gICAgQm94LFxyXG4gICAgSDIsXHJcbiAgICBINSxcclxuICAgIEg0LFxyXG4gICAgVGV4dCxcclxuICAgIElsbHVzdHJhdGlvbixcclxuICAgIElsbHVzdHJhdGlvblByb3BzLFxyXG4gICAgQnV0dG9uLFxyXG59IGZyb20gXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7XHJcblxyXG5pbXBvcnQgeyB1c2VUcmFuc2xhdGlvbiB9IGZyb20gXCJhZG1pbmpzXCI7XHJcblxyXG5jb25zdCBwYWdlSGVhZGVySGVpZ2h0ID0gMjg0O1xyXG5jb25zdCBwYWdlSGVhZGVyUGFkZGluZ1kgPSA3NDtcclxuY29uc3QgcGFnZUhlYWRlclBhZGRpbmdYID0gMjUwO1xyXG5cclxuZXhwb3J0IGNvbnN0IERhc2hib2FyZEhlYWRlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgdHJhbnNsYXRlTWVzc2FnZSB9ID0gdXNlVHJhbnNsYXRpb24oKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJveCBtdD1cIjIwcHhcIiBweD1cIjIwcHhcIj5cclxuICAgICAgICAgICAgPEgyPldlbGNvbWUsIEFkbWluPC9IMj5cclxuICAgICAgICA8L0JveD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgRGFzaGJvYXJkID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyB0cmFuc2xhdGVNZXNzYWdlLCB0cmFuc2xhdGVCdXR0b24gfSA9IHVzZVRyYW5zbGF0aW9uKCk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxCb3g+XHJcbiAgICAgICAgICAgICAgICA8c2VjdGlvblxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OlwiZmxleFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OlwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczpcImNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDpcIjMycHhcIlxyXG4gICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICA8cCBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvbnRTaXplOiBcIjNyZW1cIixcclxuICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiM3JlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6XCI3MDBcIlxyXG4gICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgT25lU3RvcCBcclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiM3JlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0Olwibm9ybWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOlwiIzI4MjgyOFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfX0+e1wiIFwifVxyXG4gICAgICAgICAgICAgICAgICAgIEFkbWluXHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkO1xyXG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBDb21wb25lbnQwIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvZWRpdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MCA9IENvbXBvbmVudDBcbmltcG9ydCBDb21wb25lbnQxIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvbGlzdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MSA9IENvbXBvbmVudDFcbmltcG9ydCBDb21wb25lbnQyIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvc2hvdydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MiA9IENvbXBvbmVudDJcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi4vYWRtaW5fcGFuZWwvdWkvcGFnZXMvZGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmQiXSwibmFtZXMiOlsiRWRpdCIsIl9yZWYiLCJwcm9wZXJ0eSIsInJlY29yZCIsIm9uQ2hhbmdlIiwicGFyYW1zIiwiX3JlZjIiLCJjdXN0b20iLCJwYXRoIiwiZmxhdCIsImdldCIsImZpbGVQYXRoUHJvcGVydHkiLCJrZXkiLCJrZXlQcm9wZXJ0eSIsImZpbGUiLCJmaWxlUHJvcGVydHkiLCJfdXNlU3RhdGUiLCJ1c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsIm9yaWdpbmFsS2V5Iiwic2V0T3JpZ2luYWxLZXkiLCJfdXNlU3RhdGUzIiwiX3VzZVN0YXRlNCIsImZpbGVzVG9VcGxvYWQiLCJzZXRGaWxlc1RvVXBsb2FkIiwidXNlRWZmZWN0IiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwib25VcGxvYWQiLCJmaWxlcyIsImhhbmRsZVJlbW92ZSIsImhhbmRsZU11bHRpUmVtb3ZlIiwic2luZ2xlS2V5IiwiaW5kZXgiLCJpbmRleE9mIiwiZmlsZXNUb0RlbGV0ZSIsImZpbGVzVG9EZWxldGVQcm9wZXJ0eSIsIm5ld1BhdGgiLCJtYXAiLCJjdXJyZW50UGF0aCIsImkiLCJuZXdQYXJhbXMiLCJzZXQiLCJjb25jYXQiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJfb2JqZWN0U3ByZWFkIiwiY29uc29sZSIsImxvZyIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIkZvcm1Hcm91cCIsIkxhYmVsIiwibGFiZWwiLCJEcm9wWm9uZSIsIm11bHRpcGxlIiwidmFsaWRhdGUiLCJtaW1lVHlwZXMiLCJtYXhTaXplIiwiRHJvcFpvbmVJdGVtIiwiZmlsZW5hbWUiLCJzcmMiLCJvblJlbW92ZSIsIkZyYWdtZW50IiwiQXVkaW9NaW1lVHlwZXMiLCJJbWFnZU1pbWVUeXBlcyIsIlNpbmdsZUZpbGUiLCJwcm9wcyIsIm5hbWUiLCJtaW1lVHlwZSIsIndpZHRoIiwiaW5jbHVkZXMiLCJzdHlsZSIsIm1heEhlaWdodCIsIm1heFdpZHRoIiwiYWx0IiwiY29udHJvbHMiLCJraW5kIiwiQm94IiwiQnV0dG9uIiwiYXMiLCJocmVmIiwibWwiLCJzaXplIiwicm91bmRlZCIsInRhcmdldCIsIkljb24iLCJpY29uIiwiY29sb3IiLCJtciIsIkZpbGUiLCJmaWxlTmFtZVByb3BlcnR5IiwibWltZVR5cGVQcm9wZXJ0eSIsIm9wdHMiLCJiYXNlVXJsIiwic2luZ2xlUGF0aCIsIkxpc3QiLCJfZXh0ZW5kcyIsIlNob3ciLCJEYXNoYm9hcmQiLCJfdXNlVHJhbnNsYXRpb24yIiwidXNlVHJhbnNsYXRpb24iLCJ0cmFuc2xhdGVNZXNzYWdlIiwidHJhbnNsYXRlQnV0dG9uIiwiZGlzcGxheSIsImp1c3RpZnlDb250ZW50IiwiYWxpZ25JdGVtcyIsIm1hcmdpblRvcCIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyIsIkNvbXBvbmVudDAiLCJDb21wb25lbnQxIiwiQ29tcG9uZW50MiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBS0EsSUFBTUEsSUFBMkIsR0FBRyxTQUE5QkEsSUFBMkJBLENBQUFDLElBQUEsRUFBdUM7RUFBQSxFQUFBLElBQWpDQyxRQUFRLEdBQUFELElBQUEsQ0FBUkMsUUFBUTtNQUFFQyxNQUFNLEdBQUFGLElBQUEsQ0FBTkUsTUFBTTtNQUFFQyxRQUFRLEdBQUFILElBQUEsQ0FBUkcsUUFBUSxDQUFBO0VBQy9ELEVBQUEsSUFBUUMsTUFBTSxHQUFLRixNQUFNLENBQWpCRSxNQUFNLENBQUE7SUFDZCxJQUFBQyxLQUFBLEdBQW1CSixRQUFRO01BQW5CSyxNQUFNLEdBQUFELEtBQUEsQ0FBTkMsTUFBTSxDQUFBO0lBRWQsSUFBTUMsSUFBSSxHQUFHQyxZQUFJLENBQUNDLEdBQUcsQ0FBQ0wsTUFBTSxFQUFFRSxNQUFNLENBQUNJLGdCQUFnQixDQUFDLENBQUE7SUFDdEQsSUFBTUMsR0FBRyxHQUFHSCxZQUFJLENBQUNDLEdBQUcsQ0FBQ0wsTUFBTSxFQUFFRSxNQUFNLENBQUNNLFdBQVcsQ0FBQyxDQUFBO0lBQ2hELElBQU1DLElBQUksR0FBR0wsWUFBSSxDQUFDQyxHQUFHLENBQUNMLE1BQU0sRUFBRUUsTUFBTSxDQUFDUSxZQUFZLENBQUMsQ0FBQTtFQUVsRCxFQUFBLElBQUFDLFNBQUEsR0FBc0NDLGNBQVEsQ0FBQ0wsR0FBRyxDQUFDO01BQUFNLFVBQUEsR0FBQUMsY0FBQSxDQUFBSCxTQUFB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
