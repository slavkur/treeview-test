var tests = [];

for (var file in window.__karma__.files) {
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/js',

  paths: {
    "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
    "underscore": "http://underscorejs.org/underscore-min",
    "backbone": "http://backbonejs.org/backbone-min",
    "handlebars": "lib/handlebars-v1.3.0",
    "hbs": "lib/require/hbs",
    "text": "lib/require/text",
    "treeview": "views/treeview"
  },

  shim: {
    'underscore': {
        exports: '_'
    },
    "handlebars": {
      exports: "Handlebars"
    }
  },

  "hbs": {
      templateExtension: ".html",
      disableI18n: true
  },

  // dynamically load all test files
  deps: tests,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
