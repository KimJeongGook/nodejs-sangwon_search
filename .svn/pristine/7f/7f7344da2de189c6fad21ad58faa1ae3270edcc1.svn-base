var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config").connect;
var layout = require("../../../function/layout.js");
// var code = require("../../../function/codeMngt.js");
// var session = require("../../../function/session.js");

exports.listener=function(request, response){
	console.log("********************* search.js enter *********************");

	var sql = "select MAX(orgmem_seqNo) AS orgmem_seqNo from orgmember where 1=1 ";
	console.log(sql);
	fs.readFile("./views/user/web/search.html", "utf-8", function(error, data){
		db.query(sql, function(error, result){
			response.send(ejs.render(layout.include("web_admin", data), {
				datadb : result
			}));
		});
	});

}