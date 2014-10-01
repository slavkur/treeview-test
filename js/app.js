requirejs.config({
    "baseUrl": "js",
    paths: {
      "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
      "less": "http://cdnjs.cloudflare.com/ajax/libs/less.js/1.7.3/less.min",
      "underscore": "http://underscorejs.org/underscore-min",
      "backbone": "http://backbonejs.org/backbone-min",
      "handlebars": "lib/handlebars-v1.3.0",
      "hbs": "lib/require/hbs",
      "text": "lib/require/text"
    },
    shim: {
        "handlebars": {
          exports: "Handlebars"
        }
    },
    "hbs": {
        templateExtension: ".html",
        disableI18n: true
    }
});

requirejs(['main', 'less']);
