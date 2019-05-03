import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RippleModule } from '../ripple/ripple.module';
import { TabBarDirective } from './tab-bar.directive';
import { TabComponent } from './tab.component';
import { TabIndicatorDirective } from './tab-indicator.directive';

@NgModule({
  imports: [
    CommonModule,
    RippleModule,
  ],
  declarations: [
    TabBarDirective,
    TabComponent,
    TabIndicatorDirective
  ],
  exports: [
    TabBarDirective,
    TabComponent,
    TabIndicatorDirective
  ]
})
export class TabBarModule {
}
