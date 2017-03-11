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
 * @returns {Function} The Docute plugin.
 */
export default function docuteEmojify(options = {}) {
  const {
    aliases = {},
  } = options;

  const additionalAliases = Object.keys(aliases).reduce((accumulated, alias) => {
    if (!emoji.hasOwnProperty(alias)) { // eslint-disable-line no-prototype-builtins
      return accumulated;
    }

    const aliasValue = aliases[alias];

    if (typeof aliasValue === 'string' && aliasValue.trim()) {
      accumulated[aliasValue.trim()] = emoji[alias]; // eslint-disable-line no-param-reassign
    } else if (Array.isArray(aliasValue)) {
      aliasValue.filter(value => typeof value === 'string' && value.trim()).forEach((value) => {
        accumulated[value.trim()] = emoji[alias]; // eslint-disable-line no-param-reassign
      });
    }

    return accumulated;
  }, {});

  const mergedAliases = objectAssign(emoji, additionalAliases);
  const ALIAS_REGEX = Object.keys(mergedAliases).map(alias => escapeRegExp(alias)).join('|');
  const EMOJI_REGEX = new RegExp(`(\`+)[\\s\\S]+?\\1|:(${ALIAS_REGEX}):`, 'g');

  const replacer = (match, ticks, alias) => (emoji[alias] || match);

  return ({ beforeParse }) => {
    beforeParse(markdown => markdown.replace(EMOJI_REGEX, replacer));
  };
}
