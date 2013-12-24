define ([

    'jquery',
    'underscore',
    'marionette',

    'tplmanager'

], function ($, _, Marionette, tpl) {

    var itemEditView = Marionette.ItemView.extend({

        events: {
          'change' : 'update'
        },

        // template for one item
        template: tpl ('item-edit'),

        initialize: function(){
          this.listenTo(this.model, 'change', this.render, this);
        },

        update: function (event) {
          var model = this.model,
              $field = $ (event.target),
              name = $field.attr('name'),
              data = {};

          data [name] = $field.val();
          model.set(data, {silent: true});
        }
    });    

    return itemEditView;

}); 