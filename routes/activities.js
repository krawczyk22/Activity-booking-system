var Router = require('koa-router');
var model = require('../models/activity.js');

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
 router.get('/getactivitiestagged/:id([0-9]{1,})', async (cnx, next) =>{
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
    
    console.log(cnx.request.body);

    //creating a variable that holds the information provided by the user
    let newActivity = {
        title:cnx.request.body.values.title, 
        description:cnx.request.body.values.description, 
        url:cnx.request.body.values.url, 
        location:cnx.request.body.values.location,
        taggeduserid:cnx.request.body.values.taggeduserid
    };
    try {
        //calling the function and passing the data to it
        await model.addActivity(newActivity);
        cnx.response.status = 201;
        //if successful, the message is passed to the frontend
        cnx.body = {message:"user was added successfully"};
    } catch(error) {
        //if not successful then the error message is passed to the frontend
        cnx.response.status = error.status;
        cnx.body = {message:error.message};
     }
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
});

module.exports = router;
