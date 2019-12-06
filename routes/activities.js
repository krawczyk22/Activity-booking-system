var Router = require('koa-router');
var model = require('../models/activity.js');
var passport = require('koa-passport');

var router = Router({
   prefix: '/api/v1.0/activities'
});  //Prefixed all routes with /api/v1.0/users

//because we are going to parse POST parameters we will import koa-bodyparser
var bodyParser = require('koa-bodyparser');

//getting the activities by their ids
router.get('/get/:id([0-9]{1,})', async (cnx, next) =>{
   let id = cnx.params.id;
   cnx.body = await model.getActivityById(id);
});

//getting all the activities
router.get('/getall/', async (cnx, next) =>{
    let id = cnx.params.id;
    cnx.body = await model.getAllActivity(id);
 });

//getting all the activities by their ids
router.get('/getactivities/:id([0-9]{1,})', async (cnx, next) =>{
    let id = cnx.params.id;
    cnx.body = await model.getActivityByUser(id);
 });

 //get all activities a user is tagged in
 router.get('/getactivitiestagged/:id', async (cnx, next) =>{
    let id = cnx.params.id;
    cnx.body = await model.getActivityByUserTagged(id);
 });

  //get all activities within a Date Range
  router.get('/getactivitiesDateRange/:fromdate&:todate', async (cnx, next) =>{
    let fromdate = cnx.params.fromdate;
    let todate = cnx.params.todate;
    console.log(fromdate)
    console.log(todate)
    cnx.body = await model.getActivityDateRange(fromdate, todate);
 });

//inserting activities along with their description
router.post('/insert/', bodyParser(), async (cnx, next) =>{
    //authentication of the user
    return passport.authenticate('basic', async function(err, user, info, status) {
        if(err){
           cnx.body = err
        }
        else if (user === false) {
           cnx.body = { success: false }
           cnx.throw(401)
        } else {
            let newActivity = {
                title:cnx.request.body.values.title, 
                description:cnx.request.body.values.description, 
                url:cnx.request.body.values.url, 
                location:cnx.request.body.values.location,
                taggeduserid:cnx.request.body.values.taggeduserid
            };

            //calling the function and passing the data to it
            await model.addActivity(newActivity);
            //if successful, the message is passed to the frontend
            cnx.body = {message:"user was added successfully"};
        }
     })(cnx)
});

//deleting activities by their ids
router.delete('/delete/:id([0-9]{1,})', async (cnx, next) =>{
    //creating a variable that holds the information provided by the user
    let id = cnx.params.id;
    //calling the function and passing the data to it
    await model.deleteActivity(id);
    //if successful, the message is passed to the frontend
    cnx.body = {message:"deleted successfully"};
});

//updating activities by their ids
router.put('/put/:id([0-9]{1,})', bodyParser(), async (cnx, next) =>{
    //authentication of the user
    return passport.authenticate('basic', async function(err, user, info, status) {
        if(err){
           cnx.body = err
        }
        else if (user === false) {
           cnx.body = { success: false }
           cnx.throw(401)
        } else {
            //creating a variable that holds the information provided by the user
            let id = cnx.params.id;
            let updateActivity = {
                title:cnx.request.body.title, 
                description:cnx.request.body.description, 
                url:cnx.request.body.url, 
                location:cnx.request.body.location
            };
            //calling the function and passing the data to it
            await model.updateActivity(id, updateActivity);
            //if successful, the message is passed to the frontend
            cnx.body = {message:"updated successfully"};
        }
     })(cnx)
});

module.exports = router;
