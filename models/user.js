var mysql = require('promise-mysql');
var info = require('../config.js');

//get password by usernames id
exports.getPasswordByUsername = async (username) => {
    try {

        //first connect to the database
        const connection = await mysql.createConnection(info.config);

        //this is the sql statement to execute
        let sql = `SELECT password FROM users
            WHERE username = ?
            `;
        //wait for the async code to finish
        let data = await connection.query(sql, username);

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

exports.getAllUsernames = async (page, limit, order) => {
    try {
    
        const connection = await mysql.createConnection(info.config);
    
        //this is the sql statement to execute
        let sql = `SELECT username FROM users
            `;

        let data = await connection.query(sql);
        
        await connection.end();
        
        return data;
    
    } catch (error) {
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}

exports.addUser = async (user) => {
    try {
    
        const connection = await mysql.createConnection(info.config);
    
        //this is the sql statement to execute
        let sql = `INSERT INTO users SET ?`;

        let data = await connection.query(sql, user);
        
        await connection.end();
        
        return data;
    
    } catch (error) {
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}

exports.loginCheck = async (username) => {
    try {
    
        const connection = await mysql.createConnection(info.config);
    
        //this is the sql statement to execute
        let sql = `SELECT password FROM users WHERE username = ?`;

        let data = await connection.query(sql, username);
        
        await connection.end();
        return data;
    
    } catch (error) {
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}