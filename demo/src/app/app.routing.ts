import { Routes } from '@angular/router';

import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { SliderComponent } from './components/slider/slider.component';
import { DialogComponent } from "./components/dialog/dialog.component";

export const routes: Routes = [
  {
    path: 'datepicker',
    component: DatepickerComponent
  },
  {
    path: 'expansion-panel',
    component: ExpansionPanelComponent
  },
  {
    path: 'dialog',
    component: DialogComponent
  },
  {
    path: 'slider',
    component: SliderComponent
  }
];
