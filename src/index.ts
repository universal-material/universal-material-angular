import {NgModule} from '@angular/core';

import {CircularProgressModule} from './circular-progress/circular-progress.module';
import {RippleModule} from './ripple/ripple.module';
import {TextFieldModule} from './text-field/text-field.module';
import {DialogModule} from './dialog/dialog.module';

const UniversalMaterialModules = [
  CircularProgressModule,
  DialogModule,
  RippleModule,
  TextFieldModule
];

export {
  Dialog,
  DialogConfig,
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

@NgModule({
  imports: [UniversalMaterialModules],
  exports: UniversalMaterialModules
})
export class UniversalMaterialModule {

}
