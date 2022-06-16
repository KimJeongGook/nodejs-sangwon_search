var fs = require("fs");
var ejs = require("ejs");
var async = require("async");

exports.listener =  function(request, response){
	var chked_power = request.session.chked_power;
	response.send(chked_power);
}