Package.describe({
  name: 'additivegenius:quantities',
  version: '1.0.0',
  summary: 'Allows Meteor to understand physical units and handle their conversions and formatting via the js-quantites ',
  git: 'git@github.com:studioFATHOM/meteor-quantities.git',
  documentation: 'README.md'
});

Npm.depends( {
  'js-quantities': '1.6.3'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2.3');
  api.use('ecmascript');
  api.use('ejson');
  api.mainModule('index.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ecmascript');
  api.use('ejson');
  api.mainModule('test.js');
});
