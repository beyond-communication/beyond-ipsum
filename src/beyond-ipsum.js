/*
 beyond-ipsum by Isak Sandin under the MIT license
 https://github.com/beyondisak/beyond-ipsum
*/

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class BeyondIpsum {

  constructor(options = {}) {

    const defaultSettings = {
      words: [
        'hey',
        'you',
        'don\'t',
        'watch',
        'that',
        'this',
        'is',
        'the',
        'heavy',
        'monster',
        'sound',
        'nuttiest',
        'around',
        'so',
        'if',
        'you\'ve',
        'come',
        'in',
        'from',
        'street',
        'and',
        'you\'re',
        'beginning',
        'to',
        'feel',
        'heat',
        'well',
        'listen',
        'buster',
        'better',
        'start',
        'move',
        'your',
        'feet',
        'rockinest',
        'rock-steady',
        'beat',
        'of',
        'madness',
        'one',
        'step',
        'beyond',
      ],

      startSentence: 'Hey you, don\'t watch that. Watch this!',

      format: `
        {h1}
          {p}
          {p}
        {h2}
          {p}
          {p}
        {h2}
          {p}
          {p}
      `,

      limits: {
        paragraph: {
          min: 3,
          max: 15,
        }
      },

      paragraphLimits: {
        min: 3,
        max: 13,
      },

      sentenceLimits: {
        min: 3,
        max: 9,
      },

      headlineLimits: {
        min: 3,
        max: 6,
      },
    };

    this.settings = Object.assign({}, defaultSettings, options);

    this.lastWord = '';
  }

  generateWord() {
    return this.settings.words[randomNumber(0, this.settings.words.length - 1)];
  }

  getWord() {
    let word = this.generateWord();

    while (word === this.lastWord) {
      word = this.generateWord();
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

    for (var i = 0; i < headlineLength; i++) {
      headline += this.getWord() + ' ';
    }

    headline = headline.charAt(0).toUpperCase() + headline.slice(1);
    headline = headline.trim();

    return headline;
  }

  getParagraph() {
    const paragraphLength = randomNumber(this.settings.paragraphLimits.min, this.settings.paragraphLimits.max);
    let paragraph = '';

    for (var x = 0; x < paragraphLength; x++) {
      paragraph += this.getSentence() + ' ';
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

export default BeyondIpsum;
