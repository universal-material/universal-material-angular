import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextFieldDirective } from './text-field.directive';
import { TextFieldComponent } from './text-field.component';
import { TextInputDirective } from './text-input.directive';
import { LabelDirective } from './label.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LabelDirective,
    TextFieldComponent,
    TextFieldDirective,
    TextInputDirective
  ],
  exports: [
    LabelDirective,
    TextFieldComponent,
    TextFieldDirective,
    TextInputDirective
  ]
})
export class TextFieldModule {

}
