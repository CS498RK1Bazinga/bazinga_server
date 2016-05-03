// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var User = require('./models/user');
var Task = require('./models/task');
var Event = require('./models/event');
var bodyParser = require('body-parser');
var router = express.Router();

//replace this with your Mongolab URL
mongoose.connect('mongodb://xotinc:12james3@ds047345.mlab.com:47345/cs498rk',function(err) {
  if(err)
    console.log(err);
  else
    console.log("successfully connected to mongodb");
});

// Create our Express application
var app = express();

// Use environment defined port or 4000
var port = process.env.PORT || 4000;

//Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
};
app.use(allowCrossDomain);

app.use(bodyParser.json());
// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));
// All our routes will start with /api
app.use('/api', router);
//Default route here
var homeRoute = router.route('/');

homeRoute.get(function(req, res) {
  res.json({ message: 'Nothing here. Go to /users or /events to play with the API.', data: []});
});

//Llama route
var llamaRoute = router.route('/llamas');

llamaRoute.get(function(req, res) {
  res.json([{ "name": "alice", "height": 12 }, { "name": "jane", "height": 13 }]);
});

//Add more routes here

// Users route
var usersRoute = router.route('/users');

// users get
usersRoute.get(function(req, res) {
        var where = null;
        var sort = null;
        var select = null;
        var skip = null;
        var limit = null;
        var count = null;
        if(req.query.where)
          where = eval("("+req.query.where+")");
        if (req.query.sort)
      		sort = eval("("+req.query.sort+")");
      	if (req.query.select)
      		select = eval("("+req.query.select+")");
      	if (req.query.skip)
      		skip = eval("("+req.query.skip+")");
      	if (req.query.limit)
      		limit = eval("("+req.query.limit+")");
      	if (req.query.count)
      		count = eval("("+req.query.count+")");
        User.find(function(err, users) {
            if (err) {
                res.status(500).json({message: 'Error in getting the users', data: []})
            }
            else {
              if(users === null)
                res.status(404).json({message: "Users not found", data: []});
              else
                res.status(200).json({ message: 'OK', data: users});
            }
        }).find(where).sort(sort).select(select).skip(skip).limit(limit).count(count);
    });

// users post
usersRoute.post(function(req, res) {
        var user = new User();      // create a new instance of the Bear model
        user.name = req.body.name;  // set the bears name (comes from the request)
        user.email = req.body.email;
        user.password = req.body.password;
        user.phoneNumber = req.body.phoneNumber;
        user.gender = req.body.gender;
        user.image = req.body.image;
        user.attending = req.body.attending;
        user.hosting = req.body.hosting;
        user.history = req.body.history;
        // save the user and check for errors
        user.save(function(err) {
            if (err) {
              if(err.code == 11000) {
                  res.status(500).json({message: 'This email already exists', data: []});
              }
              else {
                res.status(500).json({message: '' + err, data: []});
              }
            } else {
              res.status(201).json({ message: 'User added', data: user});
            }
        });
    });
// users option
usersRoute.options(function(req, res){
      res.writeHead(200);
      res.end();
});

// user route
var userRoute = router.route('/users/:userId');

// users get
userRoute.get(function(req,res) {
  User.findById(req.params.userId, function (err, user) {
    if(err) {
      res.status(500).json({message: "Error in getting user", data: []});
    } else {
      if(user === null)
        res.status(404).json({message: "User not found", data: []});
      else
        res.status(200).json({ message: 'OK', data: user});
    }
  })
});

// users put
userRoute.put(function(req,res) {
  User.findById(req.params.userId, function(err, user) {
    if(err)
      res.status(500).json({message: "Error in finding the user", data: []});
    else {
      if(user === null)
        res.status(404).json({message: "User not found", data: []});
      else {

          user.name = req.body.name;  // set the bears name (comes from the request)
          user.email = req.body.email;
          user.password = req.body.password;
          user.phoneNumber = req.body.phoneNumber;
          user.gender = req.body.gender;
          user.image = req.body.image;
          user.attending = req.body.attending;
          user.hosting = req.body.hosting;
          user.history = req.body.history;
        // save the user
        user.save(function(err) {
          if(err)
            res.status(500).json({message: "buzhidao222", data: []});
          else
            res.status(200).json({message: "User updated", data: user});
        })
      }
  }})
});

