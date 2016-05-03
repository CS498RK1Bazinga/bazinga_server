var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EventSchema   = new Schema({
	name: {type:String, required:[true, 'Name required']},
    time: {type: Date, required:[true, 'Time required']},
    hour: {type: Date, required:[true,'Hours required']},
    place: {type: String, required:[true, 'Place required']},
    description: {type: String, default: ''},
    host: {type: String, required:[true, 'Host required']},
    attending: {type: [String], default: []},
    completed: {type: Boolean, default: false},
    foodstyle: {type: String, default: ''},
    occassion: {type: String, default: ''}
});

module.exports = mongoose.model('Event', EventSchema);
