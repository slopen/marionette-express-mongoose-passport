define ([

    'underscore',
    'backbone'

], function (_, Backbone) {

	// model for item in list
    var itemModel = Backbone.Model.extend({
        
        idAttribute: '_id',

        urlRoot: '/items',

        defaults:{
            title  : "New item",
            content: ""
        }
        
    }); 
    
    return itemModel;

});