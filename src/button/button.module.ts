import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, LinkButtonComponent } from './button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ButtonComponent, LinkButtonComponent],
  exports: [ButtonComponent, LinkButtonComponent]
})
export class ButtonModule { }
