import { Component, Input, OnInit } from '@angular/core';
import { replaceAll } from './replace-all';
import { StackBlitzService } from './stackblitz/stack-blitz.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {

  @Input() title: string;

  @Input() dashName: string;
  @Input() htmlCode: string;
  @Input() tsCode: string;
  @Input() cssCode: string;

  tabIndex: number;
  showCode: boolean;

  constructor(private readonly _stackBlitzService: StackBlitzService) {

  }

  createProject() {
    this._stackBlitzService.createProject({
      cssCode: this.cssCode,
      htmlCode: this.htmlCode,
      tsCode: this.tsCode,
      name: this.dashName
    });
  }
}
