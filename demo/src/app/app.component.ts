import { Component } from '@angular/core';

import { Snackbar } from '@universal-material/angular';
import {ProgressDialog} from '@universal-material/angular';
import {ConfirmDialog} from '@universal-material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
  dialogOpen: boolean = true;

  showTestSnackbar() {
    Snackbar.show('teste');
  }

  showProgressDialog() {
    const progress = ProgressDialog.open('Carregando');
    setTimeout(() => progress.close(), 2000);
  }

  showConfirmDialog() {
    ConfirmDialog.open('Do you confirm?', {title: 'Confirm dialog'});
  }
}
