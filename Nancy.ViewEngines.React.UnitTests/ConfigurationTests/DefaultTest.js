import path from 'path';
import expect from 'expect.js';
import { _readFile, _parseConfig } from '../../Nancy.ViewEngines.React/tools/gulp/options';

describe('Default test', () => {
  let parse;

  beforeEach(() => {
    const file = path.resolve(__dirname, '../ConfigurationFixtures', 'Default.config');
    parse = _readFile(file).then(_parseConfig);
  });

  it('should set up script properties', (done) => {
    parse.then(config => {
      expect(config.script.dir).to.be('client');
      expect(config.script.name).to.be('script.js');
      expect(config.script.extensions).to.have.length(0);
      done();
    });
  });

  it('should set up server assets path', (done) => {
    parse.then(config => {
      expect(config.server.assets.path).to.be('assets');
      done();
    });
  });
});
