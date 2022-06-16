var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var db = require("../../../DB_config.js").connect;
var page_navi = require("../../../../function/person_page_navi.js");
var layout = require("../../../../function/layout.js");
var code = require("../../../../function/codeMngt.js");

exports.listener=function(request, response) {
	var sql ="select * from org_seq where cast(org_seqNo as signed) > 28 order by org_seqNo desc"; //기수
	db.query(sql, function(error, results) {
		
		if(error) {
			console.log("getFlag_bearer.js :: Query Error");
		} else {
			response.send( JSON.stringify(results) );
		}
	});
};