import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectionControlComponent } from './selection-control.component';
import { RippleModule } from '../ripple/ripple.module';

export { SelectionControlComponent } from './selection-control.component';
export { SelectionControlAppearance } from './selection-control-appearance';

@NgModule({
  imports: [
    CommonModule,
    RippleModule
  ],
  declarations: [SelectionControlComponent],
  exports: [SelectionControlComponent]
})
export class SelectionControlModule { }
