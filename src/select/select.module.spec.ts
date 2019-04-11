import { SelectModule } from './select.module';

describe('DropdownInputModule', () => {
  let dropdownInputModule: SelectModule;

  beforeEach(() => {
    dropdownInputModule = new SelectModule();
  });

  it('should create an instance', () => {
    expect(dropdownInputModule).toBeTruthy();
  });
});
