import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversalMaterialModule } from '@universal-material/angular';
import { StackBlitzService } from './stackblitz/stack-blitz.service';
import { HighlightJsDirective } from 'ngx-highlight-js';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    UniversalMaterialModule,
    HighlightJsDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExampleComponent {

  @Input() title!: string;

  @Input() dashName!: string;
  @Input() htmlCode!: string;
  @Input() tsCode!: string;
  @Input() cssCode!: string;

  tabIndex: number = 0;
  showCode = false;

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
