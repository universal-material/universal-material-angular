import { ChipFieldModule } from './chip-field.module';

describe('ChipInputModule', () => {
  let chipInputModule: ChipFieldModule;

  beforeEach(() => {
    chipInputModule = new ChipFieldModule();
  });

  it('should create an instance', () => {
    expect(chipInputModule).toBeTruthy();
  });
});
