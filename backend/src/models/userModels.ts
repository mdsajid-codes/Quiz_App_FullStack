import db from '../config/db';

// Define user types

export interface User {
    id?: number;
    username: string;
    password: string;
};



// Get all User from database;

export const getAllUsers = (callback: Function)=>{
    db.query("SELECT * FROM users",(err, results)=>{
        if(err) return callback(err, null);
        callback(null, results);
    });
};

// Post user name and password

export const createLogin = (user: User, callback: Function)=>{
    const {username, password} = user;
    db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err, results)=>{
        if(err) return callback(err, null);
        callback(null, {id: results, ...user});
    });
};
