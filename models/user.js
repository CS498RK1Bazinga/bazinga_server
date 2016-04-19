// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
  name: {type: String, required: [true, 'A name is required!']},
  email: {type: String, required: [true, 'An email is required!'], unique: true},
  pendingTasks: {type: [String], default: []},
  dateCreated: Date // {Object type}
});

module.exports = mongoose.model('User', UserSchema);
