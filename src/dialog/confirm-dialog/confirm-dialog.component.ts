import { Component, ElementRef, Inject, Optional, SecurityContext, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { DialogComponent } from '../dialog.component';
import {
  CONFIRM_DIALOG_DEFAULT_OPTIONS,
  ConfirmDialogConfig,
  DefaultConfirmDialogConfig
} from './confirm-dialog-config.model';
import { DialogBodyDirective } from '../dialog-body.directive';

@Component({
  selector: 'u-confim-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent extends DialogComponent {
  safeMessage: SafeHtml;

  set message(value: string) {
    this.safeMessage = this.sanitizer.sanitize(SecurityContext.HTML, value);
  }

  private _closed: boolean;
  readonly _confirmDialogConfig: ConfirmDialogConfig;

  onCancel = new Subject();
  onConfirm = new Subject();
  confirmed: boolean;

  @ViewChild(DialogBodyDirective) dialogBody: DialogBodyDirective;

  constructor(elementRef: ElementRef,
              private readonly sanitizer: DomSanitizer,
              @Optional() confirmDialogConfig: ConfirmDialogConfig,
              @Optional() @Inject(CONFIRM_DIALOG_DEFAULT_OPTIONS) defaultOptions: ConfirmDialogConfig) {
    super(elementRef, null);
    this._confirmDialogConfig = DefaultConfirmDialogConfig;
    this._confirmDialogConfig = this._assignConfig(this._confirmDialogConfig, defaultOptions);
    this._confirmDialogConfig = this._assignConfig(this._confirmDialogConfig, confirmDialogConfig);

    this._dialogConfig = this._confirmDialogConfig;
  }

  private _assignConfig(baseConfig: ConfirmDialogConfig, partialConfig: ConfirmDialogConfig): ConfirmDialogConfig {

    if (partialConfig) {
      baseConfig.confirmButton = {...baseConfig.confirmButton, ...partialConfig.confirmButton};
      baseConfig.cancelButton = {...baseConfig.cancelButton, ...partialConfig.cancelButton};
      delete partialConfig.confirmButton;
      delete partialConfig.cancelButton;
    }

    return {...baseConfig, ...partialConfig};
  }

  close() {
    super.close();
    this._closed = true;
  }

  _cancelClick() {
    if (this._closed) {
      return;
    }

    this.close();
    this.onCancel.next();
  }

  _confirmClick() {
    if (this._closed) {
      return;
    }

    this.close();
    this.confirmed = true;
    this.onConfirm.next();
  }
}
