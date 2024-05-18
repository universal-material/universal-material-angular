import { Directive, ElementRef, forwardRef, Host, Optional, Provider, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgSelectOption, SelectControlValueAccessor } from '@angular/forms';

const SELECT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UmSelectControlValueAccessor),
  multi: true,
};

@Directive({
  selector: 'u-select[ngModel],u-select[formControlName],u-select[formControl]',
  standalone: true,
  providers: [SELECT_VALUE_ACCESSOR]
})
export class UmSelectControlValueAccessor extends SelectControlValueAccessor {
  #mutationObserver: MutationObserver;

  constructor(_element: ElementRef,
              _renderer: Renderer2) {
    super(_renderer, _element);
    this.#mutationObserver = new MutationObserver(() => this.writeValue(this.value));
    this.#mutationObserver.observe(_element.nativeElement, {characterData: true, childList: true, subtree: true})
  }
}

@Directive({
  selector: 'u-option',
  standalone: true
})
export class UmSelectOption extends NgSelectOption {
  constructor(_element: ElementRef,
              _renderer: Renderer2,
              @Optional() @Host() _select: UmSelectControlValueAccessor) {
    super(_element, _renderer, _select);
  }
}
