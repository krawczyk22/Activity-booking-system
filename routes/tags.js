var Router = require('koa-router');
var model = require('../models/tag.js');
var crypto = require('crypto');

var router = Router({
   prefix: '/api/v1.0/tags'
});  //Prefixed all routes with /api/v1.0/users

//because we are going to parse POST parameters we will import koa-bodyparser
var bodyParser = require('koa-bodyparser');

//note that we have injected the body parser only in the POST request
router.post('/insert/', bodyParser(), async (cnx, next) =>{
    let newTag = {taggeduserid:cnx.request.body.taggeduserid,
        taggedbyuserid:cnx.request.body.taggedbyuserid,
        callendaritemid:cnx.request.body.callendaritemid, 
        accepted:cnx.request.body.accepted};
    await model.addTag(newTag);
    cnx.body = {message:"added successfully"};
 });

 //updating tags by their ids
router.put('/put/:id', bodyParser(), async (cnx, next) =>{
    let id = cnx.params.id;
    let updateTagRequest = {accepted:cnx.request.body.accepted};
    await model.updateTagRequest(id, updateTagRequest);
    cnx.body = {message:"updated successfully"};
});

 module.exports = router;