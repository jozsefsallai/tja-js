# TJA parser for JavaScript and Node.js

`tja.js` is a parsing library for the TJA (Taikojiro) file format. This format
is used by Taiko simulators. It contains the metadata and the notation for all
of the song's difficulty levels.

## Getting Started

**1. Install the library:**

```sh
npm install tja
# or
yarn add tja
```

**2. Import the parser:**

```js
import { TJAParser } from 'tja';

// or

const { TJAParser } = require('tja');
```

**3. Parse a TJA file:**

```js
const contents = fs.readFileSync('Saitama2000.tja', 'utf8');
try {
  const song = TJAParser.parse(contents);
  console.log(song);
} catch (e) {
  console.error(e);
}
```

Please refer to the [documentation][docs-url] for more information about the
models, properties, and methods that are at your disposal.

## TODO

- Support for `#SENOTECHANGE`
- Unit tests

## License

MIT.

[docs-url]: https://jozsefsallai.github.io/tja-js/
