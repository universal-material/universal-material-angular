import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightModule } from 'ngx-highlightjs';
import { UniversalMaterialModule } from '@universal-material/angular';

import { replaceAll } from './replace-all';
import { StackBlitzService } from './stackblitz/stack-blitz.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    UniversalMaterialModule,
    HighlightModule
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
