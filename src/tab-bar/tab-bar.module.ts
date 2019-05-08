import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RippleModule } from '../ripple/ripple.module';
import { TabBarComponent } from './tab-bar.component';
import { TabComponent } from './tab.component';

@NgModule({
  imports: [
    CommonModule,
    RippleModule,
  ],
  declarations: [
    TabBarComponent,
    TabComponent
  ],
  exports: [
    TabBarComponent,
    TabComponent
  ]
})
export class TabBarModule {
}
