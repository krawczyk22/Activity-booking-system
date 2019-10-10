var Router = require('koa-router');
var model = require('../models/activity.js');

var router = Router({
   prefix: '/api/v1.0/activities'
});  //Prefixed all routes with /api/v1.0/users

//because we are going to parse POST parameters we will import koa-bodyparser
var bodyParser = require('koa-bodyparser');

//getting the activities by their ids
router.get('/get/:id', async (cnx, next) =>{
   let id = cnx.params.id;
   cnx.body = await model.getActivityById(id);
});

//inserting activities along with their description
router.post('/insert/', bodyParser(), async (cnx, next) =>{
   let newActivity = {title:cnx.request.body.title, description:cnx.request.body.description, 
        url:cnx.request.body.url, location:cnx.request.body.location
    };
    await model.addActivity(newActivity);
    cnx.body = {message:"added successfully"};
});

//deleting activities by their ids
router.delete('/delete/:id', async (cnx, next) =>{
    let id = cnx.params.id;
    await model.deleteActivity(id);
    cnx.body = {message:"deleted successfully"};
});

module.exports = router;
