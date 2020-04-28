import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Subject} from 'rxjs';

import {RippleDirective} from '../ripple/ripple.directive';

@Component({
  selector: 'u-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent extends RippleDirective {

  @HostListener('click') _click = () => {
    this._clicked.next();
  }

  @Input() tabId: any;

  private _active = false;
  set active(value: boolean) {
    if (this._active === value) {
      return;
    }

    this._active = value;

    if(value) {
      this._elementRef.nativeElement.classList.add('active');
    } else {
      this._elementRef.nativeElement.classList.remove('active');
    }
  }

  _clicked = new Subject<void>();

  constructor(public readonly _elementRef: ElementRef<HTMLElement>,
              private readonly _changeDetectorRef: ChangeDetectorRef,
              @Inject(DOCUMENT) _document: any) {
    super(_elementRef, _document);
    _elementRef.nativeElement.classList.add('u-tab');
  }
}
