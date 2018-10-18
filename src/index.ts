import {NgModule} from '@angular/core';

import {CircularProgressModule} from './circular-progress/circular-progress.module';
import {RippleModule} from './ripple/ripple.module';
import {TextFieldModule} from './text-field/text-field.module';
import {DialogModule} from './dialog/dialog.module';
import {DropdownModule} from './dropdown/dropdown.module';
import {TypeaheadModule, TypeaheadSelectItemEvent} from './typeahead/typeahead.module';
import {DropdownInputModule} from './dropdown-input/dropdown-input.module';

const UniversalMaterialModules = [
  CircularProgressModule,
  DialogModule,
  DropdownModule,
  DropdownInputModule,
  RippleModule,
  TextFieldModule,
  TypeaheadModule
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

export {CircularProgressModule} from './circular-progress/circular-progress.module';
export {DialogModule} from './dialog/dialog.module';
export {DropdownModule} from './dropdown/dropdown.module';
export {RippleModule} from './ripple/ripple.module';
export {TextFieldModule} from './text-field/text-field.module';

export {
  Highlight,
  TypeaheadModule,
  TypeaheadConfig,
  TypeaheadSelectItemEvent,
  Typeahead
} from './typeahead/typeahead.module';

export {
  DropdownInputModule,
  DropdownInputComponent
} from './dropdown-input/dropdown-input.module';

@NgModule({
  imports: [UniversalMaterialModules],
  exports: UniversalMaterialModules
})
export class UniversalMaterialModule {
}
