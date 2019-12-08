var mysql = require('promise-mysql');
var info = require('../config.js');

//creating a new comment
exports.addComment = async (comment) => {
    try {
        
        //establishing the connection
        const connection = await mysql.createConnection(info.config);

        //creating the SQL statement along with the variable that contains the information
        let sql = `INSERT INTO comments SET ?`;
        let newComment = {
            userid:comment.userid,
            activityid:comment.activityid, 
            alltext:comment.alltext, 
            datecreated:comment.datecreated,
            datemodified:comment.datemodified,
        }
        
        //executinh the statement, closing the connection and returning the data
        let data = await connection.query(sql, newComment);
        await connection.end();
        return data;
    //catching the errors if they exist
    } catch (error) {
        if(error.status === undefined)
            error.status = 500;
        throw error;
    }
}

//Edit comment
exports.updateComment = async (id, updatedComment) => {
    try {
        const connection = await mysql.createConnection(info.config);
        let sql = `REPLACE INTO comments SET ID = ${id}, userId=${updatedComment.userId},activityId=${updatedComment.activityId},allText="${updatedComment.allText}",dateCreated="${updatedComment.dateCreated}",dateModified="${updatedComment.dateModified}";`;
        console.log(sql);
        let data = await connection.query(sql);
        await connection.end();
        return data;
    } catch (error) {
        console.log(error);
        throw (500, 'An Error has occured');
    }
}

//GET a comment by its id
exports.getCommentByid = async (id) => {
    try {

        //first connect to the database
        const connection = await mysql.createConnection(info.config);

        //this is the sql statement to execute
        let sql = `SELECT * FROM comments WHERE ID = ${id}`;

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

 //GET all comments on an Activity
 exports.getAllCommentsOnActivity = async (id) => {
    try {

        //first connect to the database
        const connection = await mysql.createConnection(info.config);

        //this is the sql statement to execute
        let sql = `SELECT * FROM comments WHERE activityID = ${id}`;

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