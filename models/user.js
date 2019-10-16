var mysql = require('promise-mysql');
var info = require('../config.js');
var bcrypt = require('bcryptjs');

//get password by usernames id
exports.getById = async (id) => { 
    try {
        //first connect to the database
        const connection = await mysql.createConnection(info.config);
        //this is the sql statement to execute
        let sql = `SELECT * FROM users
            WHERE id = ${id} `;
        //wait for the async code to finish
        let data = await connection.query(sql);
        //wait until connection to db is closed
        await connection.end();
        //return the result
        return data;
    } catch (error) {
        //if an error occured please log it and throw an exception
        throw new Error(error) 
    }
}

exports.addUser = async (user) => {
    try {
        //require username
        if(user.username === undefined){
            throw {message:'username is required', status:400}; 
        }
        if(user.password === undefined){
            throw {message:'password is required', status:400}; 
        }
        else {
            //if password is provided it must be ay least 6 characters long
            if(user.password.length < 6){ 
                throw {message:'password must be more than 6 characters long', status:400};
            }
            //passwordConfrimation is required
            if(user.passwordConfirmation === undefined){
                throw {message:'password confirmation is required', status:400};
            }
            else {
                //if passwordConfirmation is provided then it must match password 
                if(user.password !== user.passwordConfirmation ){
                    throw {message:'passwords don\'t match', status:400}; }
            }
        }
        //making sure that username should be unique and never been used in the system
        let sql = `SELECT username FROM users WHERE
            username = \'${user.username}\'`;

        const connection = await mysql.createConnection(info.config);
        let data = await connection.query(sql);

        //if the query return a record then this username has been used before
        if(data.length){
            //first close the connection as we are leaving this function 
            await connection.end();
            //then throw an error to leave the function
            throw {message:'username already in use', status:400};
        }

        //hash the password using bcryptjs package
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt);

        //create a new object to hold users final data
        let userData = {
            username: user.username,
            password: hash,
            salt: salt
        }
        //this is the sql statement to execute
        sql = `INSERT INTO users SET ? `;
        data = await connection.query(sql, userData);
        await connection.end();
        return data;

    } catch (error) {
        if(error.status === undefined)
            error.status = 500;
        throw error;
    }
}

exports.loginCheck = async (user) => {
    try {
    
        if(user.username === undefined){
            throw {message:'username is required', status:400}; 
        }
        if(user.password === undefined){
            throw {message:'password is required', status:400}; 
        }
        else {
            const connection = await mysql.createConnection(info.config);
        
            //this is the sql statement to execute
            let sql = `SELECT password, salt FROM users WHERE 
                username = \'${user.username}\'`;

            let data = await connection.query(sql);
            await connection.end();

            if(data.length)
            {
                if(data[0].password.length === 0)
                    throw {message:'username not found', status:400};
                else {    
                    var hashFromUser = bcrypt.hashSync(user.password, data[0].salt);
                    if(data[0].password == hashFromUser)
                    {
                        return data;
                    }
                    else 
                    {
                        throw {message:'password is wrong', status:400};
                    }
                }
            }
            else
            {
                throw {message:'username not found', status:400};
            }
        }
    } catch (error) {
        if(error.status === undefined)
            error.status = 500;
        throw error;
    }
}