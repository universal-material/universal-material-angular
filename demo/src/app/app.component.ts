import { Component } from '@angular/core';

import { Snackbar } from '@universal-material/angular';
import {ProgressDialog} from '@universal-material/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';

  showTestSnackbar() {
    Snackbar.show('teste');
  }

  showTestProgressDialog() {
    const progress = ProgressDialog.open('Carregando');
    setTimeout(() => progress.close(), 2000);
  }
}
