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
   //creating a variable that holds the information provided by the user
   let id = cnx.params.id;
   let data = await model.getById(id);
   //if the data length equals to zero then the user does not exist withing the database
   if(data.length === 0){ 
      cnx.response.status = 404;
      cnx.body = {message:"user not found"} 
   }
   else
      //if the user exists, finish the execution
      cnx.body = data; 
   });

//note that we have injected the body parser only in the POST request
router.post('/insert/', bodyParser(), async (cnx, next) =>{

   console.log(cnx.request.body);
   //creating a variable that holds the information provided by the user
   let newUser = {
      username:cnx.request.body.values.username, 
      password:cnx.request.body.values.password,
      passwordConfirmation:cnx.request.body.values.passwordConfirmation
   };
   try {
      //calling the function and passing the data to it
      await model.addUser(newUser);
      cnx.response.status = 201;
      //if successful, the message is passed to the frontend
      cnx.body = {message:"user was added successfully"};
   } catch(error) {
      //if not successful, the message is passed to the frontend
      cnx.response.status = error.status;
      cnx.body = {message:error.message};
   }
});

//note that we have injected the body parser only in the POST request
router.post('/login/', bodyParser(), async (cnx, next) =>{

   console.log(cnx.request.body);
   //creating a variable that holds the information provided by the user
   let newUser = {
      username:cnx.request.body.values.username, 
      password:cnx.request.body.values.password
   };
   try {
      //calling the function and passing the data to it
      await model.loginCheck(newUser);
      cnx.response.status = 201;
      //if successful, the message is passed to the frontend
      cnx.body = {message:"user was logged in"};
   } catch(error) {
      //if not successful, the message is passed to the frontend
      cnx.response.status = error.status;
      cnx.body = {message:error.message};
   }
});

module.exports = router;
