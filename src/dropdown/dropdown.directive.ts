import {
  AfterContentInit,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';

import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownMenuDirective } from './dropdown-menu.directive';

@Directive({
  selector: '[uDropdown]'
})
export class DropdownDirective implements AfterContentInit {

  private _justToggle = false;

  @Input() autoClose: boolean | 'outside' = true;
  @Input() open: boolean;
  @Output() openChange = new EventEmitter<boolean>();

  @ContentChild(DropdownToggleDirective) _dropdownToggle: DropdownToggleDirective;
  @ContentChild(DropdownMenuDirective) _dropdownMenu: DropdownMenuDirective;

  @HostListener('window:click') _windowClick() {
    if (this._justToggle) {
      this._justToggle = false;
      return;
    }

    if ((this.autoClose || this.autoClose === 'outside') && this._dropdownMenu.show) {
      this._dropdownMenu.show = false;
    }
  }

  constructor(private readonly _elementRef: ElementRef) {

  }

  private _autoClose() {
    if (this.autoClose && this._dropdownMenu.show) {
      this._dropdownMenu.show = false;
    }
  }

  ngAfterContentInit() {

    this._dropdownToggle.click.subscribe((e: Event) => {
      this._justToggle = true;

      if (!this._dropdownMenu.show) {
        if (this._dropdownMenu.direction && this._dropdownMenu.direction.indexOf('auto') === 0) {
          this._dropdownMenu.setDirectionClass(`${this.openDropdownUpOrDown()}${this._dropdownMenu.direction.substring(4)}`);
        }
      }

      this._dropdownMenu.show = !this._dropdownMenu.show;
    });
    this._dropdownMenu.click.subscribe((e: Event) => {

      if (this.autoClose && this.autoClose !== 'outside' && this._dropdownMenu.show) {
        this._dropdownMenu.show = false;
      }
    });
  }

  openDropdownUpOrDown(): string {
    const menuElement = this._dropdownMenu._elementRef.nativeElement;
    const dropdownElement = this._elementRef.nativeElement;
    const rect = dropdownElement.getBoundingClientRect() as DOMRect;
    const styles = getComputedStyle(menuElement);
    return window.innerHeight < rect.y + rect.height + parseInt(styles.height, 10) ? 'up' : 'down';
  }
}

