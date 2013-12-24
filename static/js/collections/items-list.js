define ([

    'underscore',
    'backbone',

    'models/item'

], function (_, Backbone, itemModel) {

    // collection for items list
    var itemsList = Backbone.Collection.extend({
        url: '/items',        
        model: itemModel
    });    

    return itemsList;

});