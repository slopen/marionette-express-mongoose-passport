define([ 'underscore',


    'text!templates/layout.tpl',

    'text!templates/collection-header.tpl',
    'text!templates/model-header.tpl',

    'text!templates/items-list.tpl',
    'text!templates/item-list.tpl',

    'text!templates/item-edit.tpl',

    'text!templates/login.tpl',
    'text!templates/error.tpl'

], function (_){

    _.templateSettings.variable = 'data';

    return _.memoize (function (tpl){
        return _.template( require('text!templates/' + tpl + '.tpl') );
    });
});