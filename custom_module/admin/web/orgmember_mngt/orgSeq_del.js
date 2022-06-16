var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	
	var org_no = request.param("org_no");
	 
	 var sql = "delete from orgmember where orgmem_seqNo = '" + org_no + "'";
	 console.log("sql 1: " +sql);
	 
		 db.query(sql, [] ,function(error, results){
			 sql ="delete from org_seq where org_no = '" + org_no + "'";
			 
			 console.log("sql 2: " +sql);
			 
			 db.query(sql, [] ,function(error, results){
				 response.redirect("/admin/web/orgSeq_mngt");
			 });
		 });
};
