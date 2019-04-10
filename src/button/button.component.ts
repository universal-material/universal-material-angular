import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Ripple } from '@universal-material/core';

const defaultButton = 'solid';
const defaultColor = 'default';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[u-btn]',
  template: '<ng-content></ng-content>'
})
export class ButtonComponent implements AfterViewInit {

  protected _ripple: Ripple;

  @HostBinding('class')
  get classNames(): string {
    return `u-btn-${this.color || defaultColor} u-btn-${this.uBtn || defaultButton}`;
  }

  @Input('color') color;
  @Input('u-btn') uBtn;

  constructor(private readonly _elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    this._ripple = Ripple.attach(this._elementRef.nativeElement);
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'a[u-btn]',
  template: '<ng-content></ng-content>'
})
export class LinkButtonComponent extends ButtonComponent implements OnChanges, AfterViewInit {

  @HostBinding('class.disabled') get _disabled() {
    return this.disabled;
  }

  @Input() disabled: boolean;

  @HostListener('click', ['$event']) clicked($event: Event) {
    if (this.disabled) {
      $event.preventDefault();
    }
  }

  constructor(_elementRef: ElementRef) {
    super(_elementRef);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this._ripple && changes.disabled) {
      this._ripple.disabled = changes.disabled.currentValue;
    }
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this._ripple.disabled = this.disabled;
  }
}
