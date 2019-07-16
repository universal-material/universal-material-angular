import { ExpansionPanelModule } from './expansion-panel.module';

describe('ExpansionPanelModule', () => {
  let expansionPanelModule: ExpansionPanelModule;

  beforeEach(() => {
    expansionPanelModule = new ExpansionPanelModule();
  });

  it('should create an instance', () => {
    expect(expansionPanelModule).toBeTruthy();
  });
});
