import { SnackbarModule } from './snackbar.module';

describe('SnackbarModule', () => {
  let snackbarModule: SnackbarModule;

  beforeEach(() => {
    snackbarModule = new SnackbarModule();
  });

  it('should create an instance', () => {
    expect(snackbarModule).toBeTruthy();
  });
});
