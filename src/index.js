import emoji from './emoji';

const EMOJI_REGEX = /:(\w+):/g;

export default function docuteEmojify() {
  return ({ beforeParse }) => {
    beforeParse(markdown => markdown.replace(EMOJI_REGEX, (match, emojiCode) => emoji[emojiCode] || emojiCode)); // eslint-disable-line max-len
  };
}
