import { Component, ElementRef, ViewChild } from '@angular/core';

import { TypeaheadSelectItemEvent } from '@universal-material/angular';

import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SnackbarService } from '@universal-material/angular/snackbar/snackbar.service';
import { SnackbarDuration } from '@universal-material/angular/snackbar/snackbar-duration';
import { ProgressDialogService } from '@universal-material/angular/dialog/progress-dialog/progress-dialog.service';
import { ConfirmDialogService } from '@universal-material/angular/dialog/confirm-dialog/confirm-dialog.service';

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
  showDummyTab: boolean;
  states = stateObjects;
  searchText: string;

  buttonStyle = '';
  buttonColor = '';

  selectedTab = 1;
  chips = [];

  @ViewChild('typeaheadInput') typeaheadInputRef: ElementRef;

  constructor(readonly snackbar: SnackbarService,
              readonly progressDialog: ProgressDialogService,
              readonly confirmDialog: ConfirmDialogService) {

  }

  openSnackbar() {
    this.snackbar.open('Something happened');
  }

  openFixedSnackbar() {
    this.snackbar.open('Working...', {
      duration: SnackbarDuration.infinite
    });
  }

  openSnackbarWithAction() {
    const snackbarRef = this.snackbar.open('Action completed', {
      actionLabel: 'Undo',
      dismissWhenOpenAnotherSnackbar: false
    });

    snackbarRef.onAction.subscribe(() => {
      alert('Action undone');
    })
  }

  removeChip(index: number) {
    this.chips.splice(index, 1);
  }

  stateFormatter = state => state.name;

  showTestSnackbar() {
    this.snackbar.open('teste');
  }

  showProgressDialog() {
    const progress = this.progressDialog.open('Carregando');
    setTimeout(() => progress.close(), 2000);
  }

  showConfirmDialog() {
    const confirmDialog = this.confirmDialog.open('Do you confirm?', {
      title: 'Confirm dialog'
    });
    confirmDialog.onConfirm.subscribe(() => alert('confirmed'));
    confirmDialog.onCancel.subscribe(() => alert('canceled'));
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  selectCountry($event: TypeaheadSelectItemEvent) {
    $event.preventDefault();
    this.chips.push($event.item);
    this.searchText = '';
    this.typeaheadInputRef.nativeElement.focus();
  }
}
