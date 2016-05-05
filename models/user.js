// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
  local: {
    name: {type: String, required: [true, 'A name is required!']},
    email: {type: String, required: [true, 'An email is required!'], unique: true},
    password: {type: String, required: [true, 'A password is required!']},
    phoneNumber: {type: String, required: [true, 'A phone number is required!']},
    gender: {type: String, required: [true, 'A gender is required!']},
    image: {type: String, default: ''},
    attending: {type: [String], default: []},
    hosting: {type: [String], default: []},
    history: {type: [String], default: []},
    following: {type: [String], default: []}
  }
});

module.exports = mongoose.model('User', UserSchema);
