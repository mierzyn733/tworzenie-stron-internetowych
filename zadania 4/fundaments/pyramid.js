function pyramid(char, levels, inverted) {
  let result = '\n';
  for (let i = 0; i < levels; i++) {
    let spaces, chars;
    if (!inverted) {
      spaces = ' '.repeat(levels - i - 1);
      chars = char.repeat(2 * i + 1);
    } else {
      spaces = ' '.repeat(i);
      chars = char.repeat(2 * (levels - i) - 1);
    }
    result += spaces + chars + '\n';
  }
  return result;
}