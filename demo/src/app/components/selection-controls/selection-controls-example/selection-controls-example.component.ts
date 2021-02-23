import { Component } from '@angular/core';

@Component({
  selector: 'app-selection-controls-example',
  templateUrl: './selection-controls-example.component.html',
  styleUrls: ['./selection-controls-example.component.scss']
})
export class SelectionControlsExampleComponent {

  stateFormatter = (state: {name: string}) => state.name;
}
