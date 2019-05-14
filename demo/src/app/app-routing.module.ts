import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ButtonsComponent } from './components/buttons/buttons.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

const routes: Routes = [
  {
    path: 'buttons',
    component: ButtonsComponent
  },
  {
    path: 'snackbar',
    component: SnackbarComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
