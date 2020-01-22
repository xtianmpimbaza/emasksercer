//import connection
var conn =require("../config/db_connection");

//setting the connection object
var connection=conn.getConnection();

//connect to database
connection.connect();

//import express
var express=require("express");

//create the router
var router=express.Router();

//get request
router.get("/" ,function(req,res){
    // res.send("fetching data");
    connection.query("select * from transactions", function(err,recordsArray,fields){
        if (err){
            console.log(err.toString())
        }else{
            res.send(recordsArray);
        }
    });
});


//export the router
module.exports=router;