var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (req.user) {
        res.render('admin/admin', {layout: 'admin/layout_admin'});
    } else {
        res.redirect('/login');
    }
});

router.get('/general', function(req, res, next) {
    if (req.user) {
        // TODO
        res.redirect('/admin');
    } else {
        res.redirect('/login');
    }
});

router.get('/pages', function(req, res, next) {
    if (req.user) {
        // TODO
        res.redirect('/admin');
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
