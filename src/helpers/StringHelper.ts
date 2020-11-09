// eslint-disable-next-line import/prefer-default-export
export function subStringWithWords(text: string, symbolCount: number): string {
  if (symbolCount >= text.length) {
    return text;
  }
  const subString = text.slice(0, symbolCount + 1);
  const spaceIndex = subString.lastIndexOf(' ');
  return `${subString.slice(0, spaceIndex)}...`;
}
