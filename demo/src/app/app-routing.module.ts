import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ButtonsComponent } from './components/buttons/buttons.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { InputComponent } from './components/input/input.component';
import { SelectionControlsComponent } from './components/selection-controls/selection-controls.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { SelectComponent } from './components/select/select.component';
import { RipplesComponent } from './components/ripples/ripples.component';
import { ChipInputComponent } from './components/chip-input/chip-input.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TypeaheadComponent } from './components/typeahead/typeahead.component';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { ProgressDialogComponent } from './components/progress-dialog/progress-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';

const routes: Routes = [
  {
    path: 'buttons',
    component: ButtonsComponent
  },
  {
    path: 'chip-input',
    component: ChipInputComponent
  },
  {
    path: 'confirm-dialog',
    component: ConfirmDialogComponent
  },
  {
    path: 'datepicker',
    component: DatepickerComponent
  },
  {
    path: 'expansion-panel',
    component: ExpansionPanelComponent
  },
  {
    path: 'input',
    component: InputComponent
  },
  {
    path: 'progress-dialog',
    component: ProgressDialogComponent
  },
  {
    path: 'progress-spinner',
    component: ProgressSpinnerComponent
  },
  {
    path: 'ripples',
    component: RipplesComponent
  },
  {
    path: 'tabs',
    component: TabsComponent
  },
  {
    path: 'select',
    component: SelectComponent
  },
  {
    path: 'selection-controls',
    component: SelectionControlsComponent
  },
  {
    path: 'typeahead',
    component: TypeaheadComponent
  },
  {
    path: 'snackbar',
    component: SnackbarComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
