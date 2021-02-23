import { Component, ElementRef, forwardRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const SliderValueAcessor = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SliderComponent),
  multi: true
};

@Component({
  selector: 'u-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [SliderValueAcessor]
})
export class SliderComponent implements OnInit, ControlValueAccessor {

  @Input() step = 1;
  @Input() showTrack: boolean;
  @HostBinding('attr.aria-minvalue') @Input() min: number;
  @HostBinding('attr.aria-maxvalue') @Input() max: number;
  @HostBinding('attr.aria-label') @Input() label: string;
  @HostBinding('attr.aria-disabled') _disabled: boolean;
  @HostBinding('attr.aria-valuenow') _value: number;
  _trackWidth: string;

  private _onTouched = () => {}
  private _onChange = (_: any) => {}

  @ViewChild('input', {static: true}) inputRef: ElementRef<HTMLInputElement>;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    this.elementRef.nativeElement.setAttribute('role', 'slider');
    this.elementRef.nativeElement.setAttribute('aria-orientation', 'horizontal');
    this.elementRef.nativeElement.classList.add('u-slider');
  }

  private _setThumbAndTrack() {

    let value = this._value;

    const offset = this.max - this.min;
    value -= this.min;

    const position = value * 100 / offset;
    this._trackWidth = `${position}%`;
  }

  ngOnInit() {
    this.inputRef.nativeElement.addEventListener(window.navigator.userAgent.indexOf('Trident/') > -1 ? 'change' : 'input',
      () => {
        this._value = this.inputRef.nativeElement.valueAsNumber;
        this._onChange(this.inputRef.nativeElement.valueAsNumber);
        this._setThumbAndTrack();
      });

    if (typeof this.step === 'string') {
      this.step = parseFloat(this.step);
    }

    if (typeof this.min === 'string') {
      this.min = parseInt(this.min, 10);
    }

    if (typeof this.max === 'string') {
      this.max = parseInt(this.max, 10);
    }

    if (this._value === undefined) {
      this._value = ((this.max - this.min) / 2) + this.min;
      this._onChange(this._value);

      this._setThumbAndTrack();
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this._disabled = disabled;
  }

  writeValue(obj: any): void {
    this._value = obj;
    this._setThumbAndTrack();
  }
}
