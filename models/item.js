var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: String,
    content: String
});

var model = mongoose.model ('Item', schema);

exports = module.exports = function (db) {
  return db.model('Item');
};