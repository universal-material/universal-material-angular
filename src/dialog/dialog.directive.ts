import {AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Dialog} from '@universal-material/core';

@Directive({
  selector: '[uDialog]'
})
export class DialogDirective implements AfterViewInit, OnChanges {

  @Input() open: boolean;
  private _innerDialog: Dialog;

  constructor(private readonly _elementRef: ElementRef) {

  }

  private _setDialogOpenedOrClosed() {
    if (this.open) {
      this._innerDialog.open();
    } else {
      this._innerDialog.close();
    }
  }

  ngAfterViewInit(): void {
    this._innerDialog = Dialog.attach(this._elementRef.nativeElement);
    if (this.open) {
      this._innerDialog.open();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.open && this._innerDialog) {
      this._setDialogOpenedOrClosed();
    }
  }
}
