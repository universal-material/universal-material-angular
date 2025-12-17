import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UniversalMaterialModule } from '@universal-material/angular';

@Component({
  selector: 'app-slider-example',
  templateUrl: './slider-example.component.html',
  styleUrls: ['./slider-example.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    UniversalMaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SliderExampleComponent {

  value = 50
  batata= false;
}
