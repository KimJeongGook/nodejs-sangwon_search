var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	var table = "event";
	var file_table = "event_files";	
	var brd_no = request.param("number");	
	var file_no = request.param("file_no");
	var file_name = request.param("file_name");
	var sql = "delete from "+file_table+" where file_no = " + file_no;
	
	console.log(file_name);
	
	fs.unlink('./file/'+table+'/'+file_name, function (err) {
		if(err){
			console.log(err);
		}
		db.query(sql, function(error, results){
			if(error){
				response.send("fail");
				console.log("admin/web/event_file_del/error======", sql);
			}else{
				response.redirect("/admin/web/event_write?mode=modify&number="+brd_no+"&isDeleted=Y");
			}
		});
	});	
};
