var Router = require('koa-router');
var model = require('../models/tag.js');
var crypto = require('crypto');

var router = Router({
   prefix: '/api/v1.0/tags'
});  //Prefixed all routes with /api/v1.0/users

//because we are going to parse POST parameters we will import koa-bodyparser
var bodyParser = require('koa-bodyparser');

//note that we have injected the body parser only in the POST request
//creating the tag
router.post('/insert/', bodyParser(), async (cnx, next) =>{
    //creating a variable that holds the information provided by the user
    let newTag = {taggeduserid:cnx.request.body.values.taggeduserid,
        taggedbyuserid:cnx.request.body.values.taggedbyuserid,
        callendaritemid:cnx.request.body.values.callendaritemid, 
        accepted:cnx.request.body.values.accepted};
    //calling the function and passing the data to it
    await model.addTag(newTag);
    //if successful, the message is passed to the frontend
    cnx.body = {message:"added successfully"};
 });

 //updating tags by their ids
router.put('/put/:id([0-9]{1,})', bodyParser(), async (cnx, next) =>{
    //creating a variable that holds the information provided by the user
    let id = cnx.params.id;
    let updateTagRequest = {accepted:cnx.request.body.values.accepted};
    //calling the function and passing the data to it
    await model.updateTagRequest(id, updateTagRequest);
    //if successful, the message is passed to the frontend
    cnx.body = {message:"updated successfully"};
});

 module.exports = router;