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
            req.app.locals.cmssettings = val[0];
            let settings = val[0].toObject();
            delete settings['_id'];
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
            let tempTitles = [];
            val.forEach(function(page, index, arr){
                tempTitles.push({title: page.title, _id: page._id});
            });
            req.app.locals.pageTitles = tempTitles;
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
            res.render('admin/singlePage', {layout: 'admin/layout_admin', page: doc.toObject(), editor: true});
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/new/page', function(req, res) {
    if (req.user) {
        let newPage = new Page();
        newPage.save(function(err, doc){
            if(!err) {
                res.redirect('/admin/page/'+doc._id);
            }
        });
    } else {
        res.redirect('/login');
    }
});

router.post('/page/:id', function(req, res) {
    if (req.user) {
        let pageId = req.params.id;
        Page.findById(pageId).then(function(doc){
            doc.update({
                title: req.body.title,
                body: req.body.body
            }, function(err, rawResponse){
                if (!err) {
                    res.redirect('/admin/page/'+pageId);
                }
            });
        });
    } else {
        res.redirect('/login');
    }
});

router.delete('/page/:id', function(req, res) {
    if (req.user) {
        let pageId = req.params.id;
        Page.findByIdAndRemove(pageId).then(function(doc){
            res.send({redirect: '/admin/pages'});
        });
    } else {
        res.redirect('/login');
    }
});

// start posts
router.get('/posts', function(req, res, next) {
    if (req.user) {
        Post.find().sort('-_id').then(function(val){
            res.render('admin/posts', {layout: 'admin/layout_admin', posts: val});
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/post/:id', function(req, res) {
    if (req.user) {
        let postId = req.params.id;
        Post.findById(postId).then(function(doc){
            res.render('admin/singlePost', {layout: 'admin/layout_admin', post: doc.toObject(), editor: true});
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/new/post', function(req, res) {
    if (req.user) {
        let newPost = new Post();
        newPost.save(function(err, doc){
            if(!err) {
                res.redirect('/admin/post/'+doc._id);
            }
        });
    } else {
        res.redirect('/login');
    }
});

router.post('/post/:id', function(req, res) {
    if (req.user) {
        let postId = req.params.id;
        Post.findById(postId).then(function(doc){
            doc.update({
                title: req.body.title,
                body: req.body.body
            }, function(err, rawResponse){
                if (!err) {
                    res.redirect('/admin/post/'+postId);
                }
            });
        });
    } else {
        res.redirect('/login');
    }
});

router.delete('/post/:id', function(req, res) {
    if (req.user) {
        let postId = req.params.id;
        Post.findByIdAndRemove(postId).then(function(doc){
            res.send({redirect: '/admin/posts'});
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
