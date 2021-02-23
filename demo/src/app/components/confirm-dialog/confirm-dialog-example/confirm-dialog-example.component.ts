import { Component } from '@angular/core';

import { ConfirmDialogService } from '@universal-material/angular';

@Component({
  selector: 'app-confirm-dialog-example',
  templateUrl: './confirm-dialog-example.component.html',
  styleUrls: ['./confirm-dialog-example.component.scss']
})
export class ConfirmDialogExampleComponent {

  confirmed: boolean;

  constructor(private readonly confirmDialog: ConfirmDialogService) {

  }

  show() {
    const confirmDialog = this.confirmDialog.open('This <strong>action</strong> cannot be undone', {
      title: 'Delete file?',
      confirmButton: {
        text: 'Delete',
        appearance: 'raised',
        color: 'danger'
      }
    });

    confirmDialog.onConfirm
      .subscribe(() => this.confirmed = true);

    confirmDialog.onCancel
      .subscribe(() => this.confirmed = false);
  }
}
