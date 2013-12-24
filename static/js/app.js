define ([

    'jquery',
    'underscore',
    'marionette',

    'models/session',
    'router'

], function ($, _, Marionette, Session, createRouter) {

    var app = new Marionette.Application();

    app.addRegions({
      mainRegion : '#main'
    });

    app.router = createRouter(app);
    
    app.session = new Session();
    
    app.listenTo(app.session, 'unauthorized', function(){
      app.router.handleErrors (401);
    });

    app.listenTo(app.session, 'change:sid', function(session){
      if (session.get('sid')){
        app.initNavigation();       
      } else {
        app.router.handleErrors (401);
        app.stopNavigation();
      }
    });

    app.stopNavigation = function(){
      Backbone.history.stop ();
    };
    app.initNavigation = function(){

      // $(document).on('click', 'a', function (){
      //   // links click to router navigate
      //   app.router.navigate( $(this).attr('href'), true );
      //   return false;
      // });

      Backbone.history.start ();   
    };

    app.on('initialize:after', function(){
      console.log('application started...');
    });

    return window.app = app;

}); 