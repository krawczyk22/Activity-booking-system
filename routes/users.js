var Router = require('koa-router');
var model = require('../models/user.js');
var sha256 = require('js-sha256');

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
   var hash = sha256.create();
   hash.update(cnx.request.body.password);
   hash.hex();
   let newUser = {username:cnx.request.body.username, password:hash
   };
   await model.addUser(newUser);
   cnx.body = {message:"added successfully"};
});

//note that we have injected the body parser only in the POST request
router.post('/login/', bodyParser(), async (cnx, next) =>{
   var hash = sha256.create();
   hash.update(cnx.request.body.password);
   hash.hex();
   await model.loginCheck(cnx.request.body.username);
   console.log({password:hash});
   //cnx.body = {message:"added successfully"};
});

module.exports = router;
