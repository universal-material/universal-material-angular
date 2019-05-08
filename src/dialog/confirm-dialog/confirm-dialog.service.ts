import { Injectable } from '@angular/core';

import { DialogService } from '../dialog.service';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmDialogConfig } from './confirm-dialog-config.model';

@Injectable({providedIn: 'root'})
export class ConfirmDialogService {
  constructor(private readonly _dialogService: DialogService) {

  }

  open(message: string, config?: ConfirmDialogConfig): ConfirmDialogComponent {
    const confirmDialog = this._dialogService
      ._internalOpen(ConfirmDialogComponent, new WeakMap<any, any>(config && [[ConfirmDialogConfig, config]]));

    confirmDialog.message = message;
    confirmDialog.show = true;

    return confirmDialog;
  }
}
