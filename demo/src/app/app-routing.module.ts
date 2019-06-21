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
    path: 'datepicker',
    component: DatepickerComponent
  },
  {
    path: 'input',
    component: InputComponent
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
