import { NgModule } from '@angular/core';

import { RippleModule } from './ripple/ripple.module';
import { TextFieldModule } from './text-field/text-field.module';
import { DialogModule } from './dialog/dialog.module';
import { TypeaheadModule, TypeaheadSelectItemEvent } from './typeahead/typeahead.module';
import { FloatingActionBehaviorModule } from './floating-action-behavior/floating-action-behavior.module';
import { FormFieldModule } from './form-field/form-field.module';
import { DatepickerModule } from './datepicker/datepicker.module';
import { CollapseModule } from './collapse/collapse.module';
import { ExpansionPanelModule } from './expansion-panel/expansion-panel.module';
import { SliderModule } from './slider/slider.module';
import { UmRadioControlValueAccessor } from './value-accessors/radio-control-value-accessor';
import { UmCheckControlValueAccessor } from './value-accessors/check-control-value-accessor';
import { UmChipFieldControlValueAccessor } from './value-accessors/chip-field-control-value-accessor';
import { UmDefaultControlValueAccessor } from './value-accessors/default-control-value-accessor';
import { UmTypeaheadControlValueAccessor } from './value-accessors/typeahead-control-value-accessor';
import { UmSelectControlValueAccessor, UmSelectOption } from './value-accessors/select-control-value-accessor';
import { TabBarDirective } from './tab-bar/tab-bar.directive';

const UniversalMaterialModules = [
  DialogModule,
  RippleModule,
  FormFieldModule,
  TextFieldModule,
  TypeaheadModule,
  FloatingActionBehaviorModule,
  DatepickerModule,
  CollapseModule,
  ExpansionPanelModule,
  SliderModule,
  TabBarDirective
];

const NotStandaloneComponents = [
  UmDefaultControlValueAccessor,
  UmCheckControlValueAccessor,
  UmRadioControlValueAccessor,
  UmChipFieldControlValueAccessor,
  UmTypeaheadControlValueAccessor,
  UmSelectControlValueAccessor,
  UmSelectOption,
];

export { RippleModule } from './ripple/ripple.module';
export { RippleDirective } from './ripple/ripple.directive';

export { TextFieldModule } from './text-field/text-field.module';
export { TextInputDirective } from './text-field/text-input.directive';

export { FormFieldComponent, FORM_FIELD_DEFAULT_APPEARANCE } from './form-field/form-field.component';
export { LabelDirective } from './form-field/label.directive';
export { FormFieldModule } from './form-field/form-field.module';
export { FormFieldAppearance } from './form-field/form-field-appearance';

export { InputBaseComponent } from './shared/input-base.component';
export { TextInputBase } from './shared/text-input-base';

export * from './dialog/dialog.module';

export {
  Highlight,
  TypeaheadModule,
  TypeaheadConfig,
  TypeaheadSelectItemEvent,
  Typeahead
} from './typeahead/typeahead.module';

export {
  DatepickerModule,
  DatepickerComponent,
  DatepickerInputComponent,
  DatepickerAdapter,
  DefaultDatepickerAdapter,
  DatepickerConfig,
  DATEPICKER_DEFAULT_OPTIONS,
  Month
} from './datepicker/datepicker.module';

export {
  CollapseModule,
  CollapseComponent
} from './collapse/collapse.module';


export {
  ExpansionPanelModule,
  ExpansionPanelComponent,
  ExpansionPanelContainerComponent
} from './expansion-panel/expansion-panel.module';

export * from './slider/slider.module';
export * from './dialog/confirm-dialog/confirm-dialog-ref';
export * from './dialog/confirm-dialog/confirm-dialog.service';
export * from './snackbar/snackbar.service';
export {SnackbarDuration} from '@universal-material/web';
export * from './snackbar/snackbar-config.model';
export * from './floating-action-behavior/floating-action-behavior.module';

export * from './tab-bar/tab-bar.directive';
export * from './value-accessors/default-control-value-accessor';
export * from './value-accessors/check-control-value-accessor';
export * from './value-accessors/radio-control-value-accessor';
export * from './value-accessors/chip-field-control-value-accessor';
export * from './value-accessors/typeahead-control-value-accessor';
export * from './value-accessors/select-control-value-accessor';

@NgModule({
  declarations: NotStandaloneComponents,
  imports: UniversalMaterialModules,
  exports: [...UniversalMaterialModules, ...NotStandaloneComponents]
})
export class UniversalMaterialModule {
}
