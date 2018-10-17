import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Dropdown} from '@universal-material/core';

@Directive({
  selector: '[uDropdown]'
})
export class DropdownDirective implements AfterViewInit, OnChanges {
  @Input() open: boolean;
  @Output() openChange = new EventEmitter<boolean>();

  private _innerDropdown: Dropdown;

  constructor(private readonly _elementRef: ElementRef) {
    const element = this._elementRef.nativeElement as HTMLElement;
    element.addEventListener('open', () => {
      this.open = true;
      this.openChange.emit(this.open);
    });

    element.addEventListener('close', () => {
      this.open = false;
      this.openChange.emit(this.open);
    });
  }

  private _setDropdownOpenedOrClosed() {
    if (this.open) {
      this._innerDropdown.open();
    } else {
      this._innerDropdown.close();
    }
  }

  ngAfterViewInit(): void {
    this._innerDropdown = Dropdown.attach(this._elementRef.nativeElement);
    if (this.open) {
      this._innerDropdown.open();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.open && this._innerDropdown) {
      this._setDropdownOpenedOrClosed();
    }
  }
}
