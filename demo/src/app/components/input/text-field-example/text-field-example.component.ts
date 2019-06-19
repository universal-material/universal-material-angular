import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-field-example',
  templateUrl: './text-field-example.component.html',
  styleUrls: ['./text-field-example.component.scss']
})
export class TextFieldExampleComponent implements OnInit {

  invalid: boolean;

  constructor() {}

  ngOnInit() {
  }

}
