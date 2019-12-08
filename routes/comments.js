var Router = require('koa-router');
var model = require('../models/comment.js');

var router = Router({
    prefix: '/api/v1.0/comments'
});

//because we are going to parse POST parameters we will import koa-bodyparser
var bodyParser = require('koa-bodyparser');

//Create new comment
router.post('/insertComment/', bodyParser(), async (cnx, next) =>{
    
    console.log(cnx.request.body);

    //creating a variable that holds the information provided by the user
    let newComment = {
        userid:cnx.request.body.userid,
        activityid:cnx.request.body.activityid,
        alltext:cnx.request.body.alltext,
        datecreated:cnx.request.body.datecreated,
        datemodified:cnx.request.body.datemodified,
    }
    try {
        //calling the function and passing the data to it
        await model.addComment(newComment);
        cnx.response.status = 201;
        //if successful, the message is passed to the frontend
        cnx.body = {message:"comment was added successfully"};
    } catch(error) {
        //if not successful then the error message is passed to the frontend
        cnx.response.status = error.status;
        cnx.body = {message:error.message};
     }
});

//Edit a comment
router.put('/:id',bodyParser(), async(cnx,next)=>{
    let updatedComment={
        userId:cnx.request.body.userId,
        activityId:cnx.request.body.activityId,
        allText:cnx.request.body.allText,
        dateCreated:cnx.request.body.dateCreated,
        dateModified:cnx.request.body.dateModified
    };
    let dateCreatedFormat = new Date(updatedComment.dateCreated)
    let dateModifiedFormat = new Date(updatedComment.dateModified)
    updatedComment.dateCreated = `${dateCreatedFormat.getFullYear()}-${dateCreatedFormat.getMonth() + 1}-${dateCreatedFormat.getDate()} ${dateCreatedFormat.getHours()}:${dateCreatedFormat.getMinutes()}:00`
    updatedComment.dateModified = `${dateModifiedFormat.getFullYear()}-${dateModifiedFormat.getMonth() + 1}-${dateModifiedFormat.getDate()} ${dateModifiedFormat.getHours()}:${dateModifiedFormat.getMinutes()}:00`
    await model.updateComment(cnx.params.id,updatedComment);
    cnx.response.status = 200;
    cnx.body={message:"updated successfully"};
});

//GET a comment by its id
router.get('/get/:id([0-9]{1,})', async (cnx, next) =>{
    let id = cnx.params.id;
    cnx.body = await model.getCommentByid(id);
 });

 //GET all comments on an Activity
 router.get('/getcomments/:id', async (cnx, next) =>{
    let id = cnx.params.id;
    cnx.body = await model.getAllCommentsOnActivity(id);
 });

module.exports = router;