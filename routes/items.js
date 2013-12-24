
var routes = function (db){

    var Item = require('../models/item.js') (db);

    return {

        findAll: function(req, res) {

            console.log('db: retrieving all');

            Item.find({}, function (err, docs) {
                if (err) {
                    res.send(500, {'error': 'collection error: ' + err});
                } else {
                    console.log('db: ' + docs);
                    res.send(docs);
                }
            });
        },

        findById: function (req, res) {
            var id = req.params.id;
            
            console.log('db: retrieving item: ' + id);

            Item.findById(id, function (err, doc) {
                if (err) {
                    res.send(500, {'error': 'find error: ' + err});
                } else {
                    console.log('db: ' + doc + ' found');
                    res.send(doc);
                }
            });
        },

        addItem: function (req, res) {
            var item = req.body;

            console.log('db: adding item: ' + JSON.stringify(item));

            Item.create(item, function (err, doc) {
                if (err) {
                    res.send(500, {'error': 'create error: ' + err});
                } else {
                    console.log('db: ' + doc + ' created');
                    res.send(doc);
                }
            });

        },

        updateItem: function (req, res) {
            var id = req.params.id,
                item = req.body;

            console.log('db: updating item: ' + id);
            console.log(JSON.stringify (item));

            delete req.body._id;

            Item.findByIdAndUpdate(id, item, function (err, doc) {
                if (err) {
                    res.send(500, {'error': 'update error: ' + err});
                } else {
                    console.log('db: ' + doc + ' updated');
                    res.send(doc);
                }
            });   
        },

        deleteItem: function (req, res) {
            var id = req.params.id;

            console.log('deleting item: ' + id);

            Item.findByIdAndRemove(id, function(err, doc){
                if (err) {
                    res.send(500, {'error': 'delete error: ' + err});
                } else {
                    console.log('' + doc + ' document(s) deleted');
                    res.send(doc);
                }
            });   
        }
    };
};


exports = module.exports = routes;