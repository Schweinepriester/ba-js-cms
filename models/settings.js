var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Settings = new Schema({
    title: String,
    registrationEnabled: Boolean
});

module.exports = mongoose.model('Settings', Settings);