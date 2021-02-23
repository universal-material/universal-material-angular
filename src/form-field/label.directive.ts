import { Directive, forwardRef, Inject, Optional } from '@angular/core';

import { FormFieldComponent } from './form-field.component';

@Directive({
  selector: '[uLabel]'
})
export class LabelDirective {
  constructor(@Optional() @Inject(forwardRef(() => FormFieldComponent)) formField: FormFieldComponent) {
    if (formField) {
      formField._hasLabel = true;
    }
  }
}
