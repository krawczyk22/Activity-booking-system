var mysql = require('promise-mysql');
var info = require('../config.js');

//creating an activity
exports.addActivity = async (activity) => {
    try {
        
        //establishing the connection
        const connection = await mysql.createConnection(info.config);
            //creating the SQL statement along with the variable that contains the information
            if(activity.taggeduserid === undefined)
	        {
	            let sql = `INSERT INTO activity SET ?`;
	            let newActivity = {
	                title:activity.title,
	                description:activity.description, 
	                url:activity.url, 
	                location:activity.location
	            }
	                let data1 = await connection.query(sql, newActivity);
	                await connection.end();
	                return data1;
	        }
	        else
	        {
	            //this is the sql statement to execute
	            let sqlUserCheck = `SELECT ID FROM users WHERE username = \'${activity.taggeduserid}\'`;
	            let check = await connection.query(sqlUserCheck);
	
	            if(check.length == 0){ 
	                throw {message:'Tagged user does not exist', status:400};
	                await connection.end();
	            }
	            else{
	
	                let sql = `INSERT INTO activity SET ?`;
	                let sql2 = `INSERT INTO taggedusers SET ?`;
	
	                let newActivity = {
	                    title:activity.title,
	                    description:activity.description, 
	                    url:activity.url, 
	                    location:activity.location
	                }
	
	                let newActivity2 = {
	                    taggeduserid:check[0].ID,
	                    accepted:false
	                }
	
	                let data2 = await connection.query(sql, newActivity);
	                await connection.query(sql2, newActivity2);
	                await connection.end();
	                return data2;
	            }
	        }
            
    //catching the errors if they exist
    } catch (error) {
        if(error.status === undefined)
            error.status = 500;
        throw error;
    }
}

exports.getAllActivity = async (id) => {
    try {

        //first connect to the database
        const connection = await mysql.createConnection(info.config);

        //this is the sql statement to execute
        let sql = `SELECT * FROM activity`;
        //wait for the async code to finish
        let data = await connection.query(sql);
        //wait until connection to db is closed
        await connection.end();
        //return the result
        var string = JSON.stringify(data);
        var json =  JSON.parse(string);
        console.log(json);
        return json;

    } catch (error) {
        //if an error occured please log it and throw an exception
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

//GET all activities that a user created
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
        let sql = `SELECT taggedusers.id AS id, activity.title AS title, activity.description AS description, 
                        activity.url AS url, activity.location AS location, calendar.fromdate AS fromdate, 
                        calendar.todate AS todate, taggedusers.accepted AS accepted 
                        FROM ((users INNER JOIN calendar ON users.ID = calendar.userid) 
                        INNER JOIN activity ON calendar.activityit = activity.ID)
                        INNER JOIN taggedusers ON calendar.userid = taggedusers.taggeduserid
                        WHERE users.username = ?
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

//get all activities within a Date range
exports.getActivityDateRange = async (fromdate, todate) => {
    try {

        //first connect to the database
        const connection = await mysql.createConnection(info.config);

        //this is the sql statement to execute
        let sql = `SELECT * FROM activity INNER JOIN calendar ON activity.ID = calendar.activityit WHERE calendar.fromdate = ${fromdate} AND calendar.todate = ${todate}
            `;
        //wait for the async code to finish
        let data = await connection.query(sql);

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
    
        //creating the connection
        const connection = await mysql.createConnection(info.config);
    
        //this is the sql statement to execute
        let sql = `DELETE FROM activity WHERE ID = ?`;

        //executing the statement, closing the connection and returning the data
        let data = await connection.query(sql, activity);
        await connection.end();
        return data;
    
    } catch (error) {
        //if an error occured please log it and throw an exception
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}

//updating an activity
exports.updateActivity = async (id, activity) => {
    try {
        //creating the connection
        const connection = await mysql.createConnection(info.config);
    
        //this is the sql statement to execute
        let sql = `UPDATE activity SET ? WHERE ID = ${id}`;

        //executing the statement, closing the connection and returning the data
        let data = await connection.query(sql, activity);
        await connection.end();
        return data;
    
    } catch (error) {
        //if an error occured please log it and throw an exception
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}

//Adding all activities to calendar
exports.addActivitiesToCalendar = async (activityId, userId, fromTime, toTime) => {
    try {
        let activityLocation = await this.getActivityById(activityId)
        activityLocation = activityLocation[0].location
        console.log(activityLocation)
        const connection = await mysql.createConnection(info.config);
        let calendarItem = {
            from: fromTime,
            to: toTime,
            location: activityLocation,
            userId: userId,
            activityId: activityId
        }
        let sql = `INSERT INTO calendar SET ?`;
        let data = await connection.query(sql, calendarItem);
        await connection.end();
        return data;
    } catch (error) {
        console.log(error);
        throw (500, 'An Error has occured');
    }
}

exports.getActivityById = async (id) => {
    try {
        const connection = await mysql.createConnection(info.config);
        let sql = `SELECT * FROM activity WHERE Id = ${id};`;
        console.log(sql)
        let data = await connection.query(sql);
        await connection.end();
        return data;
    } catch (error) {
        //if an error occured, please log it and throw exception
        console.log(error)
        throw (500, 'An error has occured')
    }
}

exports.getCalendar= async()=>{
    try{
        const connection =await mysql.createConnection(info.config);
        let sql =`SELECT * FROM calendar`;
        let data = await connection.query(sql);
        await connection.end();
        return data;
    } catch (error) {
        console.log(error);
        throw (500, 'An Error has occured');

    }
}
