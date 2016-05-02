/* global describe, beforeEach, it */

import path from 'path';
import expect from 'expect.js';
import { readFile } from '../../Nancy.ViewEngines.React/tools/commands/file';
import { parseConfig } from '../../Nancy.ViewEngines.React/tools/commands/options';

describe('Script test', () => {
  let parse;

  beforeEach(() => {
    const file = path.resolve(__dirname, '../ConfigurationFixtures', 'Script.config');
    parse = readFile(file).then(parseConfig);
  });

  it('should load properties', () =>
    parse.then(config => {
      expect(config.script.dir).to.be('script-dir');
      expect(config.script.name).to.be('script-name.js');
      expect(config.script.extensions).to.have.length(2);
      expect(config.script.layout).to.be('layout-name.jsx');
    }));

  it('should load extensions', () =>
    parse.then(config => {
      expect(config.script.extensions).to.have.length(2)
        .and.to.contain('es')
        .and.to.contain('jsx');
    }));
});
