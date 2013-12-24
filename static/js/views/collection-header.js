define([

	'marionette',

    'tplmanager'
    
], function (Marionette, tpl) {

	return Marionette.ItemView.extend({

		template: tpl ('collection-header'),

		templateHelpers: function(){
			// strange way, but still ok
			return {
				total: this.collection.length
			}
		},  

        events: {
          	"click .controls .add-item" : "addItem",
            "click .close"              : "logout"
        },

        initialize: function(){
        	this.listenTo(this.collection, 'all', this.render, this);
        },

        addItem: function(){

	        this.collection.create({
	               created_at: (new Date()).getTime()
	            }, {wait: true})

                .fail (function (res, error, responseText){
                    console.error('creating failed', res, error, responseText);
                });;

	        return false;
        },

        logout: function(){
            app.session.destroy();
            return false;
        }		   
	});

});