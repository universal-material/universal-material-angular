import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, OperatorFunction, merge, firstValueFrom, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { Typeahead } from '@universal-material/angular';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-typeahead-example',
  templateUrl: './typeahead-example.component.html',
  styleUrls: ['./typeahead-example.component.scss']
})
export class TypeaheadExampleComponent {
  model: any = {name: 'Alabama'};
  formatter = (state: {name: string}) => state.name;

  search = (term: string) =>
    firstValueFrom(of(states
      .filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
      .map(s => ({name: s}))));
}
