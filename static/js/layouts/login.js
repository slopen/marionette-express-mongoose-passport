define ([

    'marionette',

    'tplmanager',

    'app'

], function (Marionette, tpl){

	var itemLayout = Marionette.Layout.extend({
		template: tpl ('login'),

        ui: {
            email: '#email',
            password: '#password'
        },

        events: {
            'submit' : 'login'
        },

        login: function(){
            this.model.save({

                email: this.ui.email.val(),
                password: this.ui.password.val()

            }, {wait:true})
                .then(function(res){
                    console.info('logged in successfully');
                })
                .fail(function(res){
                    console.error('login failed:', res.responseText);
                });


            return false;
        }
	});

	return itemLayout;
});