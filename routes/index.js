'use strict';
var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Settings = require('../models/settings');
var Page = require('../models/page');
var Post = require('../models/post');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/* GET home page. */
router.get('/', function (req, res, next) {
    Promise.all([
        Post.find(),
        Page.find(),
        Settings.find()
    ]).then(function(values){
        res.render('index', {title: values[2][0].title, posts: values[0], pages: values[1]});
    });
});

router.get('/page/:id', function(req, res) {
    let pageId = req.params.id;
    Page.find({_id: pageId}).then(function(values){
        console.log(values[0]);
        res.render('singlePage', {page: values[0]});
    });
});

router.get('/register', function(req, res) {
    Settings.find().then(function(val){
        let settings = val[0].toObject();
        if(settings.registrationEnabled){
            res.render('register', { });
        } else {
            res.redirect('/');
        }
    });
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
