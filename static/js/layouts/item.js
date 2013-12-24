define ([

    'underscore',
    'marionette',

    // data
    'collections/items-list',

    // views
    'views/model-header',
    'views/item-edit-view',    

    'tplmanager'

], function(
	_, 
	Marionette,

	itemsList,

	modelHeader,
	itemEditView,

    tpl
){

	var itemLayout = Marionette.Layout.extend({

		template: tpl ('layout'),

		regions: {
			header : '#header',
			content: '#content'
		},

		onShow: function(){
			var options = {	model: this.model };

			var header = new modelHeader (options)
			var listView = new itemEditView (options);

			this.header.show (header);
			this.content.show (listView);
		}

	});

	return itemLayout;
});