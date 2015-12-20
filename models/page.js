var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var pageSchema = new Schema({
    _id: ObjectId,
    title: String,
    body: String
});

module.exports = mongoose.model('Page', pageSchema); // implying 'pages' as collection name
