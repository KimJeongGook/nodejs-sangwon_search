var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	
	var org_seqNo = request.param("org_seqNo");
	var org_seqYear = request.param("org_seqYear");
	 
	var sql = "insert into org_seq \n";
	 	sql += "( \n";
	 	sql += "org_seqNo, \n";
	 	sql += "org_seqYear \n";
	 	sql += ") \n";
	 	sql += "values \n";
	 	sql += "( \n";
	 	sql += "'" + org_seqNo + "', \n";
	 	sql += "'" + org_seqYear + "' \n";
	 	sql += ")";
	 	
		console.log(sql);
		
		db.query(sql, [] ,function(error, results){
			
			if(error){
				response.send("fail");
			}else{
				response.redirect("/admin/web/orgSeq_mngt");
			}
		});
};
