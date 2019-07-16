import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RippleModule } from '../ripple/ripple.module';
import { CollapseModule } from '../collapse/collapse.module';

import { ExpansionPanelComponent } from './expansion-panel.component';
import { ExpansionPanelContainerComponent } from './expansion-panel-container/expansion-panel-container.component';

export { ExpansionPanelComponent } from './expansion-panel.component';
export { ExpansionPanelContainerComponent } from './expansion-panel-container/expansion-panel-container.component';

@NgModule({
  imports: [
    CommonModule,
    CollapseModule,
    RippleModule
  ],
  declarations: [
    ExpansionPanelComponent,
    ExpansionPanelContainerComponent
  ],
  exports: [
    ExpansionPanelComponent,
    ExpansionPanelContainerComponent
  ]
})
export class ExpansionPanelModule {
}
