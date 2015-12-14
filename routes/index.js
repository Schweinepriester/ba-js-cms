'use strict';
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var postSchema = new Schema({
    _id: ObjectId,
    title: String,
    body: String
});
var postModel = mongoose.model('post', postSchema); // implying 'posts' as collection name

var pageSchema = new Schema({
    _id: ObjectId,
    title: String,
    body: String
});
var pageModel = mongoose.model('page', pageSchema); // implying 'pages' as collection name

/* GET home page. */
router.get('/', function (req, res, next) {
    let mongoDb = mongoose.connect('mongodb://localhost/js-cms');
    Promise.all([
        postModel.find(),
        pageModel.find()
    ]).then(function(values){
        mongoDb.disconnect();
        console.log(values);
        res.render('index', {title: 'Express', posts: values[0], pages: values[1]});
    });

    /*postModel.find(function (err, posts) {
        if (!err) {
            res.render('index', {title: 'Express', posts: posts});
        } else {
            throw err;
        }
        mongoDb.disconnect();
    });*/
});

module.exports = router;
