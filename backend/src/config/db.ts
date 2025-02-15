import mysql from 'mysql2';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sajid7254@",
    database: "test"
});

db.connect((err)=>{
    if(err){
        console.error("Database not connected!", err);
    } else {
        console.log("Database connected successfully!");
    }
})

export default db;