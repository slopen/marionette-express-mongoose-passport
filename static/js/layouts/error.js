define ([

    'marionette',

    'tplmanager'

], function (Marionette, tpl){

	var itemLayout = Marionette.Layout.extend({
		template: tpl ('error')
	});

	return itemLayout;
});