export function truncateWord(word, maxLength) {
  if (word.length <= maxLength) {
    return word;
  } else {
    return word.slice(0, maxLength) + '...';
  }
}