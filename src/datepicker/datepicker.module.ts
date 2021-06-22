import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '../button/button.module';
import { RippleModule } from '../ripple/ripple.module';
import { DropdownModule } from '../dropdown/dropdown.module';

import { DatepickerComponent } from './datepicker.component';
import { DatepickerInputComponent } from './datepicker-input/datepicker-input.component';
import { DatepickerContentComponent } from './datepicker-content/datepicker-content.component';

export { DATEPICKER_DEFAULT_OPTIONS, DatepickerConfig } from './datepicker-config.model';
export { DATEPICKER_INPUT_DEFAULT_OPTIONS, DatepickerInputConfig } from './datepicker-input/datepicker-input-config.model';
export { DatepickerComponent, DatepickerInputComponent }

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    RippleModule
  ],
  declarations: [DatepickerComponent, DatepickerInputComponent, DatepickerContentComponent],
  exports: [DatepickerComponent, DatepickerInputComponent]
})
export class DatepickerModule {
}
