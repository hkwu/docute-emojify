const chalk = require('chalk');
const fs = require('fs');
const got = require('got');
const path = require('path');
const { version } = require('../package.json');

const EMOJI_DATA = 'https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json';
const EMOJI_PATH = path.resolve(__dirname, '../src/emoji.js');

console.log(chalk`{yellow Fetching emoji data from} {green ${EMOJI_DATA}}{yellow .}`);

(async () => {
  try {
    const { body } = await got(EMOJI_DATA, {
      'User-Agent': `docute-emojify/${version} (https://github.com/hkwu/docute-emojify)`,
    });
    const entries = JSON.parse(body);
    const scraped = {};

    entries.filter(entry => entry.emoji).forEach(({ emoji, aliases }) => {
      aliases.forEach((alias) => {
        scraped[alias] = emoji;
      });
    });

    const stringified = JSON.stringify(scraped, null, 2);
    const emojiFile = fs.readFileSync(EMOJI_PATH, 'utf8');

    fs.writeFileSync(EMOJI_PATH, emojiFile.replace(/(export default )\{[\s\S]+}/, `$1${stringified}`));

    console.log(chalk`{green Success!}`);
  } catch (error) {
    console.error(chalk`{red ${error}}`);
  }
})();
