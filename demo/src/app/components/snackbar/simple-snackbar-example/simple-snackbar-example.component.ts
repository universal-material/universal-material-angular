import {Component} from '@angular/core';
import {SnackbarService} from '@universal-material/angular';

@Component({
  selector: 'app-simple-snackbar-example',
  templateUrl: './simple-snackbar-example.component.html',
  styleUrls: ['./simple-snackbar-example.component.scss']
})
export class SimpleSnackbarExampleComponent {

  message = 'Simple snackbar!';
  actionLabel: string | null = null;


  constructor(private readonly _snackbar: SnackbarService) {

  }

  open() {
    this._snackbar
      .open(this.message, {
        actionLabel: this.actionLabel
      })
      .onAction
      .subscribe(() => alert('Action clicked!'));
  }
}
