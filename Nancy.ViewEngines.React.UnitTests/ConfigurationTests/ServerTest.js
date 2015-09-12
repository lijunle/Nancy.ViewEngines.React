import path from 'path';
import expect from 'expect.js';
import { _readFile, _parseConfig } from '../../Nancy.ViewEngines.React/tools/gulp/options';

describe('Server test', () => {
  let parse;

  beforeEach(() => {
    const file = path.resolve(__dirname, '../ConfigurationFixtures', 'Server.config');
    parse = _readFile(file).then(_parseConfig);
  });

  it('should load properties', () =>
    parse.then(config => {
      expect(config.server.assets.path).to.be('assets-path');
    }));
});
