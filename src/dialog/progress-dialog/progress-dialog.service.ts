import { Injectable } from '@angular/core';

import { ProgressDialogComponent } from './progress-dialog.component';
import { DialogService } from '../dialog.service';

@Injectable({providedIn: 'root'})
export class ProgressDialogService {
  constructor(private readonly _dialogService: DialogService) {

  }

  open(message: string | null = null): ProgressDialogComponent {
    const progressDialog = this._dialogService.open(ProgressDialogComponent);
    progressDialog.message = message;
    progressDialog.show = true;

    return progressDialog;
  }
}
