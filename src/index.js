import emoji from './emoji';

/**
 * Escapes RegEx special characters.
 * @param {string} string - The string to escape.
 * @returns {string} The escaped string.
 * @private
 */
function escapeRegExp(string) {
  return string.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}

const codes = Object.keys(emoji).map(code => escapeRegExp(code)).join('|');
const EMOJI_REGEX = new RegExp(`(\`+)[\\s\\S]+?\\1|:(${codes}):`, 'g');

/**
 * Plugin which replaces emoji colon forms with their equivalent unicode character.
 * @returns {Function} The Docute plugin.
 */
export default function docuteEmojify() {
  const replacer = (match, ticks, emojiCode) => (emoji[emojiCode] || match);

  return ({ beforeParse }) => {
    beforeParse(markdown => markdown.replace(EMOJI_REGEX, replacer));
  };
}
