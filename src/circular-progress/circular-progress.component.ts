import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'u-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.scss']
})
export class CircularProgressComponent implements OnInit {

  _basePercentage = 255;
  _innerPercentage = 0;
  @Input()
  set percentage(value: number) {
    this._innerPercentage = this._basePercentage - (Math.floor(this._basePercentage * value) / 100);
  }

  constructor() { }

  ngOnInit() {
  }

}
