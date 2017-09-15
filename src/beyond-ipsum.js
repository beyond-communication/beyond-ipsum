/*
 beyond-ipsum by Isak Sandin under the MIT license
 https://github.com/beyondisak/beyond-ipsum
*/

import defaultWords from './includes/default-words';
import utils from './includes/utilities';

const randomNumber = utils.randomNumber;
const extend = utils.extend;

class BeyondIpsum {

  constructor(options = {}) {

    const defaultSettings = {
      words: defaultWords,

      startSentence: false,

      startHeadline: false,

      format: `
        {h1}
          {p}
          {p}
        {h2}
          {p}
          {p}
        {h2}
          {p}
      `,

      sentenceLimits: {
        min: 2,
        max: 9,
      },

      headlineLimits: {
        min: 3,
        max: 6,
      },

      paragraphLimits: {
        min: 4,
        max: 13,
      },
    };

    this.settings = extend({}, defaultSettings, options);

    this.lastWord = '';

    this._firstParagraphGenerated = false;
    this._firstHeadlineGenerated = false;
  }

  generateRandomWord() {
    return this.settings.words[randomNumber(0, this.settings.words.length - 1)];
  }

  getWord() {
    let word = this.generateRandomWord();

    while (word === this.lastWord) {
      word = this.generateRandomWord();
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
    const headlineLength = randomNumber(this.settings.headlineLimits.min, this.settings.headlineLimits.max);
    let headline = '';

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
    let elements = this.settings.format.match(/{\s*[\w\.]+\s*}/g);

    let content = '';

    if (elements) {
      elements.forEach((element) => {
        const elementType = element.match(/[\w\.]+/)[0];

        if (elementType === 'h1' || elementType === 'h2') {
          content += `<${elementType}>${this.getHeadline()}</${elementType}>`;

        } else {
          content += `<${elementType}>${this.getParagraph()}</${elementType}>`;
        }
      });
    }

    return content;
  }
}

module.exports = BeyondIpsum;