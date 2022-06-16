var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../../../DB_config.js").connect;
var layout = require("../../../../function/layout.js");


exports.listener=function(request, response){
	 
	var sql = "select * from org_seq order by org_seqNo desc";
	fs.readFile("./views/admin/web/orgmember_mngt/orgSeq_mngt.html","utf-8", function(error, data){
		 db.query(sql, [] ,function(error, results){
			response.send(ejs.render(layout.include("web_admin_popup", data), {
				data : results
			}));
		 });
	});
};
