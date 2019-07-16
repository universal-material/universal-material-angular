import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'u-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss']
})
export class CollapseComponent implements OnInit {

  @Input() show = false;

  @HostBinding('style.max-height') get maxHeight(): string {
    return this.show
      ? `${this._elementRef.nativeElement.scrollHeight}px`
      : '0';
  }

  constructor(private readonly _elementRef: ElementRef) {

  }

  ngOnInit() {
  }

}
