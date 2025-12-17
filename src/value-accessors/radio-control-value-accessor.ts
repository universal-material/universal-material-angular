import { Directive, forwardRef, OnInit, Provider } from '@angular/core';
import { NG_VALUE_ACCESSOR, RadioControlValueAccessor } from '@angular/forms';

const RADIO_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UmRadioControlValueAccessor),
  multi: true,
};

@Directive({
  selector: 'u-radio[ngModel],u-radio[formControlName],u-radio[formControl],u-radio-list-item[ngModel],u-radio-list-item[formControlName],u-radio-list-item[formControl]',
  providers: [RADIO_VALUE_ACCESSOR],
  standalone: false,
})
export class UmRadioControlValueAccessor extends RadioControlValueAccessor {

}
