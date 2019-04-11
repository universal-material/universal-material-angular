import { Component, ContentChild, Inject, InjectionToken, Input, Optional } from '@angular/core';
import { LabelDirective } from './label.directive';
import { InputBaseComponent } from '../shared/input-base.component';
import { FormFieldAppearance } from './form-field-appearance';


export const FORM_FIELD_DEFAULT_APPEARANCE = new InjectionToken('FORM_FIELD_DEFAULT_APPEARANCE');

@Component({
  selector: 'u-form-field',
  templateUrl: './form-field.component.html'
})
export class FormFieldComponent {

  _appearance: FormFieldAppearance;
  _defaultAppearance: FormFieldAppearance;

  @ContentChild(LabelDirective) _label: LabelDirective;
  _input: InputBaseComponent;

  @Input() invalid: boolean;
  @Input() helperText: string;
  @Input() invalidText: string;

  @Input()
  get appearance(): FormFieldAppearance {
    if (!this._appearance || this._appearance === 'default') {
      return this._defaultAppearance;
    }

    if (this._appearance === 'floating-label' ||
      this._appearance === 'box' ||
      this._appearance === 'outline') {
      return this._appearance;
    }

    return null;
  }

  set appearance(value: FormFieldAppearance) {
    this._appearance = value;
  }

  constructor(@Optional() @Inject(FORM_FIELD_DEFAULT_APPEARANCE) defaultAppearance: FormFieldAppearance) {
    this._defaultAppearance = defaultAppearance || 'box';
  }
}
