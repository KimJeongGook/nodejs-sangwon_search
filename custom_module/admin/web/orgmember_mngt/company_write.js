
var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var layout = require("../../../../function/layout.js");
var db = require("../../../DB_config.js").connect;
var code = require("../../../../function/codeMngt.js");


exports.listener=function(request, response){
	console.log("##################################### company_write Enter #####################################");
	
	var sql ="";

	var mode = "write";
	
    fs.readFile("./views/admin/web/orgmember_mngt/company_writeForm.html","utf-8",function(error, data){
    	code.selectBoxList("main_category", "", function(err,industry1){
			sql ="select 1 from dual";
			 
			db.query(sql, function(error, results2){
				response.send(ejs.render(layout.include("web_admin_popup", data), {
					db_data : [],
					mode : mode
				}));
    		});
    	});
    });
};

 
