import { NgModule } from '@angular/core';

import { ProgressSpinnerModule } from './progress-spinner/progress-spinner.module';
import { RippleModule } from './ripple/ripple.module';
import { TextFieldModule } from './text-field/text-field.module';
import { DialogModule } from './dialog/dialog.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { TypeaheadModule, TypeaheadSelectItemEvent } from './typeahead/typeahead.module';
import { SelectModule } from './select/select.module';
import { ViewPagerModule } from './view-pager/view-pager.module';
import { ToolbarBehaviorModule } from './toolbar-behavior/toolbar-behavior.module';
import { FloatingActionBehaviorModule } from './floating-action-behavior/floating-action-behavior.module';
import { ButtonModule } from './button/button.module';
import { FormFieldModule } from './form-field/form-field.module';
import { ChipFieldModule } from './chip-field/chip-field.module';
import { TabBarModule } from './tab-bar/tab-bar.module';
import { SnackbarModule } from './snackbar/snackbar.module';
import { SelectionControlModule } from './selection-control/selection-control.module';
import { DatepickerModule } from './datepicker/datepicker.module';
import { CollapseModule } from './collapse/collapse.module';
import { ExpansionPanelModule } from './expansion-panel/expansion-panel.module';
import { SliderModule } from './slider/slider.module';
import { CircularProgressModule } from './circular-progress/circular-progress.module';

const UniversalMaterialModules = [
  ChipFieldModule,
  ProgressSpinnerModule,
  DialogModule,
  DropdownModule,
  SelectModule,
  RippleModule,
  FormFieldModule,
  TextFieldModule,
  TypeaheadModule,
  ViewPagerModule,
  ToolbarBehaviorModule,
  FloatingActionBehaviorModule,
  ButtonModule,
  SelectionControlModule,
  TabBarModule,
  SnackbarModule,
  DatepickerModule,
  CollapseModule,
  ExpansionPanelModule,
  SliderModule,
  CircularProgressModule
];


export { ProgressSpinnerModule } from './progress-spinner/progress-spinner.module';
export { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';

export { DropdownModule } from './dropdown/dropdown.module';
export { DropdownDirective } from './dropdown/dropdown.directive';
export { DropdownMenuDirective } from './dropdown/dropdown-menu.directive';
export { DropdownToggleDirective } from './dropdown/dropdown-toggle.directive';

export { RippleModule } from './ripple/ripple.module';
export { RippleDirective } from './ripple/ripple.directive';

export { TextFieldModule } from './text-field/text-field.module';
export { TextInputDirective } from './text-field/text-input.directive';

export { ButtonModule } from './button/button.module';
export { ButtonComponent, LinkButtonComponent } from './button/button.component';

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

export { TabBarModule } from './tab-bar/tab-bar.module';
export { TabBarComponent, TabChangeEvent, BeforeTabChangeEvent } from './tab-bar/tab-bar.component';
export { TabComponent } from './tab-bar/tab.component';
export * from './snackbar/snackbar.module';
export * from './dialog/dialog.module';
export * from './circular-progress/circular-progress.module';

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
  ViewPagerModule,
  ViewPagerComponent,
  ViewPagerSlideComponent
} from './view-pager/view-pager.module';

export {
  DatepickerModule,
  DatepickerComponent,
  DatepickerInputComponent,
  DatepickerConfig,
  DatepickerInputConfig,
  DATEPICKER_DEFAULT_OPTIONS,
  DATEPICKER_INPUT_DEFAULT_OPTIONS
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
export * from './floating-action-behavior/floating-action-behavior.module';

@NgModule({
  imports: UniversalMaterialModules,
  exports: UniversalMaterialModules
})
export class UniversalMaterialModule {
}
