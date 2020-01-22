//import express module
var express = require("express");

//import connection moule
var conn= require("../config/db_connection");

//getting the connection object
var connection =conn.getConnection();

//connect to database
connection.connect();

//create the module(Router)
var router = express.Router();
router.post("/",function(req,res){
//reading the parameters from client
//     var p_id=req.body.p_id;
//     var p_name=req.body.p_name;
    var phone=req.body.usr_phone;

    connection.query("INSERT INTO `users` (`phone`) VALUES ('"+phone+"')",
        function (err,result){
        if(err){
            console.log(err.toString());
        }else{
            res.send({insert:"success"});
        }
    });
});
//export router
module.exports=router;