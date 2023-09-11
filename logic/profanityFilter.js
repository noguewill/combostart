const {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} = require("obscenity");

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

export const profanityCheck = (userTextInput) => {
  if (matcher.hasMatch(userTextInput)) {
    return true;
  }
};
