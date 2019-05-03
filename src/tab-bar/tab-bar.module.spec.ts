import { TabBarModule } from './tab-bar.module';

describe('TabBarModule', () => {
  let tabBarModule: TabBarModule;

  beforeEach(() => {
    tabBarModule = new TabBarModule();
  });

  it('should create an instance', () => {
    expect(tabBarModule).toBeTruthy();
  });
});
