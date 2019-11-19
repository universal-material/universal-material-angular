import { CircularProgressModule } from './circular-progress.module';

describe('CircularProgressModule', () => {
  let circularProgressModule: CircularProgressModule;

  beforeEach(() => {
    circularProgressModule = new CircularProgressModule();
  });

  it('should create an instance', () => {
    expect(circularProgressModule).toBeTruthy();
  });
});
