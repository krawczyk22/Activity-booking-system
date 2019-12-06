//import koa
var Koa = require('koa');
const cors = require('@koa/cors');
const passport = require('koa-passport');


//import all the routes
var welcome = require('./routes/welcome.js');
var admin = require('./routes/admin.js');
var users = require('./routes/users.js');
var activities = require('./routes/activities.js');
var tags = require('./routes/tags.js');
var comments = require('./routes/comments.js');

//create a koa instance and store it in app variable
var app = new Koa();

require('./auth');
app.use(passport.initialize());
app.use(cors());

////apply the routes as a middleware
app.use(welcome.routes());
app.use(admin.routes());
app.use(users.routes());
app.use(activities.routes());
app.use(tags.routes());
app.use(comments.routes());


//if there is no environment variable set for port number
//use a default value of 3000
var port = process.env.PORT || 3000;

//run the werver on port 3000
app.listen(port);