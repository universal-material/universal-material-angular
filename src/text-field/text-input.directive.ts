import { Directive, ElementRef, forwardRef, Inject, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

import { TextInputBase } from '../shared/text-input-base';
import { FormFieldComponent } from '../form-field/form-field.component';

@Directive({
  selector: '[uTextInput]'
})
export class TextInputDirective extends TextInputBase {

  constructor(@Optional() @Self() readonly ngControl: NgControl,
              @Optional() @Inject(forwardRef(() => FormFieldComponent)) formField: FormFieldComponent,
              elementRef: ElementRef) {
    super(ngControl, formField, elementRef);
    elementRef.nativeElement.classList.add('u-text-input');
  }
}
