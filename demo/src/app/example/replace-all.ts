export function replaceAll(originalString: string, searchValue: string, replaceValue: string): string {
  while (originalString.indexOf(searchValue) > -1) {
    originalString = originalString.replace(searchValue, replaceValue);
  }

  return originalString;
}
