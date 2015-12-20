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
    Post.find().sort('-_id').then(function(values){
        res.render('index', {title: req.app.locals.cmssettings.title, pages: req.app.locals.pageTitles, posts: values});
    });
});

router.get('/page/:id', function(req, res) {
    let pageId = req.params.id;
    Page.find({_id: pageId}).then(function(values){
        res.render('singlePage', {title: req.app.locals.cmssettings.title, pages: req.app.locals.pageTitles, page: values[0]});
    });
});

router.get('/register', function(req, res) {
    Settings.find().then(function(val){
        let settings = val[0].toObject();
        if(settings.registrationEnabled){
            res.render('register', {title: req.app.locals.cmssettings.title});
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
    res.render('login', {title: req.app.locals.cmssettings.title, user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/admin');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
