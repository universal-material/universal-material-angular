import { DropdownInputModule } from './dropdown-input.module';

describe('DropdownInputModule', () => {
  let dropdownInputModule: DropdownInputModule;

  beforeEach(() => {
    dropdownInputModule = new DropdownInputModule();
  });

  it('should create an instance', () => {
    expect(dropdownInputModule).toBeTruthy();
  });
});
