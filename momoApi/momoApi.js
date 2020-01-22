
// module.exports = momoApi;

var express=require("express");
var uuid = require('uuid-random');
var request = require('request');

//create the router
var router=express.Router();

//get request
router.get("/" ,function(req,res){
    // res.send("Fetching bitcoin data");
    res.send(uuid());

});

//get request
router.get("/rtpStatus" ,function(req,res){

    // var options = {
    //     'method': 'POST',
    //     'url': 'https://sandbox.momodeveloper.mtn.com/collection/token/',
    //     'headers': {
    //         'Ocp-Apim-Subscription-Key': 'f1f1e714a8384301b727ca7da28fc048',
    //         'Authorization': 'Basic OWNkOWI5ZTEtZDQyZC00YWU0LThjZGUtMjJlZGNiNmM4NTFhOmNlMzI5MGEzZWY1YjRmMDViYTYwM2Q2YThhYWY2NWIx'
    //     }
    // };
    // request(options, function (error, response) {
    //     if (error) throw new Error(error);
    //     // console.log();
    //     res.send(response.body.access_token);
    // });
    // res.send("Fetching bitcoin data");

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
        body: "{\r\n  \"amount\": \"200\",\r\n  \"currency\": \"EUR\",\r\n  \"externalId\": \"654321\",\r\n  \"payer\": {\r\n    \"partyIdType\": \"MSISDN\",\r\n    \"partyId\": \"0787344529\"\r\n  },\r\n  \"payerMessage\": \"Confirm Emasks payment\",\r\n  \"payeeNote\": \"pay note\"\r\n}"

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
        res.send(response.body);
    });


});


//export the router
module.exports=router;