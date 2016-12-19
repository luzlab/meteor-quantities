Package.describe({
  name: 'quantities',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Wraps the js-quantities module to allow it\'s use in Meteor app',
  // URL to the Git repository containing the source code for this package.
  git: 'ssh://git@bitbucket.dev.studiofathom.com:7999/fs/quantities.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends( {
  'js-quantities': '1.6.3'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2.3');
  api.use('ecmascript');
  api.use('ejson');
  api.use('check');
  api.mainModule('index.js');
});

Package.onTest(function(api) {
  api.use('practicalmeteor:mocha');
  api.use('ecmascript');
  api.use('ejson');
  api.use('check');
  api.mainModule('test.js');
});
