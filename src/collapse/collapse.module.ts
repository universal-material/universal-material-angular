import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapseComponent } from './collapse.component';

export { CollapseComponent } from './collapse.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CollapseComponent],
  exports: [CollapseComponent]
})
export class CollapseModule { }
