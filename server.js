//importing modules
var express= require("express");
const router = require('express').Router();
var fetch = require("./fetch/fetch");
var momoApi = require("./momoApi/momoApi");
var bodyparser= require("body-parser");

//create app instance
var app=express();
app.use("/fetch",fetch);

// paypal endpoint
app.use("/",momoApi);

//set JSON as MIME type
app.use(bodyparser.json());

//front-end not sending any form data
app.use(bodyparser.urlencoded({extended:false}));

var insert = require("./insert/insert");
app.use("/insert",insert);

var register = require("./insert/register");
app.use("/register",register);


//Assign port number
app.listen(3000);
console.log("server is listening at port no. 3000");