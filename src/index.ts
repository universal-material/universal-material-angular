import { NgModule } from '@angular/core';

import { CircularProgressModule } from './circular-progress/circular-progress.module';
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

const UniversalMaterialModules = [
  ChipFieldModule,
  CircularProgressModule,
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
  ButtonModule
];

export {
  Dialog,
  DialogConfig,
  Dropdown,
  DropdownConfig,
  QuickDialog,
  QuickDialogConfig,
  ConfirmDialog,
  ConfirmDialogConfig,
  ProgressDialog,
  ProgressDialogConfig,
  Snackbar,
  SnackbarButtonDefinition,
  SnackbarDuration,
  SnackbarDefinition
} from '@universal-material/core';

export { CircularProgressModule } from './circular-progress/circular-progress.module';
export { DialogModule } from './dialog/dialog.module';
export { DropdownModule } from './dropdown/dropdown.module';
export { RippleModule } from './ripple/ripple.module';
export { TextFieldModule } from './text-field/text-field.module';
export { ButtonModule } from './button/button.module';
export {
  FormFieldComponent,
  FORM_FIELD_DEFAULT_APPEARANCE
} from './form-field/form-field.component';

export { FormFieldAppearance } from './form-field/form-field-appearance';
export { InputBaseComponent } from './shared/input-base.component';
export { TextInputBase } from './shared/text-input-base';

export { FormFieldModule } from './form-field/form-field.module';

export { ChipFieldComponent } from './chip-field/chip-field.component';
export { ChipFieldModule } from './chip-field/chip-field.module';

export {
  Highlight,
  TypeaheadModule,
  TypeaheadConfig,
  TypeaheadSelectItemEvent,
  Typeahead
} from './typeahead/typeahead.module';

export {
  SelectModule,
  SelectComponent
} from './select/select.module';

export {
  ViewPagerModule,
  ViewPagerComponent,
  ViewPagerSlideComponent
} from './view-pager/view-pager.module';

export { ToolbarBehaviorModule } from './toolbar-behavior/toolbar-behavior.module';
export { FloatingActionBehaviorModule } from './floating-action-behavior/floating-action-behavior.module';

@NgModule({
  imports: [UniversalMaterialModules],
  exports: UniversalMaterialModules
})
export class UniversalMaterialModule {
}
