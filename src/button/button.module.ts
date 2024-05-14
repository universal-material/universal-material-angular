import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegacyButtonComponent, LinkButtonComponent } from './legacy-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LegacyButtonComponent, LinkButtonComponent],
  exports: [LegacyButtonComponent, LinkButtonComponent]
})
export class ButtonModule { }
