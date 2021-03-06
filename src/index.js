import objectAssign from 'object-assign';
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

/**
 * Plugin which replaces emoji colon forms with their equivalent unicode character.
 * @param {Object} [options={}] - The options for the plugin.
 * @param {Object} [options.aliases={}] - Additional emoji aliases to use. Keys
 *   are the original emoji aliases. Values can be a string or an array of strings
 *   representing the additional aliases to add.
 * @param {string[]} [options.blacklist=[]] - Emoji aliases which will be ignored
 *   when emojifying Markdown.
 * @param {boolean} [options.emojifyCode=false] - Whether or not to transform
 *   aliases found in Markdown code formatting.
 * @returns {Function} The Docute plugin.
 */
export default function docuteEmojify(options = {}) {
  const {
    aliases = {},
    blacklist = [],
    emojifyCode = false,
  } = options;

  const blacklistHash = blacklist.reduce((accumulated, alias) => {
    if (typeof alias === 'string') {
      accumulated[alias] = true;
    }

    return accumulated;
  }, {});

  const additionalAliases = Object.keys(aliases).reduce((accumulated, alias) => {
    if (!emoji.hasOwnProperty(alias)) {
      return accumulated;
    }

    const aliasValue = aliases[alias];

    if (typeof aliasValue === 'string' && aliasValue.trim()) {
      accumulated[aliasValue.trim()] = emoji[alias];
    } else if (Array.isArray(aliasValue)) {
      aliasValue.filter(value => typeof value === 'string' && value.trim()).forEach((value) => {
        accumulated[value.trim()] = emoji[alias];
      });
    }

    return accumulated;
  }, {});

  const mergedAliases = objectAssign(emoji, additionalAliases);
  const aliasRegex = Object.keys(mergedAliases)
    .filter(alias => !Object.prototype.hasOwnProperty.call(blacklistHash, alias))
    .map(alias => escapeRegExp(alias))
    .join('|');
  const emojiRegex = new RegExp(emojifyCode ? `():(${aliasRegex}):` : `(\`+)[\\s\\S]+?\\1|:(${aliasRegex}):`, 'g');
  const replacer = (match, ticks, alias) => (emoji[alias] || match);

  return ({ beforeParse }) => {
    beforeParse(markdown => markdown.replace(emojiRegex, replacer));
  };
}
