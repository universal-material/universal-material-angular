import { Directive, HostBinding, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[uDropdownMenu]'
})
export class DropdownMenuDirective {

  click = new Subject();

  @HostBinding('class.show') show: boolean;

  @HostListener('click', ['$event']) _click = (e: Event) => {
    e.stopPropagation();
    this.click.next();
  }
}
