# beyond-ipsum

🔠 - A filler text generator defaulting to the beginning lyrics from the song [_One Step Beyond_](https://www.youtube.com/watch?v=N-uyWAe0NhQ) by [_Madness_](https://en.wikipedia.org/wiki/Madness_(band%29)

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
| `words` | `array` | `// The first 42 unique words in the lyrics of One Step beyond by Madness` | The words to use |
| `sentenceLimits` | `object` | `{min: 2, max: 9}` | Min/max words in a sentence |
| `headlineLimits` | `object` | `{min: 3, max: 6}` | Min/max words in a headline |
| `paragraphLimits` | `object` | `{min: 4, max: 13}` |  Min/max sentences in a paragraph |
| `startSentence` | `string` / `boolean` | `false` |  Sentence to begin the first paragraph with, `false` if just random |
| `startHeadline` | `string` / `boolean` | `false` |  Sentence to use as the first headline, `false` if just random |
