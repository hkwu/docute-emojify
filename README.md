# docute-emojify
[![npm](https://img.shields.io/npm/v/docute-emojify.svg?style=flat-square)](https://www.npmjs.com/package/docute-emojify)
[![npm](https://img.shields.io/npm/dm/docute-emojify.svg?style=flat-square)](https://www.npmjs.com/package/docute-emojify)

[Docute](https://v3.docute.org) plugin for transforming emoji aliases within Markdown.

## Installation
Get the UMD build and load it before you initialize Docute inside your `index.html` file:

```html
<script src="https://unpkg.com/docute-emojify"></script>
```

Then, configure the plugin.

```js
docute.init({
  plugins: [
    docuteEmojify(),
  ],
});
```

This plugin requires Docute v3.

## Usage
Emoji aliases will be replaced with their respective Unicode characters within your Markdown documents. For instance,

```markdown
This is **Markdown** with :100: emoji support :ok_hand:
```

will render as

> This is **Markdown** with 💯 emoji support 👌

All emoji aliases are scraped from the [gemoji](https://github.com/github/gemoji) repository.

### Adding Aliases
You can add additional aliases for existing emoji by providing an `aliases` object when you configure the plugin.

```js
docuteEmojify({
  aliases: {
    100: 'hundo',
    thinking: [
      'thunking',
      'thonk',
    ],
  },
});
```

This will replace `:hundo:` with 💯 and `:thunking:` or `:thonk:` with 🤔.

### Blacklisting Aliases
Aliases may be blacklisted by providing an array of aliases as the `blacklist` option.

```js
docuteEmojify({
  blacklist: [
    '100',
    '+1',
  ],
});
```

This will make `:100:` and `:+1:` render as typed rather than as an emoji character.

### Emojifying Code
By default, aliases found in code formatting (i.e. surrounded by matching backticks) are not transformed. This behaviour can be toggled using the `emojifyCode` option.

```js
docuteEmojify({
  emojifyCode: true,
});
```

We will now see

````markdown
See emoji code below `:+1:`

```
:100:
```
````

render as

> See emoji code below `👍`
>
> ```
> 💯
> ```
