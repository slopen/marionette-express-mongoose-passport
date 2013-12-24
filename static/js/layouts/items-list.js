define ([

    'underscore',
    'marionette',

    // data
    'collections/items-list',

    // views
    'views/collection-header',
    'views/items-list-view',

    // templates
    'tplmanager'        

], function(
	_, 
	Marionette,

	itemsList,

	collectionHeader,
	itemListView,

    tpl
){

	var itemLayout = Marionette.Layout.extend({

		template: tpl ('layout'),

		regions: {
			header : '#header',
			content: '#content'
		},

		onShow: function(){
			var options = {	collection: this.collection };

			var header = new collectionHeader (options)
			var listView = new itemListView (options);

			this.header.show (header);
			this.content.show (listView);
		}

	});

	return itemLayout;
});