"use strict";
var express = require('express');
var router = express.Router();
var Settings = require('../models/settings');
var Page = require('../models/page');
var Post = require('../models/post');

router.get('/', function(req, res, next) {
    if (req.user) {
        res.render('admin/admin', {layout: 'admin/layout_admin'});
    } else {
        res.redirect('/login');
    }
});

router.get('/settings', function(req, res, next) {
    if (req.user) {
        // TODO
        Settings.find().then(function(val){
            let settings = val[0].toObject();
            delete settings['_id'];
            //console.log(settingsRes);
            res.render('admin/settings', {layout: 'admin/layout_admin', cmssettings: settings});
        });
    } else {
        res.redirect('/login');
    }
});

router.post('/settings', function(req, res) {
    if (req.user) {
        // console.log(JSON.parse(req.body));
        Settings.find().then(function(val){
            let settings = val[0]; // type = mongoose doc
            settings.update({
                title: req.body.title,
                registrationEnabled: req.body.registrationEnabled
            }, function(err, rawResponse){
                if (!err) {
                    res.redirect('/admin/settings');
                    // TODO better UX with success
                    // res.render('admin/settings', {layout: 'admin/layout_admin', cmssettings: settingsRes});
                }
                // TODO handle error
            });
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/pages', function(req, res, next) {
    if (req.user) {
        Page.find().then(function(val){
            res.render('admin/pages', {layout: 'admin/layout_admin', pages: val});
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/page/:id', function(req, res) {
    if (req.user) {
        let pageId = req.params.id;
        Page.findById(pageId).then(function(doc){
            res.render('admin/singlePage', {layout: 'admin/layout_admin', page: doc.toObject()});
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/posts', function(req, res, next) {
    if (req.user) {
        // TODO
        res.redirect('/admin');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
