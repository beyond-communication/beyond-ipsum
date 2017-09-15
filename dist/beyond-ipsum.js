(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["BeyondIpsum"] = factory();
	else
		root["BeyondIpsum"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      beyond-ipsum by Isak Sandin under the MIT license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      https://github.com/beyondisak/beyond-ipsum
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _defaultWords = __webpack_require__(1);

var _defaultWords2 = _interopRequireDefault(_defaultWords);

var _utilities = __webpack_require__(2);

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var randomNumber = _utilities2.default.randomNumber;
var extend = _utilities2.default.extend;

var BeyondIpsum = function () {
  function BeyondIpsum() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BeyondIpsum);

    var defaultSettings = {
      words: _defaultWords2.default,

      startSentence: false,

      startHeadline: false,

      format: '\n        {h1}\n          {p}\n          {p}\n        {h2}\n          {p}\n          {p}\n        {h2}\n          {p}\n      ',

      sentenceLimits: {
        min: 2,
        max: 9
      },

      headlineLimits: {
        min: 3,
        max: 6
      },

      paragraphLimits: {
        min: 4,
        max: 13
      }
    };

    this.settings = extend({}, defaultSettings, options);

    this.lastWord = '';

    this._firstParagraphGenerated = false;
    this._firstHeadlineGenerated = false;
  }

  _createClass(BeyondIpsum, [{
    key: 'generateRandomWord',
    value: function generateRandomWord() {
      return this.settings.words[randomNumber(0, this.settings.words.length - 1)];
    }
  }, {
    key: 'getWord',
    value: function getWord() {
      var word = this.generateRandomWord();

      while (word === this.lastWord) {
        word = this.generateRandomWord();
      }

      this.lastWord = word;
      return word;
    }
  }, {
    key: 'getSentence',
    value: function getSentence() {
      var sentenceLength = randomNumber(this.settings.sentenceLimits.min, this.settings.sentenceLimits.max);
      var sentence = '';

      for (var i = 0; i < sentenceLength; i++) {
        sentence += this.getWord() + ' ';
      }

      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
      sentence = sentence.trim() + '.';

      return sentence;
    }
  }, {
    key: 'getHeadline',
    value: function getHeadline() {
      var headlineLength = randomNumber(this.settings.headlineLimits.min, this.settings.headlineLimits.max);
      var headline = '';

      if (!this._firstHeadlineGenerated && this.settings.startHeadline) {
        headline += this.settings.startHeadline + ' ';
        this._firstHeadlineGenerated = true;
      } else {
        for (var i = 0; i < headlineLength; i++) {
          headline += this.getWord() + ' ';
        }
      }

      headline = headline.charAt(0).toUpperCase() + headline.slice(1);
      headline = headline.trim();

      return headline;
    }
  }, {
    key: 'getParagraph',
    value: function getParagraph() {
      var paragraphLength = randomNumber(this.settings.paragraphLimits.min, this.settings.paragraphLimits.max);
      var paragraph = '';

      for (var x = 0; x < paragraphLength; x++) {

        if (!this._firstParagraphGenerated && this.settings.startSentence) {
          paragraph += this.settings.startSentence + ' ';
        } else {
          paragraph += this.getSentence() + ' ';
        }

        this._firstParagraphGenerated = true;
      }

      return paragraph.trim();
    }
  }, {
    key: 'getParagraphs',
    value: function getParagraphs() {
      var numberOfParagraphs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;


      var paragraphs = '';

      for (var i = 0; i < numberOfParagraphs; i++) {
        var paragraphLength = randomNumber(this.settings.paragraphLimits.min, this.settings.paragraphLimits.max);
        var paragraph = '';

        for (var x = 0; x < paragraphLength; x++) {
          paragraph += this.getSentence() + ' ';
        }

        if (i === 0 && this.settings.startSentence) {
          paragraphs += '<p>' + this.settings.startSentence + ' ' + paragraph + '</p>';
        } else {
          paragraphs += '<p>' + paragraph + '</p>';
        }
      }

      return paragraphs.trim();
    }
  }, {
    key: 'getFormattedContent',
    value: function getFormattedContent() {
      var _this = this;

      var elements = this.settings.format.match(/{\s*[\w\.]+\s*}/g);

      var content = '';

      if (elements) {
        elements.forEach(function (element) {
          var elementType = element.match(/[\w\.]+/)[0];

          if (elementType === 'h1' || elementType === 'h2') {
            content += '<' + elementType + '>' + _this.getHeadline() + '</' + elementType + '>';
          } else {
            content += '<' + elementType + '>' + _this.getParagraph() + '</' + elementType + '>';
          }
        });
      }

      return content;
    }
  }]);

  return BeyondIpsum;
}();

module.exports = BeyondIpsum;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ['hey', 'you', 'don\'t', 'watch', 'that', 'this', 'is', 'the', 'heavy', 'monster', 'sound', 'nuttiest', 'around', 'so', 'if', 'you\'ve', 'come', 'in', 'from', 'street', 'and', 'you\'re', 'beginning', 'to', 'feel', 'heat', 'well', 'listen', 'buster', 'better', 'start', 'move', 'your', 'feet', 'rockinest', 'rock-steady', 'beat', 'of', 'madness', 'one', 'step', 'beyond'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function extend() {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
        arguments[0][key] = arguments[i][key];
      }
    }
  }

  return arguments[0];
}

exports.default = {
  randomNumber: randomNumber,
  extend: extend
};

/***/ })
/******/ ]);
});