import emoji from './emoji';

function escapeRegExp(string) {
  return string.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}

const codes = Object.keys(emoji).map(code => escapeRegExp(code)).join('|');
const EMOJI_REGEX = new RegExp(`(\`+)[\\s\\S]+?\\1|:(${codes}):`, 'g');

export default function docuteEmojify() {
  const replacer = (match, ticks, emojiCode) => (emoji[emojiCode] || match);

  return ({ beforeParse }) => {
    beforeParse(markdown => markdown.replace(EMOJI_REGEX, replacer));
  };
}
