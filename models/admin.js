var mysql = require('promise-mysql');
var info = require('../config.js');

//creating the tables
exports.createTables = async (id)=> {

    try {
        const connection = await mysql.createConnection(info.config);

        //those are the sql statements to be executed
        let sql = `CREATE TABLE users (
            ID INT NOT NULL AUTO_INCREMENT,
            username TEXT,
            password TEXT,
            salt TEXT,
            PRIMARY KEY (ID)
            )`;
        await connection.query(sql);

        sql = `CREATE TABLE activity (
            ID INT NOT NULL AUTO_INCREMENT,
            title TEXT,
            description TEXT,
            url TEXT,
            location TEXT,
            PRIMARY KEY (ID)
            )`;
        await connection.query(sql);

        sql = `CREATE TABLE calendar (
            ID INT NOT NULL AUTO_INCREMENT,
            fromdate DATETIME,
            todate DATETIME,
            location TEXT,
            userid INT,
            activityit INT,
            PRIMARY KEY (ID)
            )`;
        await connection.query(sql);

        sql = `CREATE TABLE taggedusers (
            ID INT NOT NULL AUTO_INCREMENT,
            taggeduserid INT,
            taggedbyuserid INT,
            callendaritemid INT,
            accepted BOOLEAN,
            PRIMARY KEY (ID)
            )`;
        await connection.query(sql);

        sql = `CREATE TABLE comments (
            ID INT NOT NULL AUTO_INCREMENT,
            userid INT,
            activityid INT,
            alltext TEXT,
            datecreated DATETIME,
            datemodified DATETIME,
            PRIMARY KEY (ID)
            )`;
        //executing the query
        await connection.query(sql);

        return {message:"created successfully"};

    } catch (error) {
        //cating theerrors if the occure
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}