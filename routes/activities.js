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

//inserting activities along with their description
router.post('/insert/', bodyParser(), async (cnx, next) =>{
    
    console.log(cnx.request.body);

    let newActivity = {
        title:cnx.request.body.values.title, 
        description:cnx.request.body.values.description, 
        url:cnx.request.body.values.url, 
        location:cnx.request.body.values.location
    };
    await model.addActivity(newActivity);
    cnx.body = {message:"added successfully"};
});

//deleting activities by their ids
router.delete('/delete/:id([0-9]{1,})', async (cnx, next) =>{
    let id = cnx.params.id;
    await model.deleteActivity(id);
    cnx.body = {message:"deleted successfully"};
});

//updating activities by their ids
router.put('/put/:id([0-9]{1,})', bodyParser(), async (cnx, next) =>{
    let id = cnx.params.id;
    let updateActivity = {title:cnx.request.body.title, description:cnx.request.body.description, 
        url:cnx.request.body.url, location:cnx.request.body.location
    };
    await model.updateActivity(id, updateActivity);
    cnx.body = {message:"updated successfully"};
});

module.exports = router;
