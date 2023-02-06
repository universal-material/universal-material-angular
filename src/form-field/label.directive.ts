import { Directive, ElementRef, forwardRef, Inject, Optional } from '@angular/core';

import { FormFieldComponent } from './form-field.component';

@Directive({
  selector: '[uLabel]'
})
export class LabelDirective {
  constructor(elementRef: ElementRef<HTMLElement>,
              @Optional() @Inject(forwardRef(() => FormFieldComponent)) formField: FormFieldComponent) {
    if (formField) {
      elementRef.nativeElement.classList.add('u-text-field-label');
      formField._hasLabel = true;
    }
  }
}
