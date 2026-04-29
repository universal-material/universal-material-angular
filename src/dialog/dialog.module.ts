import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogComponent } from './dialog.component';
import { DialogBodyDirective } from './dialog-body.directive';
import { ProgressDialogComponent } from './progress-dialog/progress-dialog.component';

export { DialogBaseComponent } from './dialog-base.component';
export { type DialogConfig, DIALOG_DEFAULT_OPTIONS } from './dialog-config.model';
export { DialogComponent } from './dialog.component';
export { DialogBodyDirective } from './dialog-body.directive';
export { DialogService, DIALOG_DATA } from './dialog.service';

export { ConfirmDialogConfig, CONFIRM_DIALOG_DEFAULT_OPTIONS } from './confirm-dialog/confirm-dialog-config.model';
export { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

export { ProgressDialogComponent } from './progress-dialog/progress-dialog.component';
export { ProgressDialogService } from './progress-dialog/progress-dialog.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DialogComponent,
    DialogBodyDirective
  ],
  exports: [
    DialogComponent,
    DialogBodyDirective
  ]
})
export class DialogModule {
}
