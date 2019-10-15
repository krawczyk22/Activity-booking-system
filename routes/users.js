'use strict';

var Router = require('koa-router');
var model = require('../models/user.js');

var router = Router({
   prefix: '/api/v1.0/users'
});  //Prefixed all routes with /api/v1.0/users

//because we are going to parse POST parameters we will import koa-bodyparser
var bodyParser = require('koa-bodyparser');

//the id should be a number greater than or equal 1
router.get('/:id([0-9]{1,})', async (cnx, next) => { 
   let id = cnx.params.id;
   let data = await model.getById(id);
   if(data.length === 0){ 
      cnx.response.status = 404;
      cnx.body = {message:"user not found"} 
   }
   else
      cnx.body = data; 
   });

//note that we have injected the body parser only in the POST request
router.post('/insert/', bodyParser(), async (cnx, next) =>{

   console.log(cnx.request.body);

   let newUser = {
      username:cnx.request.body.values.username, 
      password:cnx.request.body.values.password,
      passwordConfirmation:cnx.request.body.values.passwordConfirmation
   };
   try {
      await model.addUser(newUser);
      cnx.response.status = 201;
      cnx.body = {message:"user was added successfully"};
   } catch(error) {
      cnx.response.status = error.status;
      cnx.body = {message:error.message};
   }
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
