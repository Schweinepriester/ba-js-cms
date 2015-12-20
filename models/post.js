var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var postSchema = new Schema({
    _id: ObjectId,
    title: String,
    body: String
});

module.exports = mongoose.model('Post', postSchema); // implying 'posts' as collection name
