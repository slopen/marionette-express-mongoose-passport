require.config({

  paths: {

    'text'           : 'libs/text',

    'jquery'         : 'libs/jquery.min',
    'underscore'     : 'libs/lodash.min',
    'backbone'       : 'libs/backbone.min',
    'marionette'     : 'libs/backbone.marionette',

    'vow'            : 'libs/vow',

    'bootstrap'      : 'libs/bootstrap', 

    // application
    'app'            : 'app',
    'tplmanager'     : 'templates/tplmanager'
  },

  shim: {

      'backbone': {
          deps: ['underscore', 'jquery'],
          exports: 'Backbone'
      },

      'marionette': {
          exports: 'Backbone.Marionette',
          deps: ['backbone']
      },      

      'bootstrap': {
        deps: ['jquery']
      }
  }  

});

var deps = [

    // application
    'app',

    // libs
    'marionette',
    'bootstrap'

];

require (deps, function (app) {

    // launching
   app.start();  

});