'use strict';
var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
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
    // let mongoDb = mongoose.connect('mongodb://localhost/js-cms');
    Promise.all([
        postModel.find(),
        pageModel.find()
    ]).then(function(values){
        // mongoDb.disconnect();
        res.render('index', {title: 'Express', posts: values[0], pages: values[1]});
    });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/admin');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
