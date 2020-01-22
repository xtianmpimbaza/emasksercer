var mysql = require("mysql");
// var db= require("./db_properties");
module.exports={
    getConnection:()=>{
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'emaskdb'
        });
    }
}