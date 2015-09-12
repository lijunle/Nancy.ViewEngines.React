import path from 'path';
import expect from 'expect.js';
import { _readFile, _parseConfig } from '../../Nancy.ViewEngines.React/tools/gulp/options';

describe('Script test', () => {
  let parse;

  beforeEach(() => {
    const file = path.resolve(__dirname, '../ConfigurationFixtures', 'Script.config');
    parse = _readFile(file).then(_parseConfig);
  });

  it('should load properties', () =>
    parse.then(config => {
      expect(config.script.dir).to.be('script-dir');
      expect(config.script.name).to.be('script-name.js');
      expect(config.script.extensions).to.have.length(2);
    }));

  it('should load extensions', () =>
    parse.then(config => {
      expect(config.script.extensions).to.have.length(2)
        .and.to.contain('es')
        .and.to.contain('jsx');
    }));
});
