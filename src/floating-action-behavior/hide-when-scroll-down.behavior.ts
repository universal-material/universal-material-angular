export class HideWhenScrollDownBehavior {
  private _lastScrollY: number;

  private constructor(private readonly _window: Window,
                      private readonly _floatingActionAreaElement: HTMLElement) {
    this._window.addEventListener('scroll', this._setVisibility);
    this._lastScrollY = this._window.scrollY;
    this._floatingActionAreaElement.style.transition = 'transform 150ms linear';
  }

  static attach(window: Window, toolbarElement: HTMLElement): HideWhenScrollDownBehavior {
    return new HideWhenScrollDownBehavior(window, toolbarElement);
  }

  private _setVisibility = () => {
    if (this._lastScrollY < this._window.scrollY) {
      this._floatingActionAreaElement.style.transform = 'translateY(150%)';
    } else {
      this._floatingActionAreaElement.style.transform = '';
    }

    this._lastScrollY = this._window.scrollY;
  }

  destroy() {
    this._window.removeEventListener('scroll', this._setVisibility);
    this._floatingActionAreaElement.style.transition = '';
  }
}
