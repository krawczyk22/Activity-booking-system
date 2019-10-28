var mysql = require('promise-mysql');
var info = require('../config.js');

//creating an activity
exports.addActivity = async (activity) => {
    try {
    
        const connection = await mysql.createConnection(info.config);
    
        //this is the sql statement to execute
        let sql = `INSERT INTO activity SET ?`;

        let data = await connection.query(sql, activity);
        
        await connection.end();
        
        return data;
    
    } catch (error) {
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}

//getting an activity by its ID
exports.getActivityById = async (id) => {
    try {

        //first connect to the database
        const connection = await mysql.createConnection(info.config);

        //this is the sql statement to execute
        let sql = `SELECT * FROM activity
            WHERE ID = ?
            `;
        //wait for the async code to finish
        let data = await connection.query(sql, id);

        //wait until connection to db is closed
        await connection.end();
        //return the result
        return data;

    } catch (error) {
        //if an error occured please log it and throw an exception
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}

exports.getActivityByUser = async (id) => {
    try {

        //first connect to the database
        const connection = await mysql.createConnection(info.config);

        //this is the sql statement to execute
        let sql = `SELECT * FROM (users INNER JOIN calendar ON users.ID = calendar.userid) INNER JOIN activity ON calendar.activityit = activity.ID
            WHERE users.ID = ?
            `;
        //wait for the async code to finish
        let data = await connection.query(sql, id);

        //wait until connection to db is closed
        await connection.end();
        //return the result
        return data;

    } catch (error) {
        //if an error occured please log it and throw an exception
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}

//get all activities a user is tagged in
exports.getActivityByUserTagged = async (id) => {
    try {

        //first connect to the database
        const connection = await mysql.createConnection(info.config);

        //this is the sql statement to execute
        let sql = `SELECT * FROM ((users INNER JOIN calendar ON users.ID = calendar.userid) INNER JOIN activity ON calendar.activityit = activity.ID)
                         INNER JOIN taggedusers ON calendar.userid = taggedusers.taggeduserid
            WHERE taggedusers.taggeduserid = ?
            `;
        //wait for the async code to finish
        let data = await connection.query(sql, id);

        //wait until connection to db is closed
        await connection.end();
        //return the result
        return data;

    } catch (error) {
        //if an error occured please log it and throw an exception
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}

//deleting an activity
exports.deleteActivity = async (activity) => {
    try {
    
        const connection = await mysql.createConnection(info.config);
    
        //this is the sql statement to execute
        let sql = `DELETE FROM activity WHERE ID = ?`;

        let data = await connection.query(sql, activity);
        
        await connection.end();
        
        return data;
    
    } catch (error) {
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}

//updating an activity
exports.updateActivity = async (id, activity) => {
    try {
    
        const connection = await mysql.createConnection(info.config);
    
        //this is the sql statement to execute
        let sql = `UPDATE activity SET ? WHERE ID = ${id}`;

        let data = await connection.query(sql, activity);
        
        await connection.end();
        return data;
    
    } catch (error) {
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}