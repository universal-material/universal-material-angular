import {TypeaheadConfig} from './typeahead-config';

describe('u-typeahead-config', () => {
  it('should have sensible default values', () => {
    const config = new TypeaheadConfig();

    expect(config.container).toBeUndefined();
    expect(config.editable).toBeTruthy();
    expect(config.focusFirst).toBeTruthy();
    expect(config.showHint).toBeFalsy();
  });
});
