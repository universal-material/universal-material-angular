import { NgModule } from '@angular/core';

import { RippleModule } from './ripple/ripple.module';
import { TextFieldModule } from './text-field/text-field.module';
import { DialogModule } from './dialog/dialog.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { TypeaheadModule, TypeaheadSelectItemEvent } from './typeahead/typeahead.module';
import { SelectModule } from './select/select.module';
import { ToolbarBehaviorModule } from './toolbar-behavior/toolbar-behavior.module';
import { FloatingActionBehaviorModule } from './floating-action-behavior/floating-action-behavior.module';
import { ButtonModule } from './button/button.module';
import { FormFieldModule } from './form-field/form-field.module';
import { ChipFieldModule } from './chip-field/chip-field.module';
import { SelectionControlModule } from './selection-control/selection-control.module';
import { DatepickerModule } from './datepicker/datepicker.module';
import { CollapseModule } from './collapse/collapse.module';
import { ExpansionPanelModule } from './expansion-panel/expansion-panel.module';
import { SliderModule } from './slider/slider.module';
import { UmRadioControlValueAccessor } from './value-accessors/radio-control-value-accessor';
import { UmCheckControlValueAccessor } from './value-accessors/check-control-value-accessor';
import { UmChipFieldControlValueAccessor } from './value-accessors/chip-field-control-value-accessor';
import { UmDefaultControlValueAccessor } from './value-accessors/default-control-value-accessor';
import { UmTypeaheadControlValueAccessor } from './value-accessors/typeahead-control-value-accessor';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { UmSelectControlValueAccessor, UmSelectOption } from './value-accessors/select-control-value-accessor';
import { TabBarDirective } from './tab-bar/tab-bar.directive';

const UniversalMaterialModules = [
  ChipFieldModule,
  DialogModule,
  DropdownModule,
  SelectModule,
  RippleModule,
  FormFieldModule,
  TextFieldModule,
  TypeaheadModule,
  ToolbarBehaviorModule,
  FloatingActionBehaviorModule,
  ButtonModule,
  SelectionControlModule,
  SnackbarComponent,
  DatepickerModule,
  CollapseModule,
  ExpansionPanelModule,
  SliderModule,
  UmDefaultControlValueAccessor,
  UmCheckControlValueAccessor,
  UmRadioControlValueAccessor,
  UmChipFieldControlValueAccessor,
  UmTypeaheadControlValueAccessor,
  UmSelectControlValueAccessor,
  UmSelectOption,
  TabBarDirective
];


export { DropdownModule } from './dropdown/dropdown.module';
export { DropdownDirective } from './dropdown/dropdown.directive';
export { DropdownMenuDirective } from './dropdown/dropdown-menu.directive';
export { DropdownToggleDirective } from './dropdown/dropdown-toggle.directive';

export { RippleModule } from './ripple/ripple.module';
export { RippleDirective } from './ripple/ripple.directive';

export { TextFieldModule } from './text-field/text-field.module';
export { TextInputDirective } from './text-field/text-input.directive';

export { ButtonModule } from './button/button.module';
export { LegacyButtonComponent, LinkButtonComponent } from './button/legacy-button.component';

export { FormFieldComponent, FORM_FIELD_DEFAULT_APPEARANCE } from './form-field/form-field.component';
export { LabelDirective } from './form-field/label.directive';
export { FormFieldModule } from './form-field/form-field.module';
export { FormFieldAppearance } from './form-field/form-field-appearance';

export { InputBaseComponent } from './shared/input-base.component';
export { TextInputBase } from './shared/text-input-base';

export { SelectionControlModule }from './selection-control/selection-control.module';
export { SelectionControlComponent }from './selection-control/selection-control.component';

export { ChipFieldModule } from './chip-field/chip-field.module';
export { ChipFieldComponent } from './chip-field/chip-field.component';
export { ChipInputDirective } from './chip-field/chip-input.directive';

export * from './dialog/dialog.module';

export {
  Highlight,
  TypeaheadModule,
  TypeaheadConfig,
  TypeaheadSelectItemEvent,
  Typeahead
} from './typeahead/typeahead.module';

export {
  SelectModule,
  SelectComponent,
  OptionComponent
} from './select/select.module';

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

export * from './toolbar-behavior/toolbar-behavior.module';
export * from './slider/slider.module';
export * from './snackbar/snackbar.component';
export * from './snackbar/snackbar.service';
export * from './snackbar/snackbar-duration';
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
  imports: UniversalMaterialModules,
  exports: UniversalMaterialModules
})
export class UniversalMaterialModule {
}
