define ([

    'marionette',
    'vow',

    // data
    'models/item',
    'collections/items-list',

    // layouts
    'layouts/item',
    'layouts/items-list'

], function (

    Marionette,
    Promises,

    // data
    itemModel,
    itemsList,

    // layouts
    itemLayout,
    itemsListLayout
  ) {

  // common routes code

  var routes = {};

  // collection route 
  routes [''] = {

    eventName: 'show-list',

    getLayout: function () {

      var collection = new itemsList();

      return collection.fetch({wait: true})
        .then(function (){
          return itemsListLayout.extend({
            collection: collection
          });
        });

    }
  };

  // single model route
  routes ['item/:id'] = {

    eventName: 'show-item',

    getLayout: function (id) {

      var model = new itemModel ({_id: id});

      return model.fetch({wait: true})
        .then (function (){
          return itemLayout.extend({
            model: model
          });
        });

    }     
  };

  return routes;

}); 