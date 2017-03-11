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

const aliases = Object.keys(emoji).map(alias => escapeRegExp(alias)).join('|');
const EMOJI_REGEX = new RegExp(`(\`+)[\\s\\S]+?\\1|:(${aliases}):`, 'g');

/**
 * Plugin which replaces emoji colon forms with their equivalent unicode character.
 * @returns {Function} The Docute plugin.
 */
export default function docuteEmojify() {
  const replacer = (match, ticks, alias) => (emoji[alias] || match);

  return ({ beforeParse }) => {
    beforeParse(markdown => markdown.replace(EMOJI_REGEX, replacer));
  };
}
