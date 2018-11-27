import { ViewPagerModule } from './view-pager.module';

describe('ViewPagerModule', () => {
  let viewPagerModule: ViewPagerModule;

  beforeEach(() => {
    viewPagerModule = new ViewPagerModule();
  });

  it('should create an instance', () => {
    expect(viewPagerModule).toBeTruthy();
  });
});
