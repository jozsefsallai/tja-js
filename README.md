# TJA parser for JavaScript and Node.js

`tja.js` is a parsing library for the TJA (Taikojiro) file format. This format
is used by Taiko simulators. It contains the metadata and the notation for all
of the song's difficulty levels.

**Disclaimer:** The library is in early development and may undergo several
breaking changes after receiving community feedback.

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

...or if you're in a browser environment:

```html
<script src="https://cdn.jsdelivr.net/npm/tja@0.1/dist/browser/tja.min.js"></script>
<script>
  const { TJAParser } = window.TJA;
</script>
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

## Attributions

Thanks to [bui][bui-profile-url] for providing a comprehensive specification for
the TJA format. The documentation was also mostly based on this their guide.

Here are some additional sources they've linked in their guide:

- [".tja フォーマット"][aioilight-url] (.tja format) - AioiLight.space. _(dead link)_
- ["仕様"][taikojiro-wiki-url] (Specifications) - 太鼓さん次郎交流 Wiki (Taiko Jiro Kouryuu Wiki).
- ["譜面追加　自分で作る"][taikojiro-guide-url] (Adding charts, creating one yourself) - 太鼓さん次郎解説 (Taiko Jiro Kaisetsu).
- ["CDTX.cs"][tjaplayer3-cdtx-url] - AioiLight/TJAPlayer3 repository.

## License

MIT.

[docs-url]: https://jozsefsallai.github.io/tja-js/
[bui-profile-url]: https://github.com/bui
[aioilight-url]: https://aioilight.space/taiko/tjap3/doc/tja/
[taikojiro-wiki-url]: https://wikiwiki.jp/jiro/%E5%A4%AA%E9%BC%93%E3%81%95%E3%82%93%E6%AC%A1%E9%83%8E
[taikojiro-guide-url]: http://taikosanjiro.hatenablog.com/entry/%E8%AD%9C%E9%9D%A2-2
[tjaplayer3-cdtx-url]: https://github.com/AioiLight/TJAPlayer3/blob/master/TJAPlayer3/Songs/CDTX.cs
