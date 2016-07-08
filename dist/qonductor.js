var Qonductor =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _constants = __webpack_require__(2);\n\nvar _defaults = __webpack_require__(3);\n\nvar _QueueItem = __webpack_require__(4);\n\nvar _QueueItem2 = _interopRequireDefault(_QueueItem);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Qonductor = function () {\n  function Qonductor() {\n    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];\n\n    _classCallCheck(this, Qonductor);\n\n    var _getDefaults = (0, _defaults.getDefaults)();\n\n    var defaultAutoStart = _getDefaults.autoStart;\n    var defaultKeepHistory = _getDefaults.keepHistory;\n    var defaultMaxConcurrency = _getDefaults.maxConcurrency;\n    var defaultType = _getDefaults.type;\n    var _options$autoStart = options.autoStart;\n    var autoStart = _options$autoStart === undefined ? defaultAutoStart : _options$autoStart;\n    var _options$keepHistory = options.keepHistory;\n    var keepHistory = _options$keepHistory === undefined ? defaultKeepHistory : _options$keepHistory;\n    var _options$maxConcurren = options.maxConcurrency;\n    var maxConcurrency = _options$maxConcurren === undefined ? defaultMaxConcurrency : _options$maxConcurren;\n    var _options$type = options.type;\n    var type = _options$type === undefined ? defaultType : _options$type;\n\n\n    Object.assign(this, {\n      autoStart: autoStart,\n      completed: {},\n      completedCount: 0,\n      currentIndex: 0,\n      keepHistory: keepHistory,\n      hasFinished: false,\n      hasStarted: false,\n      maxConcurrency: maxConcurrency,\n      pending: {},\n      pendingCount: 0,\n      queue: {},\n      running: {},\n      runningCount: 0,\n      type: type.toLowerCase()\n    });\n  }\n\n  /**\n   * add the cancel function to the queueItem\n   * \n   * @param {object} queueItem\n   * @return {function(message): void}\n   * @private\n   */\n\n\n  _createClass(Qonductor, [{\n    key: '_addQueueItemCancel',\n    value: function _addQueueItemCancel(queueItem) {\n      return function (message) {\n        queueItem._publishCancellation(message);\n      };\n    }\n\n    /**\n     * remove the queueItem from the running / pending list and\n     * move to completed\n     * \n     * @param {number} index\n     * @param {object} queueItem\n     * @private\n     */\n\n  }, {\n    key: '_complete',\n    value: function _complete(index, queueItem) {\n      if (!this.completed[index]) {\n        if (this.keepHistory) {\n          this.completed[index] = queueItem;\n        }\n\n        this.completedCount++;\n      }\n\n      if (this.running[index]) {\n        delete this.running[index];\n        this.runningCount--;\n      } else if (this.pending[index]) {\n        delete this.pending[index];\n        this.pendingCount--;\n      }\n\n      delete this.queue[index];\n\n      if (this.hasStarted && this.pendingCount) {\n        this.start();\n      } else if (!this.runningCount && !this.pendingCount) {\n        this.hasFinished = true;\n      }\n    }\n\n    /**\n     * based on the type, return the next index to process\n     * \n     * @param {array<string>} keys\n     * @param {string} type\n     * @return {string}\n     * @private\n     */\n\n  }, {\n    key: '_getNextIndex',\n    value: function _getNextIndex(keys, type) {\n      if (!keys.length) {\n        return -1;\n      }\n\n      switch (type) {\n        case _constants.types.LIFO:\n          return Math.max.apply(this, keys);\n\n        case _constants.types.SIRO:\n          return keys[Math.floor(Math.random() * keys.length)];\n\n        default:\n          return Math.min.apply(this, keys);\n      }\n    }\n\n    /**\n     * add the function to the queue\n     * \n     * @param {function} fn\n     * @return {Promise}\n     */\n\n  }, {\n    key: 'add',\n    value: function add(fn) {\n      var _this = this;\n\n      var index = this.currentIndex;\n      var onSuccess = function onSuccess(data) {\n        _this._complete(queueItem.id, queueItem);\n\n        return data;\n      };\n      var onFail = function onFail(error) {\n        _this._complete(queueItem.id, queueItem);\n\n        return Promise.reject(error);\n      };\n      var queueItem = new _QueueItem2.default(index, fn, onSuccess, onFail);\n\n      this.queue[index] = queueItem;\n\n      this.currentIndex++;\n\n      this.pending[index] = queueItem;\n      this.pendingCount++;\n\n      queueItem.promise.cancel = this._addQueueItemCancel(queueItem);\n\n      if (this.autoStart && this.runningCount < this.maxConcurrency) {\n        this.start();\n      }\n\n      return queueItem.promise;\n    }\n\n    /**\n     * cancel all remaining promises in the queue\n     */\n\n  }, {\n    key: 'clear',\n    value: function clear() {\n      var _this2 = this;\n\n      Object.keys(this.queue).forEach(function (key) {\n        if (_this2.queue[key].status !== _constants.statuses.COMPLETED) {\n          _this2.queue[key].promise.cancel();\n        }\n      });\n    }\n\n    /**\n     * set the global defaults for Qonductor\n     *\n     * @param {object} newDefaults={}\n     * @returns {object}\n     */\n\n  }, {\n    key: 'start',\n\n\n    /**\n     * kick off the processing of the queue\n     */\n    value: function start() {\n      this.hasStarted = true;\n      this.hasFinished = false;\n\n      var running = this.runningCount;\n\n      while (++running <= this.maxConcurrency) {\n        var index = this._getNextIndex(Object.keys(this.pending), this.type);\n\n        if (index === -1) {\n          break;\n        }\n\n        var _queueItem = this.pending[index];\n\n        this.running[index] = _queueItem;\n        this.runningCount++;\n\n        delete this.pending[index];\n        this.pendingCount--;\n\n        _queueItem.run();\n      }\n    }\n  }], [{\n    key: 'setDefaults',\n    value: function setDefaults() {\n      var newDefaults = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];\n\n      return (0, _defaults.setDefaults)(newDefaults);\n    }\n  }]);\n\n  return Qonductor;\n}();\n\nexports.default = Qonductor;\nmodule.exports = exports['default'];\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvaW5kZXguanM/MWZkZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBzdGF0dXNlcyxcbiAgdHlwZXNcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5pbXBvcnQge1xuICBnZXREZWZhdWx0cyxcbiAgc2V0RGVmYXVsdHNcbn0gZnJvbSAnLi9kZWZhdWx0cyc7XG5cbmltcG9ydCBRdWV1ZUl0ZW0gZnJvbSAnLi9RdWV1ZUl0ZW0nO1xuXG5jbGFzcyBRb25kdWN0b3Ige1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBhdXRvU3RhcnQ6IGRlZmF1bHRBdXRvU3RhcnQsXG4gICAgICBrZWVwSGlzdG9yeTogZGVmYXVsdEtlZXBIaXN0b3J5LFxuICAgICAgbWF4Q29uY3VycmVuY3k6IGRlZmF1bHRNYXhDb25jdXJyZW5jeSxcbiAgICAgIHR5cGU6IGRlZmF1bHRUeXBlXG4gICAgfSA9IGdldERlZmF1bHRzKCk7XG5cbiAgICBjb25zdCB7XG4gICAgICBhdXRvU3RhcnQgPSBkZWZhdWx0QXV0b1N0YXJ0LFxuICAgICAga2VlcEhpc3RvcnkgPSBkZWZhdWx0S2VlcEhpc3RvcnksXG4gICAgICBtYXhDb25jdXJyZW5jeSA9IGRlZmF1bHRNYXhDb25jdXJyZW5jeSxcbiAgICAgIHR5cGUgPSBkZWZhdWx0VHlwZVxuICAgIH0gPSBvcHRpb25zO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XG4gICAgICBhdXRvU3RhcnQsXG4gICAgICBjb21wbGV0ZWQ6IHt9LFxuICAgICAgY29tcGxldGVkQ291bnQ6IDAsXG4gICAgICBjdXJyZW50SW5kZXg6IDAsXG4gICAgICBrZWVwSGlzdG9yeSxcbiAgICAgIGhhc0ZpbmlzaGVkOiBmYWxzZSxcbiAgICAgIGhhc1N0YXJ0ZWQ6IGZhbHNlLFxuICAgICAgbWF4Q29uY3VycmVuY3ksXG4gICAgICBwZW5kaW5nOiB7fSxcbiAgICAgIHBlbmRpbmdDb3VudDogMCxcbiAgICAgIHF1ZXVlOiB7fSxcbiAgICAgIHJ1bm5pbmc6IHt9LFxuICAgICAgcnVubmluZ0NvdW50OiAwLFxuICAgICAgdHlwZTogdHlwZS50b0xvd2VyQ2FzZSgpXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBjYW5jZWwgZnVuY3Rpb24gdG8gdGhlIHF1ZXVlSXRlbVxuICAgKiBcbiAgICogQHBhcmFtIHtvYmplY3R9IHF1ZXVlSXRlbVxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbihtZXNzYWdlKTogdm9pZH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hZGRRdWV1ZUl0ZW1DYW5jZWwocXVldWVJdGVtKSB7XG4gICAgcmV0dXJuIChtZXNzYWdlKSA9PiB7XG4gICAgICBxdWV1ZUl0ZW0uX3B1Ymxpc2hDYW5jZWxsYXRpb24obWVzc2FnZSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgdGhlIHF1ZXVlSXRlbSBmcm9tIHRoZSBydW5uaW5nIC8gcGVuZGluZyBsaXN0IGFuZFxuICAgKiBtb3ZlIHRvIGNvbXBsZXRlZFxuICAgKiBcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBxdWV1ZUl0ZW1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jb21wbGV0ZShpbmRleCwgcXVldWVJdGVtKSB7XG4gICAgaWYgKCF0aGlzLmNvbXBsZXRlZFtpbmRleF0pIHtcbiAgICAgIGlmICh0aGlzLmtlZXBIaXN0b3J5KSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVkW2luZGV4XSA9IHF1ZXVlSXRlbTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb21wbGV0ZWRDb3VudCsrO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJ1bm5pbmdbaW5kZXhdKSB7XG4gICAgICBkZWxldGUgdGhpcy5ydW5uaW5nW2luZGV4XTtcbiAgICAgIHRoaXMucnVubmluZ0NvdW50LS07XG4gICAgfSBlbHNlIGlmICh0aGlzLnBlbmRpbmdbaW5kZXhdKSB7XG4gICAgICBkZWxldGUgdGhpcy5wZW5kaW5nW2luZGV4XTtcbiAgICAgIHRoaXMucGVuZGluZ0NvdW50LS07XG4gICAgfVxuXG4gICAgZGVsZXRlIHRoaXMucXVldWVbaW5kZXhdO1xuXG4gICAgaWYgKHRoaXMuaGFzU3RhcnRlZCAmJiB0aGlzLnBlbmRpbmdDb3VudCkge1xuICAgICAgdGhpcy5zdGFydCgpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMucnVubmluZ0NvdW50ICYmICF0aGlzLnBlbmRpbmdDb3VudCkge1xuICAgICAgdGhpcy5oYXNGaW5pc2hlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGJhc2VkIG9uIHRoZSB0eXBlLCByZXR1cm4gdGhlIG5leHQgaW5kZXggdG8gcHJvY2Vzc1xuICAgKiBcbiAgICogQHBhcmFtIHthcnJheTxzdHJpbmc+fSBrZXlzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9nZXROZXh0SW5kZXgoa2V5cywgdHlwZSkge1xuICAgIGlmICgha2V5cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgdHlwZXMuTElGTzpcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KHRoaXMsIGtleXMpO1xuICAgICAgXG4gICAgICBjYXNlIHR5cGVzLlNJUk86XG4gICAgICAgIHJldHVybiBrZXlzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGtleXMubGVuZ3RoKV07XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBNYXRoLm1pbi5hcHBseSh0aGlzLCBrZXlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBmdW5jdGlvbiB0byB0aGUgcXVldWVcbiAgICogXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAqL1xuICBhZGQoZm4pIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY3VycmVudEluZGV4O1xuICAgIGNvbnN0IG9uU3VjY2VzcyA9IChkYXRhKSA9PiB7XG4gICAgICB0aGlzLl9jb21wbGV0ZShxdWV1ZUl0ZW0uaWQsIHF1ZXVlSXRlbSk7XG5cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgY29uc3Qgb25GYWlsID0gKGVycm9yKSA9PiB7XG4gICAgICB0aGlzLl9jb21wbGV0ZShxdWV1ZUl0ZW0uaWQsIHF1ZXVlSXRlbSk7XG5cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfTtcbiAgICBjb25zdCBxdWV1ZUl0ZW0gPSBuZXcgUXVldWVJdGVtKGluZGV4LCBmbiwgb25TdWNjZXNzLCBvbkZhaWwpO1xuXG4gICAgdGhpcy5xdWV1ZVtpbmRleF0gPSBxdWV1ZUl0ZW07XG5cbiAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xuXG4gICAgdGhpcy5wZW5kaW5nW2luZGV4XSA9IHF1ZXVlSXRlbTtcbiAgICB0aGlzLnBlbmRpbmdDb3VudCsrO1xuXG4gICAgcXVldWVJdGVtLnByb21pc2UuY2FuY2VsID0gdGhpcy5fYWRkUXVldWVJdGVtQ2FuY2VsKHF1ZXVlSXRlbSk7XG5cbiAgICBpZiAodGhpcy5hdXRvU3RhcnQgJiYgdGhpcy5ydW5uaW5nQ291bnQgPCB0aGlzLm1heENvbmN1cnJlbmN5KSB7XG4gICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHF1ZXVlSXRlbS5wcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbmNlbCBhbGwgcmVtYWluaW5nIHByb21pc2VzIGluIHRoZSBxdWV1ZVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5xdWV1ZSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAodGhpcy5xdWV1ZVtrZXldLnN0YXR1cyAhPT0gc3RhdHVzZXMuQ09NUExFVEVEKSB7XG4gICAgICAgIHRoaXMucXVldWVba2V5XS5wcm9taXNlLmNhbmNlbCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldCB0aGUgZ2xvYmFsIGRlZmF1bHRzIGZvciBRb25kdWN0b3JcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG5ld0RlZmF1bHRzPXt9XG4gICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAqL1xuICBzdGF0aWMgc2V0RGVmYXVsdHMobmV3RGVmYXVsdHMgPSB7fSkge1xuICAgIHJldHVybiBzZXREZWZhdWx0cyhuZXdEZWZhdWx0cyk7XG4gIH1cblxuICAvKipcbiAgICoga2ljayBvZmYgdGhlIHByb2Nlc3Npbmcgb2YgdGhlIHF1ZXVlXG4gICAqL1xuICBzdGFydCgpIHtcbiAgICB0aGlzLmhhc1N0YXJ0ZWQgPSB0cnVlO1xuICAgIHRoaXMuaGFzRmluaXNoZWQgPSBmYWxzZTtcblxuICAgIGxldCBydW5uaW5nID0gdGhpcy5ydW5uaW5nQ291bnQ7XG5cbiAgICB3aGlsZSAoKytydW5uaW5nIDw9IHRoaXMubWF4Q29uY3VycmVuY3kpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZ2V0TmV4dEluZGV4KE9iamVjdC5rZXlzKHRoaXMucGVuZGluZyksIHRoaXMudHlwZSk7XG5cbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHF1ZXVlSXRlbSA9IHRoaXMucGVuZGluZ1tpbmRleF07XG5cbiAgICAgIHRoaXMucnVubmluZ1tpbmRleF0gPSBxdWV1ZUl0ZW07XG4gICAgICB0aGlzLnJ1bm5pbmdDb3VudCsrO1xuXG4gICAgICBkZWxldGUgdGhpcy5wZW5kaW5nW2luZGV4XTtcbiAgICAgIHRoaXMucGVuZGluZ0NvdW50LS07XG5cbiAgICAgIHF1ZXVlSXRlbS5ydW4oKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUW9uZHVjdG9yO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2luZGV4LmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFJQTtBQUNBO0FBSUE7QUFDQTs7Ozs7OztBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQURBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTs7Ozs7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFVQTtBQUNBOzs7Ozs7Ozs7O0FBT0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQUlBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUFjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQTlCQTtBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7QUErQkE7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar STATUSES = {\n  CANCELLED: 'CANCELLED',\n  COMPLETED: 'COMPLETED',\n  FAILED: 'FAILED',\n  PENDING: 'PENDING',\n  RUNNING: 'RUNNING'\n};\n\nvar TYPES = {\n  FIFO: 'fifo',\n  LIFO: 'lifo',\n  SIRO: 'siro'\n};\n\nexports.statuses = STATUSES;\nexports.types = TYPES;\nexports.default = {\n  statuses: STATUSES,\n  types: TYPES\n};\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY29uc3RhbnRzLmpzP2E3NzQiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU1RBVFVTRVMgPSB7XG4gIENBTkNFTExFRDogJ0NBTkNFTExFRCcsXG4gIENPTVBMRVRFRDogJ0NPTVBMRVRFRCcsXG4gIEZBSUxFRDogJ0ZBSUxFRCcsXG4gIFBFTkRJTkc6ICdQRU5ESU5HJyxcbiAgUlVOTklORzogJ1JVTk5JTkcnXG59O1xuXG5jb25zdCBUWVBFUyA9IHtcbiAgRklGTzogJ2ZpZm8nLFxuICBMSUZPOiAnbGlmbycsXG4gIFNJUk86ICdzaXJvJ1xufTtcblxuZXhwb3J0IHtTVEFUVVNFUyBhcyBzdGF0dXNlc307XG5leHBvcnQge1RZUEVTIGFzIHR5cGVzfTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzdGF0dXNlczogU1RBVFVTRVMsXG4gIHR5cGVzOiBUWVBFU1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb25zdGFudHMuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFGQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar defaults = {\n  autoStart: true,\n  keepHistory: true,\n  maxConcurrency: 10,\n  type: 'fifo'\n};\n\n/**\n * get the current defaults\n *\n * @return {{autoStart: boolean, keepHistory: boolean, maxConcurrency: number, type: string}}\n */\nvar getDefaults = function getDefaults() {\n  return defaults;\n};\n\n/**\n * assign the keys in newDefaults to those in defaults if they exist in defaults\n *\n * @param {object} newDefaults={}\n * @return {{autoStart: boolean, keepHistory: boolean, maxConcurrency: number, type: string}}\n */\nvar setDefaults = function setDefaults() {\n  var newDefaults = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];\n\n  Object.keys(newDefaults).forEach(function (key) {\n    if (defaults.hasOwnProperty(key)) {\n      defaults[key] = newDefaults[key];\n    }\n  });\n\n  return defaults;\n};\n\nexports.getDefaults = getDefaults;\nexports.setDefaults = setDefaults;\nexports.default = {\n  getDefaults: getDefaults,\n  setDefaults: setDefaults\n};\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvZGVmYXVsdHMuanM/M2MyZCJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgZGVmYXVsdHMgPSB7XG4gIGF1dG9TdGFydDogdHJ1ZSxcbiAga2VlcEhpc3Rvcnk6IHRydWUsXG4gIG1heENvbmN1cnJlbmN5OiAxMCxcbiAgdHlwZTogJ2ZpZm8nXG59O1xuXG4vKipcbiAqIGdldCB0aGUgY3VycmVudCBkZWZhdWx0c1xuICpcbiAqIEByZXR1cm4ge3thdXRvU3RhcnQ6IGJvb2xlYW4sIGtlZXBIaXN0b3J5OiBib29sZWFuLCBtYXhDb25jdXJyZW5jeTogbnVtYmVyLCB0eXBlOiBzdHJpbmd9fVxuICovXG5jb25zdCBnZXREZWZhdWx0cyA9ICgpID0+IHtcbiAgcmV0dXJuIGRlZmF1bHRzO1xufTtcblxuLyoqXG4gKiBhc3NpZ24gdGhlIGtleXMgaW4gbmV3RGVmYXVsdHMgdG8gdGhvc2UgaW4gZGVmYXVsdHMgaWYgdGhleSBleGlzdCBpbiBkZWZhdWx0c1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBuZXdEZWZhdWx0cz17fVxuICogQHJldHVybiB7e2F1dG9TdGFydDogYm9vbGVhbiwga2VlcEhpc3Rvcnk6IGJvb2xlYW4sIG1heENvbmN1cnJlbmN5OiBudW1iZXIsIHR5cGU6IHN0cmluZ319XG4gKi9cbmNvbnN0IHNldERlZmF1bHRzID0gKG5ld0RlZmF1bHRzID0ge30pID0+IHtcbiAgT2JqZWN0LmtleXMobmV3RGVmYXVsdHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmIChkZWZhdWx0cy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBkZWZhdWx0c1trZXldID0gbmV3RGVmYXVsdHNba2V5XTtcbiAgICB9XG4gIH0pO1xuICBcbiAgcmV0dXJuIGRlZmF1bHRzO1xufTtcblxuZXhwb3J0IHtnZXREZWZhdWx0c307XG5leHBvcnQge3NldERlZmF1bHRzfTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXREZWZhdWx0cyxcbiAgc2V0RGVmYXVsdHNcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvZGVmYXVsdHMuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7Ozs7OztBQVdBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBIiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _waddup = __webpack_require__(5);\n\nvar _constants = __webpack_require__(2);\n\nvar _QueueError = __webpack_require__(6);\n\nvar _QueueError2 = _interopRequireDefault(_QueueError);\n\nvar _utils = __webpack_require__(7);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * get the done function with assigned success / fail actions based\n * on parameters passed to it\n * \n * @param {function} success\n * @param {function} fail\n * @return {function(data: string, error: QueueError): void}\n */\nvar getDone = function getDone(success, fail) {\n  return function (data, error) {\n    if (error) {\n      fail(error);\n    } else {\n      success(data);\n    }\n  };\n};\n\nvar QueueItem = function () {\n  function QueueItem(id, fn, onSuccess, onFail) {\n    _classCallCheck(this, QueueItem);\n\n    Object.assign(this, {\n      cancelId: null,\n      id: id,\n      isCancelled: false,\n      promiseId: null,\n      status: _constants.statuses.PENDING\n    });\n\n    this.promise = this._createPromiseWrapper(fn, onSuccess, onFail);\n  }\n\n  /**\n   * create the promise wrapper for the function passed\n   *\n   * @param {function} fn\n   * @param {function} onSuccess\n   * @param {function} onFail\n   * @return {Promise}\n   * @private\n   */\n\n\n  _createClass(QueueItem, [{\n    key: '_createPromiseWrapper',\n    value: function _createPromiseWrapper(fn, onSuccess, onFail) {\n      var _this = this;\n\n      var queuedFunction = (0, _utils.isFunction)(fn) ? fn : function (done) {\n        return done(fn);\n      };\n      var unsubscribeOnSuccess = this._getUnsubscribeOnResolve();\n      var unsubscribeOnFail = this._getUnsubscribeOnReject();\n\n      return new Promise(function (resolve, reject) {\n        var success = _this._resolvePromise(resolve);\n        var fail = _this._rejectPromise(reject);\n        var done = getDone(success, fail);\n\n        _this.cancelId = (0, _waddup.subscribe)(_constants.statuses.CANCELLED, function (topic, _ref) {\n          var id = _ref.id;\n          var message = _ref.message;\n\n          if (id === _this.id) {\n            _this.isCancelled = true;\n\n            _this._cancelPromise(reject, message);\n          }\n        });\n\n        _this.promiseId = (0, _waddup.subscribe)(_constants.statuses.RUNNING, function (topic, id) {\n          if (id === _this.id) {\n            queuedFunction(done);\n\n            (0, _waddup.unsubscribe)(_this.promiseId);\n          }\n        });\n      }).then(unsubscribeOnSuccess).catch(unsubscribeOnFail).then(onSuccess).catch(onFail);\n    }\n\n    /**\n     * cancel the existing promise, rejecting it with the message provided\n     *\n     * @param {function} reject\n     * @param {string} message\n     * @private\n     */\n\n  }, {\n    key: '_cancelPromise',\n    value: function _cancelPromise(reject, message) {\n      this.status = _constants.statuses.CANCELLED;\n\n      reject(new _QueueError2.default(message, _constants.statuses.CANCELLED));\n    }\n\n    /**\n     * publish the cancellation\n     *\n     * @param {string} message\n     * @private\n     */\n\n  }, {\n    key: '_publishCancellation',\n    value: function _publishCancellation(message) {\n      (0, _waddup.publish)(_constants.statuses.CANCELLED, {\n        id: this.id,\n        message: message\n      });\n    }\n\n    /**\n     * reject the promise with the error provided\n     *\n     * @param {function} reject\n     * @return {function(error: Error): void}\n     * @private\n     */\n\n  }, {\n    key: '_rejectPromise',\n    value: function _rejectPromise(reject) {\n      var _this2 = this;\n\n      return function (error) {\n        if (!_this2.isCancelled) {\n          _this2.status = _constants.statuses.FAILED;\n\n          reject(new _QueueError2.default(error));\n        }\n      };\n    }\n\n    /**\n     * resolve the promise with the data provided\n     *\n     * @param {function} resolve\n     * @return {function(data: any): void}\n     * @private\n     */\n\n  }, {\n    key: '_resolvePromise',\n    value: function _resolvePromise(resolve) {\n      var _this3 = this;\n\n      return function (data) {\n        if (!_this3.isCancelled) {\n          _this3.status = _constants.statuses.COMPLETED;\n\n          resolve(data);\n        }\n      };\n    }\n\n    /**\n     * unsubscribe the cancellation once the promise is rejected\n     *\n     * @return {function(error: Error): Promise}\n     * @private\n     */\n\n  }, {\n    key: '_getUnsubscribeOnReject',\n    value: function _getUnsubscribeOnReject() {\n      var _this4 = this;\n\n      return function (error) {\n        (0, _waddup.unsubscribe)(_this4.cancelId);\n\n        return Promise.reject(error);\n      };\n    }\n\n    /**\n     * unsubscribe the cancellation once the promise is resolved\n     *\n     * @return {function(data: any): Promise}\n     * @private\n     */\n\n  }, {\n    key: '_getUnsubscribeOnResolve',\n    value: function _getUnsubscribeOnResolve() {\n      var _this5 = this;\n\n      return function (data) {\n        (0, _waddup.unsubscribe)(_this5.cancelId);\n\n        return data;\n      };\n    }\n\n    /**\n     * publjsh that this queueItem is running\n     */\n\n  }, {\n    key: 'run',\n    value: function run() {\n      this.status = _constants.statuses.RUNNING;\n\n      (0, _waddup.publish)(_constants.statuses.RUNNING, this.id);\n    }\n  }]);\n\n  return QueueItem;\n}();\n\nexports.default = QueueItem;\nmodule.exports = exports['default'];\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvUXVldWVJdGVtLmpzPzYwYzgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgcHVibGlzaCxcbiAgc3Vic2NyaWJlLFxuICB1bnN1YnNjcmliZVxufSBmcm9tICd3YWRkdXAnO1xuXG5pbXBvcnQge1xuICBzdGF0dXNlc1xufSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmltcG9ydCBRdWV1ZUVycm9yIGZyb20gJy4vUXVldWVFcnJvcic7XG5cbmltcG9ydCB7XG4gIGlzRnVuY3Rpb25cbn0gZnJvbSAnLi91dGlscyc7XG5cbi8qKlxuICogZ2V0IHRoZSBkb25lIGZ1bmN0aW9uIHdpdGggYXNzaWduZWQgc3VjY2VzcyAvIGZhaWwgYWN0aW9ucyBiYXNlZFxuICogb24gcGFyYW1ldGVycyBwYXNzZWQgdG8gaXRcbiAqIFxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VjY2Vzc1xuICogQHBhcmFtIHtmdW5jdGlvbn0gZmFpbFxuICogQHJldHVybiB7ZnVuY3Rpb24oZGF0YTogc3RyaW5nLCBlcnJvcjogUXVldWVFcnJvcik6IHZvaWR9XG4gKi9cbmNvbnN0IGdldERvbmUgPSAoc3VjY2VzcywgZmFpbCkgPT4ge1xuICByZXR1cm4gKGRhdGEsIGVycm9yKSA9PiB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBmYWlsKGVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VjY2VzcyhkYXRhKTtcbiAgICB9XG4gIH07XG59O1xuXG5jbGFzcyBRdWV1ZUl0ZW0ge1xuICBjb25zdHJ1Y3RvcihpZCwgZm4sIG9uU3VjY2Vzcywgb25GYWlsKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XG4gICAgICBjYW5jZWxJZDogbnVsbCxcbiAgICAgIGlkLFxuICAgICAgaXNDYW5jZWxsZWQ6IGZhbHNlLFxuICAgICAgcHJvbWlzZUlkOiBudWxsLFxuICAgICAgc3RhdHVzOiBzdGF0dXNlcy5QRU5ESU5HXG4gICAgfSk7XG5cbiAgICB0aGlzLnByb21pc2UgPSB0aGlzLl9jcmVhdGVQcm9taXNlV3JhcHBlcihmbiwgb25TdWNjZXNzLCBvbkZhaWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSB0aGUgcHJvbWlzZSB3cmFwcGVyIGZvciB0aGUgZnVuY3Rpb24gcGFzc2VkXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9uU3VjY2Vzc1xuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbkZhaWxcbiAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jcmVhdGVQcm9taXNlV3JhcHBlcihmbiwgb25TdWNjZXNzLCBvbkZhaWwpIHtcbiAgICBjb25zdCBxdWV1ZWRGdW5jdGlvbiA9IGlzRnVuY3Rpb24oZm4pID8gZm4gOiAoZG9uZSkgPT4ge1xuICAgICAgcmV0dXJuIGRvbmUoZm4pO1xuICAgIH07XG4gICAgY29uc3QgdW5zdWJzY3JpYmVPblN1Y2Nlc3MgPSB0aGlzLl9nZXRVbnN1YnNjcmliZU9uUmVzb2x2ZSgpO1xuICAgIGNvbnN0IHVuc3Vic2NyaWJlT25GYWlsID0gdGhpcy5fZ2V0VW5zdWJzY3JpYmVPblJlamVjdCgpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLl9yZXNvbHZlUHJvbWlzZShyZXNvbHZlKTtcbiAgICAgIGNvbnN0IGZhaWwgPSB0aGlzLl9yZWplY3RQcm9taXNlKHJlamVjdCk7XG4gICAgICBjb25zdCBkb25lID0gZ2V0RG9uZShzdWNjZXNzLCBmYWlsKTtcblxuICAgICAgdGhpcy5jYW5jZWxJZCA9IHN1YnNjcmliZShzdGF0dXNlcy5DQU5DRUxMRUQsICh0b3BpYywge2lkLCBtZXNzYWdlfSkgPT4ge1xuICAgICAgICBpZiAoaWQgPT09IHRoaXMuaWQpIHtcbiAgICAgICAgICB0aGlzLmlzQ2FuY2VsbGVkID0gdHJ1ZTtcblxuICAgICAgICAgIHRoaXMuX2NhbmNlbFByb21pc2UocmVqZWN0LCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMucHJvbWlzZUlkID0gc3Vic2NyaWJlKHN0YXR1c2VzLlJVTk5JTkcsICh0b3BpYywgaWQpID0+IHtcbiAgICAgICAgaWYgKGlkID09PSB0aGlzLmlkKSB7XG4gICAgICAgICAgcXVldWVkRnVuY3Rpb24oZG9uZSk7XG5cbiAgICAgICAgICB1bnN1YnNjcmliZSh0aGlzLnByb21pc2VJZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pXG4gICAgICAudGhlbih1bnN1YnNjcmliZU9uU3VjY2VzcylcbiAgICAgIC5jYXRjaCh1bnN1YnNjcmliZU9uRmFpbClcbiAgICAgIC50aGVuKG9uU3VjY2VzcylcbiAgICAgIC5jYXRjaChvbkZhaWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbmNlbCB0aGUgZXhpc3RpbmcgcHJvbWlzZSwgcmVqZWN0aW5nIGl0IHdpdGggdGhlIG1lc3NhZ2UgcHJvdmlkZWRcbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gcmVqZWN0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY2FuY2VsUHJvbWlzZShyZWplY3QsIG1lc3NhZ2UpIHtcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1c2VzLkNBTkNFTExFRDtcblxuICAgIHJlamVjdChuZXcgUXVldWVFcnJvcihtZXNzYWdlLCBzdGF0dXNlcy5DQU5DRUxMRUQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwdWJsaXNoIHRoZSBjYW5jZWxsYXRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wdWJsaXNoQ2FuY2VsbGF0aW9uKG1lc3NhZ2UpIHtcbiAgICBwdWJsaXNoKHN0YXR1c2VzLkNBTkNFTExFRCwge1xuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICBtZXNzYWdlXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogcmVqZWN0IHRoZSBwcm9taXNlIHdpdGggdGhlIGVycm9yIHByb3ZpZGVkXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlamVjdFxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbihlcnJvcjogRXJyb3IpOiB2b2lkfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlamVjdFByb21pc2UocmVqZWN0KSB7XG4gICAgcmV0dXJuIChlcnJvcikgPT4ge1xuICAgICAgaWYgKCF0aGlzLmlzQ2FuY2VsbGVkKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzZXMuRkFJTEVEO1xuXG4gICAgICAgIHJlamVjdChuZXcgUXVldWVFcnJvcihlcnJvcikpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogcmVzb2x2ZSB0aGUgcHJvbWlzZSB3aXRoIHRoZSBkYXRhIHByb3ZpZGVkXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlc29sdmVcbiAgICogQHJldHVybiB7ZnVuY3Rpb24oZGF0YTogYW55KTogdm9pZH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZXNvbHZlUHJvbWlzZShyZXNvbHZlKSB7XG4gICAgcmV0dXJuIChkYXRhKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuaXNDYW5jZWxsZWQpIHtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXNlcy5DT01QTEVURUQ7XG5cbiAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIHVuc3Vic2NyaWJlIHRoZSBjYW5jZWxsYXRpb24gb25jZSB0aGUgcHJvbWlzZSBpcyByZWplY3RlZFxuICAgKlxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbihlcnJvcjogRXJyb3IpOiBQcm9taXNlfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldFVuc3Vic2NyaWJlT25SZWplY3QoKSB7XG4gICAgcmV0dXJuIChlcnJvcikgPT4ge1xuICAgICAgdW5zdWJzY3JpYmUodGhpcy5jYW5jZWxJZCk7XG5cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1bnN1YnNjcmliZSB0aGUgY2FuY2VsbGF0aW9uIG9uY2UgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWRcbiAgICpcbiAgICogQHJldHVybiB7ZnVuY3Rpb24oZGF0YTogYW55KTogUHJvbWlzZX1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9nZXRVbnN1YnNjcmliZU9uUmVzb2x2ZSgpIHtcbiAgICByZXR1cm4gKGRhdGEpID0+IHtcbiAgICAgIHVuc3Vic2NyaWJlKHRoaXMuY2FuY2VsSWQpO1xuXG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIHB1Ymxqc2ggdGhhdCB0aGlzIHF1ZXVlSXRlbSBpcyBydW5uaW5nXG4gICAqL1xuICBydW4oKSB7XG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXNlcy5SVU5OSU5HO1xuXG4gICAgcHVibGlzaChzdGF0dXNlcy5SVU5OSU5HLCB0aGlzLmlkKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBRdWV1ZUl0ZW07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvUXVldWVJdGVtLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFLQTtBQUNBO0FBR0E7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQVVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7Ozs7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7Ozs7Ozs7Ozs7O0FBUUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQVFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQU9BO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FBT0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFHQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("module.exports = undefined;\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCB7XCJhbWRcIjpcIndhZGR1cFwiLFwiY29tbW9uanNcIjpcIndhZGR1cFwiLFwiY29tbW9uanMyXCI6XCJ3YWRkdXBcIixcInJvb3RcIjpcIndhZGR1cFwifT80YWEzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gdW5kZWZpbmVkO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wiYW1kXCI6XCJ3YWRkdXBcIixcImNvbW1vbmpzXCI6XCJ3YWRkdXBcIixcImNvbW1vbmpzMlwiOlwid2FkZHVwXCIsXCJyb290XCI6XCJ3YWRkdXBcIn1cbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _constants = __webpack_require__(2);\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar CustomError = function (_Error) {\n  _inherits(CustomError, _Error);\n\n  function CustomError(message) {\n    _classCallCheck(this, CustomError);\n\n    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CustomError).call(this));\n\n    if (Error.hasOwnProperty('captureStackTrace')) {\n      Error.captureStackTrace(_this, _this.constructor);\n    } else {\n      Object.defineProperty(_this, 'stack', {\n        value: new Error().stack\n      });\n    }\n\n    Object.defineProperty(_this, 'message', {\n      value: message\n    });\n    return _this;\n  }\n\n  return CustomError;\n}(Error);\n\nvar QueueError = function (_CustomError) {\n  _inherits(QueueError, _CustomError);\n\n  function QueueError() {\n    var message = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];\n    var type = arguments.length <= 1 || arguments[1] === undefined ? _constants.statuses.FAILED : arguments[1];\n\n    _classCallCheck(this, QueueError);\n\n    return _possibleConstructorReturn(this, Object.getPrototypeOf(QueueError).call(this, 'Queue promise was rejected with status ' + type + (message ? ': ' : '.') + message));\n  }\n\n  return QueueError;\n}(CustomError);\n\nexports.default = QueueError;\nmodule.exports = exports['default'];\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvUXVldWVFcnJvci5qcz9jZjc5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIHN0YXR1c2VzXG59IGZyb20gJy4vY29uc3RhbnRzJztcblxuY2xhc3MgQ3VzdG9tRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKEVycm9yLmhhc093blByb3BlcnR5KCdjYXB0dXJlU3RhY2tUcmFjZScpKSB7XG4gICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdzdGFjaycsIHtcbiAgICAgICAgdmFsdWU6IChuZXcgRXJyb3IoKSkuc3RhY2tcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbWVzc2FnZScsIHtcbiAgICAgIHZhbHVlOiBtZXNzYWdlXG4gICAgfSk7XG4gIH1cbn1cblxuY2xhc3MgUXVldWVFcnJvciBleHRlbmRzIEN1c3RvbUVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSA9ICcnLCB0eXBlID0gc3RhdHVzZXMuRkFJTEVEKSB7XG4gICAgc3VwZXIoYFF1ZXVlIHByb21pc2Ugd2FzIHJlamVjdGVkIHdpdGggc3RhdHVzICR7dHlwZX0ke21lc3NhZ2UgPyAnOiAnIDogJy4nfSR7bWVzc2FnZX1gKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBRdWV1ZUVycm9yO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL1F1ZXVlRXJyb3IuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7Ozs7Ozs7QUFHQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFYQTtBQWNBO0FBQ0E7O0FBaEJBO0FBQ0E7QUFpQkE7OztBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQURBO0FBRUE7QUFDQTs7QUFKQTtBQUNBO0FBS0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 7 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar toString = function toString(object) {\n  return Object.prototype.toString.call(object);\n};\n\nvar isFunction = function isFunction(object) {\n  return toString(object) === '[object Function]' || typeof object === 'function';\n};\n\nvar isPromise = function isPromise(object) {\n  return !!object && isFunction(object.then);\n};\n\nexports.isFunction = isFunction;\nexports.isPromise = isPromise;\nexports.default = {\n  isFunction: isFunction,\n  isPromise: isPromise\n};\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvdXRpbHMuanM/MmI0YyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0b1N0cmluZyA9IChvYmplY3QpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpO1xufTtcblxuY29uc3QgaXNGdW5jdGlvbiA9IChvYmplY3QpID0+IHtcbiAgcmV0dXJuIHRvU3RyaW5nKG9iamVjdCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXScgfHwgdHlwZW9mIG9iamVjdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cbmNvbnN0IGlzUHJvbWlzZSA9IChvYmplY3QpID0+IHtcbiAgcmV0dXJuICEhb2JqZWN0ICYmIGlzRnVuY3Rpb24ob2JqZWN0LnRoZW4pO1xufTtcblxuZXhwb3J0IHtpc0Z1bmN0aW9ufTtcbmV4cG9ydCB7aXNQcm9taXNlfTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0Z1bmN0aW9uLFxuICBpc1Byb21pc2Vcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvdXRpbHMuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBIiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);