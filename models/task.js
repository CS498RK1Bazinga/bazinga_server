// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TaskSchema   = new Schema({
  deadline: {type: Date, required:[true, 'Task deadline required']},
  name: {type: String, required:[true, 'Task name required']},
  assignedUserName: {type: String, default: 'unassigned'},
  assignedUser: {type: String, default: ''},
  dateCreated: Date,
  completed: {type: Boolean, default: false},
  description: {type: String, default: ''},
});

module.exports = mongoose.model('Task', TaskSchema);
