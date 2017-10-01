/*
 beyond-ipsum by Isak Sandin under the MIT license
 https://github.com/beyondisak/beyond-ipsum
*/

import defaultWords from './includes/default-words';
import utils from './includes/utilities';

const randomNumber = utils.randomNumber;
const extend = utils.extend;
const deprecated = utils.deprecated;

const defaultSettings = {
  words: defaultWords,

  allowRepeatedWords: false,

  startSentence: false,

  startHeading: false,

  format: `
    <h1/>
      <p/>
    <h2/>
      <p/>
      <p/>
    <h2/>
      <p/>
  `,

  sentenceLimits: {
    min: 2,
    max: 9,
  },

  headingLimits: {
    min: 3,
    max: 6,
  },

  paragraphLimits: {
    min: 4,
    max: 13,
  },
};

class BeyondIpsum {

  constructor(settings = {}) {
    this.settings = extend({}, defaultSettings, settings);

    this.lastWord = '';

    this._firstParagraphGenerated = false;
    this._firstHeadingGenerated = false;
  }

  updateSettings(newSettings = {}) {
    this.settings = extend({}, this.settings, newSettings);

    return this.settings;
  }

  resetDefaultSettings() {
    this.settings = extend({}, defaultSettings);

    return this.settings;
  }

  getWord() {
    let word = this.settings.words[randomNumber(0, this.settings.words.length - 1)];

    if (!this.settings.allowRepeatedWords) {
      while (word === this.lastWord) {
        word = this.settings.words[randomNumber(0, this.settings.words.length - 1)];
      }
    }

    this.lastWord = word;

    return word;
  }

  getSentence() {
    const sentenceLength = randomNumber(this.settings.sentenceLimits.min, this.settings.sentenceLimits.max);
    let sentence = '';

    for (var i = 0; i < sentenceLength; i++) {
      sentence += this.getWord() + ' ';
    }

    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    sentence = sentence.trim() + '.';

    return sentence;
  }

  getHeadline() {
    deprecated('getHeadline() is deprecated and will be removed in the next major version (v2.x.x). Use getHeading instead.');
    return this.getHeading();
  }

  getHeading() {
    const headingLength = randomNumber(this.settings.headingLimits.min, this.settings.headingLimits.max);
    let heading = '';

    if (!this._firstHeadingGenerated && this.settings.startHeading) {
      heading += this.settings.startHeading + ' ';
      this._firstHeadingGenerated = true;

    } else {
      for (var i = 0; i < headingLength; i++) {
        heading += this.getWord() + ' ';
      }
    }

    heading = heading.charAt(0).toUpperCase() + heading.slice(1);
    heading = heading.trim();

    return heading;
  }

  getParagraph() {
    const paragraphLength = randomNumber(this.settings.paragraphLimits.min, this.settings.paragraphLimits.max);
    let paragraph = '';

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

  getParagraphs(numberOfParagraphs = 3) {

    let paragraphs = '';

    for (var i = 0; i < numberOfParagraphs; i++) {
      const paragraphLength = randomNumber(this.settings.paragraphLimits.min, this.settings.paragraphLimits.max);
      let paragraph = '';

      for (var x = 0; x < paragraphLength; x++) {
        paragraph += this.getSentence() + ' ';
      }

      if (i === 0 && this.settings.startSentence) {
        paragraphs += `<p>${this.settings.startSentence} ${paragraph}</p>`;
      } else {
        paragraphs += `<p>${paragraph}</p>`;
      }
    }

    return paragraphs.trim();
  }

  getFormattedContent() {

    this._firstParagraphGenerated = false;
    this._firstHeadingGenerated = false;

    let elements = this.settings.format.match(/<\s*[\w\.]+\s*\/>|{\s*[\w\.]+\s*}/g);

    let content = '';

    if (elements) {
      elements.forEach((element) => {
        const elementType = element.match(/[\w\.]+/)[0];

        if (elementType === 'h1' || elementType === 'h2') {
          content += `<${elementType}>${this.getHeading()}</${elementType}>`;

        } else {
          content += `<${elementType}>${this.getParagraph()}</${elementType}>`;
        }
      });
    }

    return content;
  }

  interpolate(string = '') {
    this._firstParagraphGenerated = false;
    this._firstHeadingGenerated = false;

    const types = {
      '{{heading}}': this.getHeading,
      '{{paragraph}}': this.getParagraph,
      '{{sentence}}': this.getSentence,
      '{{word}}': this.getWord,
    };

    for (let type in types) {
      if (types.hasOwnProperty(type)) {
        let toInterpolate = string.match(new RegExp(type, 'g'));

        if (toInterpolate) {
          toInterpolate.forEach((interpolation) => {
            string = string.replace(interpolation, types[type].apply(this));
          });
        }
      }
    }

    return string;
  }
}

module.exports = BeyondIpsum;
