# docute-emojify
[![npm](https://img.shields.io/npm/v/docute-emojify.svg?style=flat-square)](https://www.npmjs.com/package/docute-emojify)
[![npm](https://img.shields.io/npm/dm/docute-emojify.svg?style=flat-square)](https://www.npmjs.com/package/docute-emojify)

[Docute](https://docute.js.org) plugin for supporting GitHub style emoji aliases within Markdown. Requires Docute >=2.9.

## Installation
Get the UMD build and place it before `config.js` inside your `index.html` file:

```html
<script src="https://unpkg.com/docute-emojify"></script>
```

Then, configure the plugin within `config.js`.

```js
self.$config = {
  plugins: [
    docuteEmojify(),
  ],
};
```

## Usage
Emoji aliases will be replaced with their respective Unicode characters within your Markdown documents. For instance,

```markdown
This is **Markdown** with :100: emoji support :ok_hand:
```

will render as

> This is **Markdown** with 💯 emoji support 👌

All emoji aliases are scraped from the [gemoji](https://github.com/github/gemoji) repository.
