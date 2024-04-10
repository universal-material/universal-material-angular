import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  InjectionToken,
  Input,
  Optional,
  Output,
  ViewChild
} from '@angular/core';
import { LabelDirective } from './label.directive';
import { InputBaseComponent } from '../shared/input-base.component';
import { FormFieldAppearance } from './form-field-appearance';

export const FORM_FIELD_DEFAULT_APPEARANCE = new InjectionToken('FORM_FIELD_DEFAULT_APPEARANCE');

@Component({
  selector: 'u-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {

  _appearanceClass!: string;
  _appearance!: FormFieldAppearance;
  _defaultAppearance: FormFieldAppearance;
  _input: InputBaseComponent | null = null;
  _hasLabel = false;

  @HostBinding('class.u-form-field-selection')
  @Input() selectionField = false;

  set labelWidth(width: number) {
    this._elementRef.nativeElement.style.setProperty('--u-text-field-label-width', `${width}px`);
    this._elementRef.nativeElement.style.setProperty('--u-text-field-label-half-width', `${width / 2}px`);
  }

  @HostBinding('style.margin-bottom')
  get removeMarginStyle() {
    return this.removeMargin ? '0' : '';
  }

  @Input() invalid = false;
  @Input() removeMargin = false;
  @Input() supportingText: string | null = null;
  @Input() errorText: string | null = null;
  @Output() activated = new EventEmitter<void>();

  @Input()
  get appearance(): FormFieldAppearance {
    return this._appearance;
  }
  set appearance(value: FormFieldAppearance) {
    this._appearance = value;

    if (!value || value === 'default') {
      value = this._defaultAppearance;
    }

    if (value.indexOf('search') > -1) {
      this._appearanceClass = 'u-search-field';
      return;
    }

    this._appearanceClass = `u-text-field-${value}`;
  }

  constructor(readonly _elementRef: ElementRef,
              @Optional() @Inject(FORM_FIELD_DEFAULT_APPEARANCE) defaultAppearance: FormFieldAppearance) {
    this._defaultAppearance = defaultAppearance || 'box';
    this.appearance = this._defaultAppearance;
    _elementRef.nativeElement.classList.add('u-form-field');
  }

  click(): void {

    if (!this._input?.disabled) {
      this._input?.focus();
      this.activated.next();
    }
  }

  @HostListener('mousedown', ['$event'])
  mouseDown(e: MouseEvent): void {
    if (!this._input?.disabled) {
      e.preventDefault();
    }
  }
}
