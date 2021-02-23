import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

interface State {
  name: string;
}

@Component({
  selector: 'app-select-example',
  templateUrl: './select-example.component.html',
  styleUrls: ['./select-example.component.scss']
})
export class SelectExampleComponent {
  states$: Observable<{ name: string }[]>;

  selectedState = {name: 'Alabama'};

  constructor() {
    this.states$ = of([
      {name: 'Alabama'},
      {name: 'Alaska'},
      {name: 'American Samoa'},
      {name: 'Arizona'},
      {name: 'Arkansas'},
      {name: 'California'},
      {name: 'Colorado'},
      {name: 'Connecticut'},
      {name: 'Delaware'},
      {name: 'District Of Columbia'},
      {name: 'Federated States Of Micronesia'},
      {name: 'Florida'},
      {name: 'Georgia'},
      {name: 'Guam'},
      {name: 'Hawaii'},
      {name: 'Idaho'},
      {name: 'Illinois'},
      {name: 'Indiana'},
      {name: 'Iowa'},
      {name: 'Kansas'},
      {name: 'Kentucky'},
      {name: 'Louisiana'},
      {name: 'Maine'},
      {name: 'Marshall Islands'},
      {name: 'Maryland'},
      {name: 'Massachusetts'},
      {name: 'Michigan'},
      {name: 'Minnesota'},
      {name: 'Mississippi'},
      {name: 'Missouri'},
      {name: 'Montana'},
      {name: 'Nebraska'},
      {name: 'Nevada'},
      {name: 'New Hampshire'},
      {name: 'New Jersey'},
      {name: 'New Mexico'},
      {name: 'New York'},
      {name: 'North Carolina'},
      {name: 'North Dakota'},
      {name: 'Northern Mariana Islands'},
      {name: 'Ohio'},
      {name: 'Oklahoma'},
      {name: 'Oregon'},
      {name: 'Palau'},
      {name: 'Pennsylvania'},
      {name: 'Puerto Rico'},
      {name: 'Rhode Island'},
      {name: 'South Carolina'},
      {name: 'South Dakota'},
      {name: 'Tennessee'},
      {name: 'Texas'},
      {name: 'Utah'},
      {name: 'Vermont'},
      {name: 'Virgin Islands'},
      {name: 'Virginia'},
      {name: 'Washington'},
      {name: 'West Virginia'},
      {name: 'Wisconsin'},
      {name: 'Wyoming'}
    ]);
  }

  stateFormatter = (state: State) => state.name;
  stateComparer = (stateA: State, stateB: State) => (stateA && stateA.name) === (stateB && stateB.name);
}
