import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

export class ScrollableContainerWrapper {
  private _container: EventTarget | any;
  defaultTarget: EventTarget | any;

  _innerScrollTop = new BehaviorSubject<number | null>(null);

  scrollTop: number | null = null;
  scrollTop$: Observable<number | null> = this._innerScrollTop.pipe(distinctUntilChanged());

  private _emitScroll = () => {
    this.scrollTop = this._getScrollTop();
    this._innerScrollTop.next(this.scrollTop);
  };

  private _getScrollTop(): number | null{
    if (typeof this._container.scrollY === 'number') {
      return this._container.scrollY;
    }

    if (typeof this._container.scrollTop === 'number') {
      return this._container.scrollTop;
    }

    if (this._container.body && typeof this._container.body.scrollTop === 'number') {
      return this._container.body.scrollTop;
    }

    return null;
  }

  get container(): EventTarget | any {
    return this._container;
  }

  set container(value: EventTarget | any) {
    value = value || this.defaultTarget;
    if (value === this._container) {
      return;
    }

    if (this._container) {
      this._container.removeEventListener('scroll', this._emitScroll);
    }

    this._container = value;

    if (this._container) {
      this._container.addEventListener('scroll', this._emitScroll);
    }

    this._emitScroll();
  }
}
