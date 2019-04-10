import { ButtonModule } from './button.module';

describe('ButtonsModule', () => {
  let buttonsModule: ButtonModule;

  beforeEach(() => {
    buttonsModule = new ButtonModule();
  });

  it('should create an instance', () => {
    expect(buttonsModule).toBeTruthy();
  });
});
