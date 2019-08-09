export class ScrollableContainerWrapper {
  container: EventTarget | any;

  constructor(elementOrWindow: HTMLElement | Window) {
    this.container = elementOrWindow;
  }

  get scrollTop(): number {
    return this.container.scrollY ||
      this.container.scrollTop ||
      (this.container.body && this.container.body.scrollTop) || 0;
  }
}
