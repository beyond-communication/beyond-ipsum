# beyond-ipsum

🔠 - A filler text generator defaulting to the beginning lyrics from the song [_One Step Beyond_](https://www.youtube.com/watch?v=N-uyWAe0NhQ) by _Madness_.

## Installation

#### npm:
```bash
npm install beyond-ipsum
```

#### HTML:
```html
<script src="beyond-ipsum.min.js"></script>
```

## Usage

#### ES6:
```javascript
import BeyondIpsum from 'beyond-ipsum';

const generator = new BeyondIpsum();
```

#### Browser:
```javascript
BeyondIpsum
// or
window.BeyondIpsum

// i.e
var generator = new BeyondIpsum();
```

## Example

```javascript
import BeyondIpsum from 'beyond-ipsum';

const generator = new BeyondIpsum({
  // Options for the generator, see section 'Options'
});

// Get a random sentence
const sentence = generator.getSentence();

console.log(sentence);
// e.g "Move heavy beyond nuttiest well move you've to in."
```

## Options

```javascript
var generator = new BeyondIpsum({
  // Options here
});
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `words` | `array` | The first 42 unique words in the lyrics of One Step beyond by Madness | The words to use |
| `sentenceLimits` | `object` | `{min: 2, max: 9}` | Min/max words in a sentence |
| `headlineLimits` | `object` | `{min: 3, max: 6}` | Min/max words in a headline |
| `paragraphLimits` | `object` | `{min: 4, max: 13}` |  Min/max sentences in a paragraph |
| `startSentence` | `string` / `boolean` | `false` |  Sentence to begin the first paragraph with, `false` if just random |
| `startHeadline` | `string` / `boolean` | `false` |  Sentence to use as the first headline, `false` if just random |
| `format` | `string` | '{h1}{p}{p}{h2}{p}{p}{h2}{p}' | Describe the format of getFormattedContent(). Put the wanted tag names between curly braces. |

## API

### generateRandomWord()

#### Returns

{String} Random word from the pool of words.

### getWord()

#### Returns

{String} Random word from the pool of words, that is not the exact same as the last generated word.

### getSentence()

#### Returns

{String} Random sentence made up from the pool of words.

### getHeadline();

#### Returns

{String} Random text string suitable for headlines.

### getParagraph()

#### Returns

{String} Paragraph of text made up from random sentences.

### getParagraphs(numberOfParagraphs)

#### Parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `numberOfParagraphs` | `Number` | 3 | Number of paragraps to return |

#### Returns

{String} Multiple paragraphs made up from random sentences.

### getFormattedContent()

#### Returns

{String} Formatted random text, based on the `format` option.
