import { InjectionToken, Input } from '@angular/core';

export type TextFieldAppearance = 'default' | 'floating-label' | 'box' | 'outline';
export const TEXT_FIELD_DEFAULT_APPEARANCE = new InjectionToken('TEXT_FIELD_DEFAULT_APPEARANCE');

export abstract class TextFieldBaseComponent {

  _appearance: TextFieldAppearance;

  @Input() helperText: string;
  @Input() invalidText: string;

  @Input()
  get appearance(): TextFieldAppearance {
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

  set appearance(value: TextFieldAppearance) {
    this._appearance = value;
  }

  protected constructor(private readonly _defaultAppearance: TextFieldAppearance) {
    this._defaultAppearance = _defaultAppearance || 'box';
  }
}
