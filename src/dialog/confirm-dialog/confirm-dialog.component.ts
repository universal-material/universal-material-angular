import { Component, ElementRef, Inject, Optional, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { DialogComponent } from '../dialog.component';
import { CONFIRM_DIALOG_DEFAULT_OPTIONS, ConfirmDialogConfig, DefaultConfirmDialogConfig } from './confirm-dialog-config.model';
import { DialogBodyDirective } from '@universal-material/angular/dialog/dialog-body.directive';

@Component({
  selector: 'u-confim-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent extends DialogComponent {

  message: string;

  onCancel = new Subject();
  onConfirm = new Subject();
  confirmed: boolean;
  readonly _confirmDialogConfig: ConfirmDialogConfig;

  @ViewChild(DialogBodyDirective) dialogBody: DialogBodyDirective;

  constructor(elementRef: ElementRef,
              @Optional() confirmDialogConfig: ConfirmDialogConfig,
              @Optional() @Inject(CONFIRM_DIALOG_DEFAULT_OPTIONS) defaultOptions: ConfirmDialogConfig) {
    super(elementRef, null);
    this._confirmDialogConfig = { ...DefaultConfirmDialogConfig, ...defaultOptions, ...confirmDialogConfig };
    this._dialogConfig = this._confirmDialogConfig;
  }

  close() {
    super.close();
    if (!this.confirmed) {
      this.onCancel.next();
    }
  }

  _cancelClick() {
    this.close();
  }

  _confirmClick() {
    this.confirmed = true;
    this.onConfirm.next();
    this.close();
  }
}
