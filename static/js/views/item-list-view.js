define ([

    'underscore',
    'marionette',

    'tplmanager'

], function (_, Marionette, tpl) {

    // view for item in list
    var itemView = Marionette.ItemView.extend ({

        template: tpl ('item-list'),

        tagName: 'li',

        events: {
          "click .action-delete" : 'delete'
        },

        delete: function(){
          this.model.destroy();
          this.remove();

          return false;
        }
    });

    return itemView;

}); 