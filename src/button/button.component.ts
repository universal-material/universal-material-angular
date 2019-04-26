import { Component, ElementRef, HostBinding, HostListener, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { RippleDirective } from '../ripple/ripple.directive';

const defaultStyle = 'solid';
const defaultColor = 'default';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[u-btn]',
  template: '<ng-content></ng-content>'
})
export class ButtonComponent extends RippleDirective implements OnInit, OnChanges {

  private _color: string;
  private _style: string;

  @Input('color') color;
  @Input('u-btn') style;

  constructor(elementRef: ElementRef,
              @Inject(DOCUMENT) document: any) {
    super(elementRef, document);
  }

  private _updateColorClass() {
    const newColor = this.color || defaultColor;

    if (newColor !== this._color) {
      this._elementRef.nativeElement.classList.remove(`u-btn-${this._color}`);
      this._elementRef.nativeElement.classList.add(`u-btn-${newColor}`);

      this._color = newColor;
    }
  }

  private _updateStyleClass() {
    const newStyle = this.style || defaultStyle;

    if (newStyle !== this._style) {
      this._elementRef.nativeElement.classList.remove(`u-btn-${this._style}`);
      this._elementRef.nativeElement.classList.add(`u-btn-${newStyle}`);

      this._style = newStyle;
    }
  }

  ngOnInit(): void {
    this._updateStyleClass();
    this._updateColorClass();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.style) {
      this._updateStyleClass();
    } else if (changes.color) {
      this._updateColorClass();
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
