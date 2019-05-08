import { Component, ElementRef, HostBinding, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { RippleDirective } from '../ripple/ripple.directive';

@Component({
  selector: 'u-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent extends RippleDirective {

  @HostBinding('class.active') active: boolean;

  _clicked = new Subject<void>();

  @HostListener('click') _click = () => {
    this._clicked.next();
  }

  constructor(public _elementRef: ElementRef,
              @Inject(DOCUMENT) _document: any) {
    super(_elementRef, _document)
    _elementRef.nativeElement.classList.add('u-tab');
  }
}
