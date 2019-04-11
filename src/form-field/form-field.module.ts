import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFieldComponent } from './form-field.component';
import { LabelDirective } from './label.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormFieldComponent,
    LabelDirective
  ],
  exports: [
    FormFieldComponent,
    LabelDirective
  ]
})
export class FormFieldModule { }
