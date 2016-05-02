/* global describe, beforeEach, it */

const path = require('path');
const expect = require('expect.js');
const readFile = require('../../Nancy.ViewEngines.React/tools/commands/file').readFile;
const parseConfig = require('../../Nancy.ViewEngines.React/tools/commands/options').parseConfig;

describe('Server test', () => {
  beforeEach(() => {
    const file = path.resolve(__dirname, '../ConfigurationFixtures', 'Server.config');
    this.parse = readFile(file).then(parseConfig);
  });

  it('should load properties', () =>
    this.parse.then(config => {
      expect(config.server.assets.path).to.be('assets-path');
    }));
});
