import { Directive, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[uDropdownToggle]'
})
export class DropdownToggleDirective {

  click = new Subject<void>();

  @HostListener('click') _click = () => {
    this.click.next();
  }
}
