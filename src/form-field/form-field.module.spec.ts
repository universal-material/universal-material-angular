import { FormFieldModule } from './form-field.module';

describe('FormFieldModule', () => {
  let formFieldModule: FormFieldModule;

  beforeEach(() => {
    formFieldModule = new FormFieldModule();
  });

  it('should create an instance', () => {
    expect(formFieldModule).toBeTruthy();
  });
});
