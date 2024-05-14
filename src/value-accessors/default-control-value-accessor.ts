import { Directive, forwardRef, Provider } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DEFAULT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UmDefaultControlValueAccessor),
  multi: true,
};

@Directive({
  selector: 'u-text-field[ngModel],u-text-field[formControlName],u-text-field[formControl]',
  standalone: true,
  providers: [DEFAULT_VALUE_ACCESSOR]
})
export class UmDefaultControlValueAccessor extends DefaultValueAccessor {

}
