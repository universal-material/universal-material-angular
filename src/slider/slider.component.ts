import { Component, computed, ElementRef, forwardRef, input, OnInit, signal, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const SliderValueAccessor = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SliderComponent),
  multi: true
};

@Component({
  selector: 'u-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [SliderValueAccessor],
  host: {
    '[attr.aria-minvalue]': 'minAsNumber()',
    '[attr.aria-maxvalue]': 'maxAsNumber()',
    '[attr.aria-disabled]': '_disabled()',
    '[attr.aria-valuenow]': '_value()',
  }
})
export class SliderComponent implements OnInit, ControlValueAccessor {

  readonly showTrack = input(false);
  readonly step = input<string | number>(1);
  readonly min = input<string | number>(0);
  readonly max = input<string | number>(100);

  protected readonly _disabled = signal(false);
  protected readonly _value = signal<number | null>(null);
  protected readonly _trackWidth = computed(() => {
    let value = this._value() || 0;

    const offset = this.maxAsNumber() - this.minAsNumber();
    value -= this.minAsNumber();

    const position = value * 100 / offset;
    return `${position}%`;
  });

  protected stepAsNumber = computed(() => {
    if (typeof this.step() === 'string') {
      return Number.parseInt(this.step() as string, 10);
    }

    return this.step() as number;
  });

  protected minAsNumber = computed(() => {
    if (typeof this.min() === 'string') {
      console.log(this.min());
      return Number.parseInt(this.min() as string, 10);
    }

    return this.min() as number;
  });

  protected maxAsNumber = computed(() => {
    if (typeof this.max() === 'string') {
      return Number.parseInt(this.max() as string, 10);
    }

    return this.max() as number;
  });

  private _onTouched = () => {}
  private _onChange = (_: any) => {}

  @ViewChild('input', {static: true}) inputRef!: ElementRef<HTMLInputElement>;

  static ngAcceptInputType_min: number | string;
  static ngAcceptInputType_max: number | string;
  static ngAcceptInputType_step: number | string;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    this.elementRef.nativeElement.setAttribute('role', 'slider');
    this.elementRef.nativeElement.setAttribute('aria-orientation', 'horizontal');
    this.elementRef.nativeElement.classList.add('u-slider');
  }

  ngOnInit() {
    this.inputRef.nativeElement.addEventListener(window.navigator.userAgent.indexOf('Trident/') > -1 ? 'change' : 'input',
      () => {
        this._value.set(this.inputRef.nativeElement.valueAsNumber);
        this._onChange(this.inputRef.nativeElement.valueAsNumber);
      });

    if (this._value() === undefined) {
      this._value.set(((this.maxAsNumber() - this.minAsNumber()) / 2) + this.minAsNumber());
      this._onChange(this._value());
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this._disabled.set(disabled);
  }

  writeValue(obj: any): void {
    this._value.set(obj);
  }
}
