// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var User = require('./models/user');
var Task = require('./models/task');
var bodyParser = require('body-parser');
var router = express.Router();

//replace this with your Mongolab URL
mongoose.connect('mongodb://Maddieee:Maddie4869@ds013221.mlab.com:13221/mp4',function(err) {
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
  res.json({ message: 'Nothing here. Go to /users or /tasks to play with the API.', data: []});
});


// post request, create object the field, save to database, save
// user.save(function(
// check for user.email == null user.name == null
// else if User.find({email: {$exist: true}})
// else {201 create the user}
//))
// UserfindByIdAndRemove(userID, function (xxx))

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
                res.status(500).json({message: 'internal server error hehehe!', data: []})
                res.send(err);
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
        user.dateCreated = new Date();
        user.pendingTasks = [];
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
      res.send(err);
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
      res.status(500).json({message: "buzhidao", data: []});
    else {
      if(user === null)
        res.status(404).json({message: "User not found", data: []});
      else {

        user.name = req.body.name;
        user.email = req.body.email;
        user.pendingTasks = req.body.pendingTasks;

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
      res.status(500).json({message: "buzhidao", data: []});
    } else {
      if(user === null)
        res.status(404).json({message:"User not found", data:[]});
      else {
          User.remove({
            _id: req.params.userId
          }, function(err,deletedUser){
            if(err)
                res.send(err);
            else
              res.status(200).json({message:"OK",data: deletedUser});
          });
      }
    }
  })
});

var tasksRoute = router.route('/tasks');

// tasks get
tasksRoute.get(function(req, res) {
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
        Task.find(function(err, tasks) {
            if (err) {
                res.status(500).json({message: 'internal server error hehehe!', data: []})
                res.send(err);
            }
            else {
              if(tasks === null)
                res.status(404).json({message: "Tasks not found", data: []});
              else
                res.status(200).json({message: 'OK', data: tasks});
            }
        }).find(where).sort(sort).select(select).skip(skip).limit(limit).count(count);
    });

// tasks post
tasksRoute.post(function(req, res) {
        var task = new Task();      // create a new instance of the Bear model
        task.name = req.body.name;  // set the bears name (comes from the request)
        task.deadline = req.body.deadline;
        task.dateCreated = new Date();
        task.assignedUser = req.body.assignedUser;
        task.assignedUserName = req.body.assignedUserName;
        task.completed = req.body.completed;
        task.description = req.body.description;

        // save the user and check for errors
        task.save(function(err) {
            if (err) {
              res.status(500).json({message: '' + err, data: []});
            } else {
              res.status(201).json({ message: 'Task added', data: task});
            }
        });
    });

tasksRoute.options(function(req, res){
      res.writeHead(200);
      res.end();
});

// task route
var taskRoute = router.route('/tasks/:taskId');

// task get
taskRoute.get(function(req,res) {
  Task.findById(req.params.taskId, function (err, task) {
    if(err) {
      res.send(err);
    } else {
      if(task === null)
        res.status(404).json({message: "Task not found", data: []});
      else
        res.status(200).json({ message: 'OK', data: task});
    }
  })
});

// task put
taskRoute.put(function(req,res) {
  Task.findById(req.params.taskId, function(err, task) {
    if(err)
      res.status(500).json({message: "buzhidao", data: []});
    else {
      if(task === null)
        res.status(404).json({message: "Task not found", data: []});
      else {
        task.name = req.body.name;  // set the bears name (comes from the request)
        task.deadline = req.body.deadline;
        task.assignedUser = req.body.assignedUser;
        task.assignedUserName = req.body.assignedUserName;
        task.completed = req.body.completed;
        task.description = req.body.description;

        // save the user
        task.save(function(err) {
          if(err)
            res.status(500).json({message: "buzhidao222", data: []});
          else
            res.status(200).json({message: "Task updated", data: task});
        })
      }
  }})
});

// task delete
taskRoute.delete(function(req,res) {
  Task.findById(req.params.taskId, function(err, task) {
    if(err) {
      res.status(500).json({message: "buzhidao", data: []});
    } else {
      if(task === null)
        res.status(404).json({message:"Task not found", data:[]});
      else {
          Task.remove({
            _id: req.params.taskId
          }, function(err,deletedTask){
            if(err)
                res.send(err);
            else
              res.status(200).json({message:"OK",data: deletedTask});
          });
      }
    }
  })
});

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
