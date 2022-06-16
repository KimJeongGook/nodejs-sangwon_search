var fs = require("fs");
var ejs = require("ejs");
var layout = require("../../../function/layout.js");

exports.listener=function(request, response){
	console.log("######################### return_back.js enter #########################");
	fs.readFile("./views/user/web/return_back.html", "utf-8", function(error, data){
		response.send(ejs.render(layout.include("empty", data), {
			
		}));
	}); 
	
};
