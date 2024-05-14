import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chip-input-example',
  templateUrl: './chip-input-example.component.html',
  styleUrls: ['./chip-input-example.component.scss']
})
export class ChipInputExampleComponent {

  // items: any[] | null = null;
  form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({items: new FormControl([])});
  }

  toggleDisabled() {
    const control = this.form.controls['items'];
    if (control.disabled) {
      control.enable();
      return;
    }

    control.disable();
  }
}
