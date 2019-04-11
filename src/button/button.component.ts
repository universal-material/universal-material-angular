import { Component, ElementRef, HostBinding, HostListener, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { RippleDirective } from '../ripple/ripple.directive';

const defaultButton = 'solid';
const defaultColor = 'default';

const roundClickableConfig = {
  size: 40,
  borderRadius: '50%'
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[u-btn]',
  template: '<ng-content></ng-content>'
})
export class ButtonComponent extends RippleDirective implements OnChanges {

  protected _ripple: RippleDirective;

  @HostBinding('class')
  get classNames(): string {
    return `u-btn-${this.color || defaultColor} u-btn-${this.uBtn || defaultButton}`;
  }

  @Input('color') color;
  @Input('u-btn') uBtn;

  constructor(elementRef: ElementRef,
              @Inject(DOCUMENT) document: any) {
    super(elementRef, document);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.uBtn.currentValue === 'borderless') {
      this.rippleConfig = roundClickableConfig;
    } else {
      this.rippleConfig = {};
    }
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'a[u-btn]',
  template: '<ng-content></ng-content>'
})
export class LinkButtonComponent extends ButtonComponent {

  @HostBinding('class.disabled') get _disabled() {
    return this.disabled;
  }

  @Input() disabled: boolean;

  @HostListener('click', ['$event']) clicked($event: Event) {
    if (this.disabled) {
      $event.preventDefault();
    }
  }

  constructor(elementRef: ElementRef,
              @Inject(DOCUMENT) document: any) {
    super(elementRef, document);
  }
}
