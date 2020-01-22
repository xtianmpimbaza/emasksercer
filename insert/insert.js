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
    var usr_phone=req.body.phone;
    var usr_method=req.body.method;
    var usr_receipient=req.body.receipient;
    var usr_amount=req.body.amount;
    var usr_curency=req.body.currency;

    connection.query("INSERT INTO `transactions` (`phone`,`method`,`receipient`,`amount`,`curency`) VALUES ('"+usr_phone+"','"+usr_method+"','"+usr_receipient+"','"+usr_amount+"','"+usr_curency+"')",
        function (err,result){
        if(err){
            console.log("error while inserting the object!")
        }else{
            var random_mo = Math.floor(Math.random() * (99999 - 10000 + 100) ) + 10000;
            requestToPay(usr_amount, random_mo, usr_phone);
            res.send({insert:"success"});
        }
    });
});

function requestToPay(amount, externalId, partyId){
    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay',
        'headers': {
            'X-Reference-Id': '2e63624a-6b83-4da9-bc0a-a3318e61b86f',
            'Ocp-Apim-Subscription-Key': 'f1f1e714a8384301b727ca7da28fc048',
            'X-Target-Environment': 'sandbox',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "{\r\n  \"amount\": \""+amount+"\",\r\n  \"currency\": \"EUR\",\r\n  \"externalId\": \""+externalId+"\",\r\n  \"payer\": {\r\n    \"partyIdType\": \"MSISDN\",\r\n    \"partyId\": \""+partyId+"\"\r\n  },\r\n  \"payerMessage\": \"Confirm Emasks payment\",\r\n  \"payeeNote\": \"Emask\"\r\n}"

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
    });
}
//export router
module.exports=router;