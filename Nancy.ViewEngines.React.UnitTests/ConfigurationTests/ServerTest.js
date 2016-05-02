import path from 'path';
import expect from 'expect.js';
import { readFile } from '../../Nancy.ViewEngines.React/tools/commands/file';
import { parseConfig } from '../../Nancy.ViewEngines.React/tools/commands/options';

describe('Server test', () => {
  let parse;

  beforeEach(() => {
    const file = path.resolve(__dirname, '../ConfigurationFixtures', 'Server.config');
    parse = readFile(file).then(parseConfig);
  });

  it('should load properties', () =>
    parse.then(config => {
      expect(config.server.assets.path).to.be('assets-path');
    }));
});
