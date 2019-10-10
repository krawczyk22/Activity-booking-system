var Router = require('koa-router');
var model = require('../models/user.js');

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
   let newUser = {username:cnx.request.body.username, password:cnx.request.body.password
};
await model.addUser(newUser);
cnx.body = {message:"added successfully"};
});

module.exports = router;
