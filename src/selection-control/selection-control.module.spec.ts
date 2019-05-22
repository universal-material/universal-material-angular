import { SelectionControlModule } from './selection-control.module';

describe('SelectionControlModule', () => {
  let selectionControlModule: SelectionControlModule;

  beforeEach(() => {
    selectionControlModule = new SelectionControlModule();
  });

  it('should create an instance', () => {
    expect(selectionControlModule).toBeTruthy();
  });
});
