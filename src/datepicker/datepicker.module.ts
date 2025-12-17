import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { RippleModule } from '../ripple/ripple.module';
import { DropdownModule } from '../dropdown/dropdown.module';

import { DatepickerComponent } from './datepicker.component';
import { DatepickerInputComponent } from './datepicker-input/datepicker-input.component';
import { DatepickerContentComponent } from './datepicker-content/datepicker-content.component';
import { DefaultDatepickerAdapter } from './default-datepicker-adapter';

export { Month } from './month.model';
export { DATEPICKER_DEFAULT_OPTIONS, DatepickerConfig } from './datepicker-config.model';
export { DefaultDatepickerAdapter } from './default-datepicker-adapter';
export { DatepickerAdapter } from './datepicker-adapter';
export { DatepickerComponent, DatepickerInputComponent }

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    RippleModule
  ],
  declarations: [DatepickerComponent, DatepickerInputComponent, DatepickerContentComponent],
  exports: [DatepickerComponent, DatepickerInputComponent],
  providers: [
    DatePipe,
    DefaultDatepickerAdapter
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DatepickerModule {
}
