var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config").connect;
var layout = require("../../../function/layout.js");

exports.listener=function(request, response){
	console.log("######################## index_uw.js Enter ########################");
	fs.readFile("/views/user/web/index_uw.html", "utf-8", function(error, data){

	}); 
	
};
