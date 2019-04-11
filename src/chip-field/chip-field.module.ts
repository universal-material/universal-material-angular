import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChipFieldComponent } from './chip-field.component';
import { ChipInputDirective } from './chip-input.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChipFieldComponent, ChipInputDirective],
  exports: [ChipFieldComponent, ChipInputDirective]
})
export class ChipFieldModule { }
