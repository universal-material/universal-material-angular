import { Directive, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[uDropdownToggle]'
})
export class DropdownToggleDirective {

  click = new Subject();

  @HostListener('click', ['$event']) _click = (e) => {
    this.click.next(e);
  }
}
