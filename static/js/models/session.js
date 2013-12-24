define(['backbone'], function(Backbone){
    var session = Backbone.Model.extend({

        timeout: null,
        checkInterval: 60 * 1000 * 10,

        defaults: {
            sid : null
        },

        url: '/session',

        initialize: function(){
            this.check ();
            this.on ('destroy', this.destroyed, this);
            this.on ('change:sid', this.handleAutoUpdate, this);
        },

        handleAutoUpdate: function(){
            clearTimeout(this.timeout);

            if (this.get('sid')){
                this.autoUpdate();
            }
        },

        autoUpdate: function(){
            var session = this;

            session.timeout = setTimeout(function (){
                session.check();
                session.autoUpdate();
            }, session.checkInterval);
        },

        check: function(){
            var session = this;

            session.fetch()
                .then (function (res){
                    console.log('logged in');                   
                })
                .fail (function (res, error, responseText){
                    session.clear();
                    session.trigger('unauthorized');
                });
        },

        destroy: function(){
            var session = this;

            Backbone.Model.prototype.destroy.apply(session, arguments)
                .then(function(){
                    session.clear();
                    console.log('logged out');
                })
                .fail(function(){
                    console.error('log out error');
                });
        }
    });

    return session;

})