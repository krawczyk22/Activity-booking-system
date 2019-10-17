var mysql = require('promise-mysql');
var info = require('../config.js');

//creating an activity
exports.addActivity = async (activity) => {
    try {
        
        //establishing the connection
        const connection = await mysql.createConnection(info.config);

        //if tagged user is not suplied then the TaggedUser table is not altered
        if(activity.taggeduserid === undefined)
        {
            //creating the SQL statement along with the variable that contains the information
            let sql = `INSERT INTO activity SET ?`;
            let newActivity = {
                title:activity.title,
                description:activity.description, 
                url:activity.url, 
                location:activity.location
            }
            
            //executinh the statement, closing the connection and returning the data
            let data1 = await connection.query(sql, newActivity);
            await connection.end();
            return data1;
        }
        else
        {
            //this is the sql statement to execute if the tagged user is supplied
            let sqlUserCheck = `SELECT ID FROM users WHERE username = \'${activity.taggeduserid}\'`;
            let check = await connection.query(sqlUserCheck);

            //checking if the user exists in the database by checking the length of the check result
            if(check.length == 0){ 
                throw {message:'Tagged user does not exist', status:400};
                //closing the connection
                await connection.end();
            }
            else{
                //if the user exists in the system the SQL statements to alter 2 tables are created
                let sql = `INSERT INTO activity SET ?`;
                let sql2 = `INSERT INTO taggedusers SET ?`;

                //creating variables with the information to bysupplied to the database
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

                //executing the statements, closing the connection and returning the data
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