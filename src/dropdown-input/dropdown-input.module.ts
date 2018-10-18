import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DropdownModule} from '../dropdown/dropdown.module';
import {DropdownInputComponent} from './dropdown-input.component';
export {DropdownInputComponent} from './dropdown-input.component';

import {RippleModule} from '../ripple/ripple.module';
import {TextFieldModule} from '../text-field/text-field.module';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    TextFieldModule,
    RippleModule
  ],
  declarations: [DropdownInputComponent],
  exports: [DropdownInputComponent]
})
export class DropdownInputModule {
}
