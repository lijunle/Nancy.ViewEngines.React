import path from 'path';
import expect from 'expect.js';
import { _readFile, _parseConfig } from '../../Nancy.ViewEngines.React/tools/gulp/options';

describe('Default test', () => {
  let parse;

  beforeEach(() => {
    const file = path.resolve(__dirname, '../ConfigurationFixtures', 'Default.config');
    parse = _readFile(file).then(_parseConfig);
  });

  it('should set up script properties', () =>
    parse.then(config => {
      expect(config.script.dir).to.be('client');
      expect(config.script.name).to.be('script.js');
      expect(config.script.extensions).to.have.length(1).and.to.contain('jsx');
    }));

  it('should set up default layout', () =>
    parse.then(config => {
      const layout = config.script.layout.split(/[\\/]/);

      // TODO should be endsWith
      expect(layout).to.contain('client');
      expect(layout).to.contain('layout.jsx');
    }));

  it('should set up server assets path', () =>
    parse.then(config => {
      expect(config.server.assets.path).to.be('assets');
    }));
});
