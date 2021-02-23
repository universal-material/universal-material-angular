import { Directive, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[uDropdownToggle]'
})
export class DropdownToggleDirective {

  click = new Subject<Event>();

  @HostListener('click', ['$event']) _click = (e: Event) => {
    this.click.next(e);
  }
}
