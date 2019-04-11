import { Component } from '@angular/core';

import { Snackbar } from '@universal-material/angular';
import {ProgressDialog} from '@universal-material/angular';
import {ConfirmDialog} from '@universal-material/core';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

const stateObjects = [{name:'Alabama'}, {name:'Alaska'}, {name:'American Samoa'}, {name:'Arizona'}, {name:'Arkansas'}, {name:'California'}];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
  dialogOpen: boolean;
  dropdownOpen: boolean;
  states = stateObjects;

  chips = [];

  removeChip(index: number) {
    this.chips.splice(index, 1);
  }

  stateFormatter = state => state.name;

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

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
}
