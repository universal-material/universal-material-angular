import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from '../dropdown/dropdown.module';
import { SelectComponent } from './select.component';
import { OptionComponent } from './option.component';
import { RippleModule } from '../ripple/ripple.module';
import { TextFieldModule } from '../text-field/text-field.module';

export { SelectComponent } from './select.component';
export { OptionComponent } from './option.component';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    TextFieldModule,
    RippleModule
  ],
  declarations: [SelectComponent, OptionComponent],
  exports: [SelectComponent, OptionComponent]
})
export class SelectModule {
}
