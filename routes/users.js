var Router = require('koa-router');
var model = require('../models/user.js');
var crypto = require('crypto');

var router = Router({
   prefix: '/api/v1.0/users'
});  //Prefixed all routes with /api/v1.0/users

//because we are going to parse POST parameters we will import koa-bodyparser
var bodyParser = require('koa-bodyparser');

//Routes will go here
router.get('/', async (cnx, next) => {
   let id = cnx.params.id;
   cnx.body = await model.getAllUsernames(id);
});

//the id should be a number greater than or equal 1
router.get('/get/:username', async (cnx, next) =>{
   let username = cnx.params.username;
   cnx.body = await model.getPasswordByUsername(username);
});

//note that we have injected the body parser only in the POST request
router.post('/insert/', bodyParser(), async (cnx, next) =>{
   var hash = crypto.createHash('sha256').update(cnx.request.body.password).digest('hex');
   let newUser = {username:cnx.request.body.username, password:hash};
   console.log(newUser);
   await model.addUser(newUser);
   cnx.body = {message:"added successfully"};
});

//note that we have injected the body parser only in the POST request
router.post('/login/', bodyParser(), async (cnx, next) =>{
   var password = crypto.createHash('sha256').update(cnx.request.body.password).digest('hex');
   let result = await model.loginCheck(cnx.request.body.username);
   if(result[0].password == password) {
      cnx.body = {message:"logged in"};
   }
   else {
      cnx.body = {message:"not logged in"};
   }
});

module.exports = router;
