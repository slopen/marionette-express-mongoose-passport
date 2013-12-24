define ([

    'underscore',
    'backbone',

    'routes/registry',

    'layouts/login',
    'layouts/error'

], function (_, Backbone, registry, loginLayout, errorLayout) {

  return function (app){

    var router = Backbone.Router.extend({

      initialize: function(){

        var router = this;

        // apply routes from registry
        _.each (registry, function (entry) {
          var route     = entry [0],
              eventName = entry [1],
              getLayout = entry [2];

          router.route (route, eventName, function () {

            getLayout.apply(router, arguments)

              .then(function (layout){
                router.swapLayout ( new layout );    
              })

              .fail(_.bind (function (req){
                router.handleErrors (req.status);
              }, router));
            
          });

        });

      },

      swapLayout: function (layout) {
        app.mainRegion.close ();
        app.mainRegion.show (layout);
      },

      handleErrors: function(status){

        var layout;

        switch(status){

          case 401: 
            layout = new loginLayout({
              model: app.session
            });
            break;

          default: 
            layout = new errorLayout({
              model: new Backbone.Model({
                title: 'Error:',
                error: message
              })
            });
        }

        this.swapLayout( layout );

      },

      reload: function(){
        console.log('router reload');
        Backbone.history.stop(); 
        Backbone.history.start();
      }

    });

    return new router;

  };

}); 