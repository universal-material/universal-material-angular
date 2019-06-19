import { Component, ContentChild, Inject, InjectionToken, Input, Optional } from '@angular/core';
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

  _appearanceClass: string;
  _appearance: FormFieldAppearance;
  _defaultAppearance: FormFieldAppearance;

  @ContentChild(LabelDirective) _label: LabelDirective;
  _input: InputBaseComponent;

  @Input() invalid: boolean;
  @Input() removeMargin: boolean;
  @Input() helperText: string;
  @Input() errorMessage: string;

  @Input()
  get appearance(): FormFieldAppearance {
    return this._appearance;
  }
  set appearance(value: FormFieldAppearance) {
    this._appearance = value;

    if (!value || value === 'default') {
      this._appearanceClass = this._defaultAppearance;
    }

    if (value.indexOf('search') > -1) {
      this._appearanceClass = value === 'search-elevated'
        ? 'u-search-field u-search-field-elevated'
        : 'u-search-field';
      return;
    }

    this._appearanceClass = `u-text-field-${value}`;
  }


  constructor(@Optional() @Inject(FORM_FIELD_DEFAULT_APPEARANCE) defaultAppearance: FormFieldAppearance) {
    this._defaultAppearance = defaultAppearance || 'box';
    this.appearance = this._defaultAppearance;
  }
}
