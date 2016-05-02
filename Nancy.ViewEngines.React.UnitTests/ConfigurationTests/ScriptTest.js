/* global describe, beforeEach, it */

const path = require('path');
const expect = require('expect.js');
const readFile = require('../../Nancy.ViewEngines.React/tools/commands/file').readFile;
const parseConfig = require('../../Nancy.ViewEngines.React/tools/commands/options').parseConfig;

describe('Script test', () => {
  beforeEach(() => {
    const file = path.resolve(__dirname, '../ConfigurationFixtures', 'Script.config');
    this.parse = readFile(file).then(parseConfig);
  });

  it('should load properties', () =>
    this.parse.then(config => {
      expect(config.script.dir).to.be('script-dir');
      expect(config.script.name).to.be('script-name.js');
      expect(config.script.extensions).to.have.length(2);
      expect(config.script.layout).to.be('layout-name.jsx');
    }));

  it('should load extensions', () =>
    this.parse.then(config => {
      expect(config.script.extensions).to.have.length(2)
        .and.to.contain('es')
        .and.to.contain('jsx');
    }));
});
