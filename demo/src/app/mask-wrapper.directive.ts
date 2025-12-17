import { Directive } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxMaskDirective, NgxMaskService } from 'ngx-mask';

@Directive({
  selector: '[appMaskWrapper]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MaskWrapperDirective,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: MaskWrapperDirective,
      multi: true,
    },
    NgxMaskService,
  ],
  standalone: true
})
export class MaskWrapperDirective extends NgxMaskDirective {

}
