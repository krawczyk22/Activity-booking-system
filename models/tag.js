var mysql = require('promise-mysql');
var info = require('../config.js');

//adding a tag to the taggeduser table
exports.addTag = async (user) => {
    try {
        //creating the connection
        const connection = await mysql.createConnection(info.config);
    
        //this is the sql statement to execute
        let sql = `INSERT INTO taggedusers SET ?`;

        //executing the statement, closing the connection, returning the data
        let data = await connection.query(sql, user);
        await connection.end();
        return data;
    
    } catch (error) {
        //if an error occured please log it and throw an exception
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}

//updating a tag request
exports.updateTagRequest= async (id, activity) => {
    try {
        //opening the connection
        const connection = await mysql.createConnection(info.config);
    
        //this is the sql statement to execute
        let sql = `UPDATE taggedusers SET ? WHERE ID = ${id}`;

        //executing the statement, closing the connection, returning the data
        let data = await connection.query(sql, activity);
        await connection.end();
        return data;
    
    } catch (error) {
        //if an error occured please log it and throw an exception
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}