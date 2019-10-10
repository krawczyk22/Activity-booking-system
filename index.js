//import koa
var Koa = require('koa');

//import all the routes
var welcome = require('./routes/welcome.js');
var admin = require('./routes/admin.js');
var users = require('./routes/users.js');

//create a koa instance and store it in app variable
var app = new Koa();

////apply the routes as a middleware
app.use(welcome.routes());
app.use(admin.routes());
app.use(users.routes());

//if there is no environment variable set for port number
//use a default value of 3000
var port = process.env.PORT || 3000;

//run the werver on port 3000
app.listen(port);