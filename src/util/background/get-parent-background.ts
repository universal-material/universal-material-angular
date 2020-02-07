export const getParentBackground = (element: HTMLElement) => {
  while (element.parentElement) {
    const styles = getComputedStyle(element.parentElement);
    if (styles.backgroundColor) {
      return styles.backgroundColor;
    }
  }

  return null;
}
