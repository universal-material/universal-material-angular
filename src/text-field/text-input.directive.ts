import {
  Directive,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  Optional,
  Self
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { TextInputBase } from '../shared/text-input-base';
import { FormFieldComponent } from '../form-field/form-field.component';

@Directive({
  selector: '[uTextInput]'
})
export class TextInputDirective extends TextInputBase {

  @Input()
  @HostBinding('class.u-text-input')
  setInputClass = true;

  constructor(@Optional() @Self() override readonly ngControl: NgControl,
              @Optional() @Inject(forwardRef(() => FormFieldComponent)) formField: FormFieldComponent,
              elementRef: ElementRef) {
    super(ngControl, formField, elementRef);
  }
}
