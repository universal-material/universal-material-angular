import { Component, OnInit } from '@angular/core';

import {
  ExpansionPanelComponent,
  ExpansionPanelContainerComponent,
  UniversalMaterialModule
} from '@universal-material/angular';

@Component({
  selector: 'app-expansion-panel-example',
  templateUrl: './expansion-panel-example.component.html',
  styleUrls: ['./expansion-panel-example.component.scss'],
  standalone: true,
  imports: [
    UniversalMaterialModule,
    ExpansionPanelComponent,
    ExpansionPanelContainerComponent
  ]
})
export class ExpansionPanelExampleComponent {

}
