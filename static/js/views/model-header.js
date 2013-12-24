define([

    'marionette',


    'tplmanager'

], function (Marionette, tpl) {

    return Marionette.ItemView.extend({

        template: tpl('model-header'),

        events: {
            "click .controls .back" : "moveBack",
            "click .controls .save" : "saveModel"
        },

        initialize: function(){
            this.listenTo(this.model, 'all', this.render, this);
        },

        saveModel: function(){
            this.model.save();
            return false;
        },

        moveBack: function(){
            window.history.back();
        }		   
    });

});