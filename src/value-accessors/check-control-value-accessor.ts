import { Directive, forwardRef, OnInit, Provider } from '@angular/core';
import { CheckboxControlValueAccessor, NG_VALUE_ACCESSOR, RadioControlValueAccessor } from '@angular/forms';

const CHECK_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UmCheckControlValueAccessor),
  multi: true,
};

@Directive({
  selector: 'u-checkbox[ngModel],u-checkbox[formControlName],u-checkbox[formControl],u-switch[ngModel],u-switch[formControlName],u-switch[formControl],u-checkbox-list-item[ngModel],u-checkbox-list-item[formControlName],u-checkbox-list-item[formControl],u-switch-list-item[ngModel],u-switch-list-item[formControlName],u-switch-list-item[formControl]',
  standalone: true,
  providers: [CHECK_VALUE_ACCESSOR]
})
export class UmCheckControlValueAccessor extends CheckboxControlValueAccessor {

}
