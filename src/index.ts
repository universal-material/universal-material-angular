import {NgModule} from '@angular/core';

import {CircularProgressModule} from './circular-progress/circular-progress.module';
import {RippleModule} from './ripple/ripple.module';
import {TextFieldModule} from './text-field/text-field.module';
import {DialogModule} from './dialog/dialog.module';
import {DropdownModule} from './dropdown/dropdown.module';
import {TypeaheadModule, TypeaheadSelectItemEvent} from './typeahead/typeahead.module';
import {DropdownInputModule} from './dropdown-input/dropdown-input.module';
import {ViewPagerModule} from './view-pager/view-pager.module';
import {ToolbarBehaviorModule} from './toolbar-behavior/toolbar-behavior.module';
import {FloatingActionBehaviorModule} from './floating-action-behavior/floating-action-behavior.module';

const UniversalMaterialModules = [
  CircularProgressModule,
  DialogModule,
  DropdownModule,
  DropdownInputModule,
  RippleModule,
  TextFieldModule,
  TypeaheadModule,
  ViewPagerModule,
  ToolbarBehaviorModule,
  FloatingActionBehaviorModule
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

export {
  ViewPagerModule,
  ViewPagerComponent,
  ViewPagerSlideComponent
} from './view-pager/view-pager.module';

export {ToolbarBehaviorModule} from './toolbar-behavior/toolbar-behavior.module';
export {FloatingActionBehaviorModule} from './floating-action-behavior/floating-action-behavior.module';

@NgModule({
  imports: [UniversalMaterialModules],
  exports: UniversalMaterialModules
})
export class UniversalMaterialModule {
}
