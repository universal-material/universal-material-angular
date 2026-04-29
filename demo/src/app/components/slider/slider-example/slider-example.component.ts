import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SliderComponent, UniversalMaterialModule } from '@universal-material/angular';

@Component({
  selector: 'app-slider-example',
  templateUrl: './slider-example.component.html',
  styleUrls: ['./slider-example.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    UniversalMaterialModule,
    SliderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SliderExampleComponent {

  protected value = signal(50)
  batata= false;
}
