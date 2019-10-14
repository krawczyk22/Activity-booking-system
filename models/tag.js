var mysql = require('promise-mysql');
var info = require('../config.js');

exports.addTag = async (user) => {
    try {
    
        const connection = await mysql.createConnection(info.config);
    
        //this is the sql statement to execute
        let sql = `INSERT INTO taggedusers SET ?`;

        let data = await connection.query(sql, user);
        
        await connection.end();
        
        return data;
    
    } catch (error) {
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}

//updating a tag request
exports.updateTagRequest= async (id, activity) => {
    try {
    
        const connection = await mysql.createConnection(info.config);
    
        //this is the sql statement to execute
        let sql = `UPDATE taggedusers SET ? WHERE ID = ${id}`;

        let data = await connection.query(sql, activity);
        
        await connection.end();
        return data;
    
    } catch (error) {
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}