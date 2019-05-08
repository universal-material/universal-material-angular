import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button/button.module';

import { DialogComponent } from './dialog.component';
import { DialogBodyDirective } from './dialog-body.directive';
import { ProgressDialogComponent } from './progress-dialog/progress-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule
  ],
  declarations: [DialogComponent, DialogBodyDirective, ConfirmDialogComponent, ProgressDialogComponent],
  exports: [DialogComponent, DialogBodyDirective],
  entryComponents: [ConfirmDialogComponent, ProgressDialogComponent]
})
export class DialogModule {
}
