var Router = require('koa-router');
var adminModel = require('../models/admin.js');

var router = Router({
    prefix: '/api/v1.0/admin'
});

//because we are going to parse POST parameters we will import koa-bodyparser
var bodyParser = require('koa-bodyparser');

//callig the function to create the database
router.post('/create_db', async (ctx, next) => {
    //calling the function and passing the data to it
    let item = await adminModel.createTables(ctx.params.id);
    ctx.body = item;
});

module.exports = router;