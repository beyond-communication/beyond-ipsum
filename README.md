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
  // Settings for the generator, see section 'Settings'
});

// Get a random sentence
const sentence = generator.getSentence();

console.log(sentence);
// e.g "Move heavy beyond nuttiest well move you've to in."
```

## Settings

```javascript
var generator = new BeyondIpsum({
  // Settings here
});
```

| Setting | Type | Default | Description |
| --- | --- | --- | --- |
| `words` | `Array` | The first 42 unique words in the lyrics of One Step beyond by Madness | The words to use |
| `sentenceLimits` | `Object` | `{min: 2, max: 9}` | Min/max words in a sentence |
| `headingLimits` | `Object` | `{min: 3, max: 6}` | Min/max words in a heading |
| `paragraphLimits` | `Object` | `{min: 4, max: 13}` |  Min/max sentences in a paragraph |
| `startSentence` | `String` / `boolean` | `false` |  Sentence to begin the first paragraph with, `false` if just random |
| `startHeading` | `String` / `boolean` | `false` |  Sentence to use as the first heading, `false` if just random |
| `format` | `String` | `<h1/><p/><h2/><p/><p/><h2/><p/>` | Describe the format of getFormattedContent(). Put the wanted tag names between `<` and `/>`. Heading tag names will generate headings in them, all other will generate a paragraph as their content |
| `allowRepeatedWords` | `Boolean` | `false` | If true, the same word can appear twice in a row |

## API

### getWord()

Get a random word from the pool of words. If setting `allowRepeatedWords` is `false`, this method will not return the same word twice in row.

#### Returns

{String} A word from the pool.

### getSentence()

#### Returns

{String} Random sentence made up from the pool of words.

### getHeading();

#### Returns

{String} Random text string suitable for headings.

### getParagraph()

#### Returns

{String} Paragraph of text made up from random sentences.

### getParagraphs(`numberOfParagraphs`)

#### Parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `numberOfParagraphs` | `Number` | 3 | Number of paragraps to return |

#### Returns

{String} Multiple paragraphs made up from random sentences.

### getFormattedContent()

#### Returns

{String} Formatted random text, based on the `format` setting.

### interpolate(`string`)

Replace occurences of, for example, `{{paragraph}}` in the submitted string with randomly generated paragraphs. Also available are `{{heading}}`, `{{sentence}}` and `{{word}}`.

#### Parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `string` | `String` | "" | The string to interpolate. |

#### Returns

{String} The same string as the one provided, but with the random good stuff interpolated.

### updateSettings(`newSettings`)

Update/overwrite the settings after instantiation.

#### Parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `newSettings` | `Object` | `{}` | Object with the settings to overwrite. |

#### Returns

{Object} The new settings object

### resetDefaultSettings()

Reset to the default settings after instantiation.

#### Returns

{Object} The new settings object
