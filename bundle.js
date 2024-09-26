/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.css":
/*!*******************!*\
  !*** ./index.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./index.css?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);\nfunction _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _iterableToArray(r) { if (\"undefined\" != typeof Symbol && null != r[Symbol.iterator] || null != r[\"@@iterator\"]) return Array.from(r); }\nfunction _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }\nfunction _createForOfIteratorHelper(r, e) { var t = \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && \"number\" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t[\"return\"] || t[\"return\"](); } finally { if (u) throw o; } } }; }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\n\nvar MESSAGES_LOCALSTORAGE = \"MESSAGES\";\nvar dropdownButton = document.querySelector(\".header__dropdown-button\");\nvar dropdownMenu = document.querySelector(\".header__dropdown\");\nvar form = document.querySelector(\"form\");\nvar formButtonSend = document.querySelector(\".form__button-send\");\nvar input = document.querySelector(\".form-input\");\nvar messagesBox = document.querySelector(\".messages\");\nvar messagesInner = document.querySelector(\".message__inner\");\nvar messages = [];\nloadMessagesFromLocalStorage();\nform.addEventListener(\"submit\", handleSubmit.bind(undefined));\nform.addEventListener(\"keypress\", handleKeyPress.bind(undefined));\nformButtonSend.addEventListener('click', handleSubmit.bind(undefined));\ndropdownButton.addEventListener(\"click\", toggleDropdown);\nfunction toggleDropdown() {\n  dropdownMenu.classList.toggle(\"header__dropdown--open\");\n}\nfunction closeDropdown() {\n  dropdownMenu.classList.remove(\"header__dropdown--open\");\n}\ndocument.addEventListener(\"click\", function (e) {\n  if (dropdownMenu.classList.contains(\"header__dropdown--open\") && !e.target.classList.contains('header__dropdown-item') && !e.target.classList.contains('header__dropdown-button')) {\n    closeDropdown();\n  }\n});\nfunction handleSubmit(event) {\n  event.preventDefault();\n  if (input.value !== \"\") {\n    var message = {\n      text: input.value,\n      name: \"me\",\n      time: transformDate(new Date())\n    };\n    createNewMessage(message);\n    addMessagesToLocalStorage(message);\n    input.value = \"\";\n  }\n}\nfunction handleKeyPress(event) {\n  if (event.keyCode === 13) {\n    form.dispatchEvent(new Event(\"submit\"));\n  }\n}\nfunction loadMessagesFromLocalStorage() {\n  var json = localStorage.getItem(MESSAGES_LOCALSTORAGE);\n  if (json !== null) {\n    var messagesFromLocalStorage = JSON.parse(json);\n    var _iterator = _createForOfIteratorHelper(messagesFromLocalStorage),\n      _step;\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var message = _step.value;\n        createNewMessage(message);\n        messages.push(message);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  }\n}\nfunction addMessagesToLocalStorage(newMessage) {\n  messages = [].concat(_toConsumableArray(messages), [newMessage]);\n  localStorage.setItem(MESSAGES_LOCALSTORAGE, JSON.stringify(messages));\n}\nfunction createNewMessage(newMessage) {\n  var message = document.createElement(\"div\");\n  var messageText = document.createElement(\"div\");\n  var messageInfo = document.createElement(\"div\");\n  var messageInfoTime = document.createElement(\"div\");\n  var messageInfoIcons = document.createElement(\"div\");\n  message.append(messageText);\n  message.append(messageInfo);\n  messageInfo.append(messageInfoTime);\n  messageInfo.append(messageInfoIcons);\n  message.className = \"message\";\n  messageText.className = \"message__text\";\n  messageInfo.className = \"message__info\";\n  messageInfoTime.className = \"message__info-time\";\n  messageInfoIcons.className = \"material-icons message__info-icons\";\n  messageText.innerText = newMessage.text;\n  messageInfoTime.innerText = newMessage.time;\n  messageInfoIcons.innerText = \"done_all\";\n  messagesInner.append(message);\n  messagesBox.scrollTop = messagesBox.scrollHeight;\n}\nfunction transformDate(date) {\n  return \"\".concat(addZero(date.getHours()), \":\").concat(addZero(date.getMinutes()));\n  function addZero(number) {\n    return number < 10 ? \"0\".concat(number) : number;\n  }\n}\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });