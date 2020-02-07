import animateScrollTo from 'animated-scroll-to';

export const smoothScrollLeft = (element: HTMLElement, scrollLeft: number) => {

  animateScrollTo([scrollLeft, null], {
    elementToScroll: element
  });
}