// user delete
userRoute.delete(function(req,res) {
  User.findById(req.params.userId, function(err, user) {
    if(err) {
      res.status(500).json({message: "Error in finding the user", data: []});
    } else {
      if(user === null)
        res.status(404).json({message:"User not found", data:[]});
      else {
          User.remove({
            _id: req.params.userId
          }, function(err,deletedUser){
            if(err)
                res.status(500).json({message: "Error in deleting the user", data: []});
            else
              res.status(200).json({message:"OK",data: deletedUser});
          });
      }
    }
  })
});

var eventsRoute = router.route('/events');

// events get
eventsRoute.get(function(req, res) {
        var where = null;
        var sort = null;
        var select = null;
        var skip = null;
        var limit = null;
        var count = null;
        if(req.query.where)
          where = eval("("+req.query.where+")");
        if (req.query.sort)
      		sort = eval("("+req.query.sort+")");
      	if (req.query.select)
      		select = eval("("+req.query.select+")");
      	if (req.query.skip)
      		skip = eval("("+req.query.skip+")");
      	if (req.query.limit)
      		limit = eval("("+req.query.limit+")");
      	if (req.query.count)
      		count = eval("("+req.query.count+")");
        Event.find(function(err, events) {
            if (err) {
                res.status(500).json({message: 'Error in getting the event.', data: []})
            }
            else {
              if(events === null)
                res.status(404).json({message: "Events not found", data: []});
              else
                res.status(200).json({message: 'OK', data: events});
            }
        }).find(where).sort(sort).select(select).skip(skip).limit(limit).count(count);
    });

// events post
eventsRoute.post(function(req, res) {
        var event = new Event();      // create a new instance of the Bear model
        event.name = req.body.name;
        event.time = req.body.time;  // set the bears name (comes from the request)
        event.hour = req.body.hour;
        event.place = req.body.place;
        event.description = req.body.description;
        event.host = req.body.host;
        event.attending = req.body.attending;
        event.completed = req.body.completed;
        event.foodstyle = req.body.foodstyle;
        event.occassion = req.body.occassion;
        
        // save the user and check for errors
        event.save(function(err) {
            if (err) {
              res.status(500).json({message: '' + err, data: []});
            } else {
              res.status(201).json({ message: 'Event added', data: event});
            }
        });
    });

eventsRoute.options(function(req, res){
      res.writeHead(200);
      res.end();
});




// event route
var eventRoute = router.route('/events/:eventId');

// event get
eventRoute.get(function(req,res) {
  Event.findById(req.params.eventId, function (err, event) {
    if(err) {
      res.status(500).json({message: "Error finding the event", data: []});
    } else {
      if(event === null)
        res.status(404).json({message: "Event not found", data: []});
      else
        res.status(200).json({ message: 'OK', data: event});
    }
  })
});

// event put
eventRoute.put(function(req,res) {
  Event.findById(req.params.eventId, function(err, event) {
    if(err)
      res.status(500).json({message: "Error in finding the event", data: []});
    else {
      if(event === null)
        res.status(404).json({message: "Event not found", data: []});
      else {
          event.time = req.body.time;  // set the bears name (comes from the request)
          event.place = req.body.place;
          event.description = req.body.description;
          event.host = req.body.host;
          event.attending = req.body.attending;
          event.completed = req.body.completed;
          event.foodstyle = req.body.foodstyle;
          event.occassion = req.body.occassion;

        // save the user
        event.save(function(err) {
          if(err)
            res.status(500).json({message: "Error in saving the event.", data: []});
          else
            res.status(200).json({message: "Event updated", data: event});
        })
      }
  }})
});

// event delete
eventRoute.delete(function(req,res) {
  Event.findById(req.params.eventId, function(err, event) {
    if(err) {
      res.status(500).json({message: "Error in getting the event", data: []});
    } else {
      if(event === null)
        res.status(404).json({message:"Event not found", data:[]});
      else {
          Event.remove({
            _id: req.params.eventId
          }, function(err,deletedEvent){
            if(err)
                res.status(500).json({message: "Error in removing the event", data: []});
            else
              res.status(200).json({message:"OK",data: deletedEvent});
          });
      }
    }
  })
});

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
