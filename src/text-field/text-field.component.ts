import { Component, ContentChild, Inject, Input, Optional } from '@angular/core';
import { TextInputDirective } from './text-input.directive';
import { TEXT_FIELD_DEFAULT_APPEARANCE, TextFieldAppearance, TextFieldBaseComponent } from '../shared/text-field-base.component';
import { LabelDirective } from './label.directive';

@Component({
  selector: 'u-text-field',
  templateUrl: './text-field.component.html'
})
export class TextFieldComponent extends TextFieldBaseComponent {

  @Input() invalid: boolean;

  @ContentChild(TextInputDirective) _input: TextInputDirective;
  @ContentChild(LabelDirective) _label: LabelDirective;

  constructor(@Optional() @Inject(TEXT_FIELD_DEFAULT_APPEARANCE) defaultAppearance: TextFieldAppearance) {
    super(defaultAppearance);
  }
}
