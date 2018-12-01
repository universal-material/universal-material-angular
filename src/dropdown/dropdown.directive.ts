import {AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Dropdown} from '@universal-material/core';

@Directive({
  selector: '[uDropdown]'
})
export class DropdownDirective implements AfterViewInit, OnChanges {
  private _innerDropdown: Dropdown;

  @Input() open: boolean;
  @Output() openChange = new EventEmitter<boolean>();

  @HostListener('open') onOpen() {
    this.open = true;
    this.openChange.emit(this.open);
  }

  @HostListener('close') onClose() {
    this.open = false;
    this.openChange.emit(this.open);
  }


  constructor(private readonly _elementRef: ElementRef) {
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
