/* global describe, beforeEach, it */

const path = require('path');
const expect = require('expect.js');
const readFile = require('../../Nancy.ViewEngines.React/tools/commands/file').readFile;
const parseConfig = require('../../Nancy.ViewEngines.React/tools/commands/options').parseConfig;

describe('Default test', () => {
  beforeEach(() => {
    const file = path.resolve(__dirname, '../ConfigurationFixtures', 'Default.config');
    this.parse = readFile(file).then(parseConfig);
  });

  it('should set up script properties', () =>
    this.parse.then(config => {
      expect(config.script.dir).to.be('client');
      expect(config.script.name).to.be('script.js');
      expect(config.script.extensions).to.have.length(1).and.to.contain('jsx');
    }));

  it('should set up default layout', () =>
    this.parse.then(config => {
      const layout = config.script.layout.split(/[\\/]/);

      // TODO should be endsWith
      expect(layout).to.contain('client');
      expect(layout).to.contain('layout.jsx');
    }));

  it('should set up server assets path', () =>
    this.parse.then(config => {
      expect(config.server.assets.path).to.be('assets');
    }));
});
