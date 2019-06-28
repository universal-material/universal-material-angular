import { Component } from '@angular/core';

import { ProgressDialogService } from '@universal-material/angular';

@Component({
  selector: 'app-progress-dialog-example',
  templateUrl: './progress-dialog-example.component.html',
  styleUrls: ['./progress-dialog-example.component.scss']
})
export class ProgressDialogExampleComponent {

  constructor(private readonly progressDialog: ProgressDialogService) {

  }

  show() {
    const progress = this.progressDialog.open('Processing...');

    setTimeout(() => progress.close(), 2000);
  }
}
