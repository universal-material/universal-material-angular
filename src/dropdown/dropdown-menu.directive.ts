import { Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

import { Direction } from '../util/direction';

const autoDirection = 'auto';

@Directive({
  selector: '[uDropdownMenu]'
})
export class DropdownMenuDirective implements OnChanges {

  click = new Subject();

  private _innerDirection: Direction;

  @HostBinding('class.show') show: boolean;
  @Input() direction: Direction;

  @HostListener('click', ['$event']) _click = (e: Event) => {
    e.stopPropagation();
    this.click.next();
  }

  constructor(readonly _elementRef: ElementRef<HTMLElement>) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.direction) {
      if (changes.direction.currentValue && changes.direction.currentValue.indexOf(autoDirection) !== 0) {
        this.setDirectionClass(changes.direction.currentValue);
      } else {
        this.setDirectionClass('');
      }
    }
  }

  setDirectionClass(direction: string) {

    if (this._innerDirection && this._innerDirection.indexOf(autoDirection) !== 0) {
      this._elementRef.nativeElement.classList.remove(this._innerDirection);
    }

    this._innerDirection = direction as Direction;

    if (direction) {
      this._elementRef.nativeElement.classList.add(direction);
    }
  }
}
