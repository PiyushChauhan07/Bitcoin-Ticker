const express = require("express");
const bodyparser = require("body-parser");
const fetch = require("node-fetch");
const querystring = require('querystring');
const app = express();
app.use(bodyparser.urlencoded({extended: true}));

// Request : From Client to Server
// Response: From Server to Client
// Server: Receive Request and Send Response
// Client: Send Request and Receive Response

 app.get("/", function(req,res){     //GET is used to request data from a specified resource
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req,res){       //POST is used to send data to a server to create/update a resource.


//   // Old-school:
// var a2 = a.map(function(s){ return s.length });
// // ECMAscript 6 using arrow functions
// var a3 = a.map( s => s.length );

var data = {
  currency : req.body.fiat,
  value : req.body.amount,
  cryptocurrency : req.body.crypto
}
const myurl = new URL("https://blockchain.info/tobtc?");
// myurl.search = "currency=" + data.currency + "&value=" + data.value;
// let prarams;
// params = new UrlSearchParams("currency="+ data.currency + "value=" + data.value);
myurl.searchParams.set("currency",data.currency);
myurl.searchParams.set("value", data.value);
console.log(myurl.href);
// querystring.stringify({currency : data.currency, value : data.value});
// console.log(myurl+querystring.stringify({currency : data.currency, value : data.value}));

fetch(myurl.href)
    .then(res => res.text()) // expecting a json response
    .then(body => {
        res.send("<h1>"+ (data.value) + " " + (data.currency) + " is currently worth " + body + " Bitcoins.</h1>" ) });
});
app.listen(3000, function(){
  console.log("this server is running just fine.");
});
