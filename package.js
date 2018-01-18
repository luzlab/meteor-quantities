Package.describe({
  name: 'fathom:quantities',
  version: '1.0.7',
  summary:
    'Allows Meteor to understand physical units (including conversions and formatting).',
  git: 'https://github.com/studioFATHOM/meteor-quantities.git',
  documentation: 'README.md',
});

Npm.depends({
  'js-quantities': '1.6.6',
  'ejson-extras': '1.0.15',
});

Package.onUse(function(api) {
  api.versionsFrom('1.4');
  api.use('ecmascript');
  api.mainModule('index.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ecmascript');
  api.use('ejson');
  api.use('check');
  api.mainModule('test.js');
});
