export class FloatWhenScrollBehavior {

  private constructor(private readonly _scrollContainer: Window,
                      private readonly _toolbarElement: Element) {
    this._scrollContainer.addEventListener('scroll', this._setElevation);
    this._setElevation();
  }

  static attach(scrollContainer: Window, toolbarElement: Element): FloatWhenScrollBehavior {
    return new FloatWhenScrollBehavior(scrollContainer, toolbarElement);
  }

  private _setElevation = () => {
    if (this._scrollContainer['scrollY'] ||
      this._scrollContainer['scrollTop'] ||
      (this._scrollContainer['body'] && this._scrollContainer['body']['scrollTop'])) {
      this._toolbarElement.classList.add('elevation-2dp');
      this._toolbarElement.classList.remove('elevation-0');
    } else {
      this._toolbarElement.classList.add('elevation-0');
      this._toolbarElement.classList.remove('elevation-2dp');
    }
  }

  destroy() {
    this._scrollContainer.removeEventListener('scroll', this._setElevation);
  }
}
