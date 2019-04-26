import { ContentChild, Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownMenuDirective } from './dropdown-menu.directive';

@Directive({
  selector: '[uDropdown]'
})
export class DropdownDirective implements OnInit {

  private _justToggle = false;

  @Input() autoClose = true;
  @Input() open: boolean;
  @Output() openChange = new EventEmitter<boolean>();

  @ContentChild(DropdownToggleDirective) _dropdownToggle: DropdownToggleDirective;
  @ContentChild(DropdownMenuDirective) _dropdownMenu: DropdownMenuDirective;

  @HostListener('window:click') _windowClick() {
    if (this._justToggle) {
      this._justToggle = false;
      return;
    }

    this._autoClose();
  }

  private _autoClose() {
    if (this.autoClose && this._dropdownMenu.show) {
      this._dropdownMenu.show = false;
    }
  }

  ngOnInit() {

    this._dropdownToggle.click.subscribe((e: Event) => {
      this._justToggle = true;
      this._dropdownMenu.show = !this._dropdownMenu.show;
    });
    this._dropdownMenu.click.subscribe((e: Event) => {
      this._autoClose();
    });
  }
}
