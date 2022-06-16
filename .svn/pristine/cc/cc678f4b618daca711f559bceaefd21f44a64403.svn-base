var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	var sql = "";

	sql = "select us_idx, ums_content, ums_send_cnt ,ums_type, ums_send_id, date_format(create_date, '%Y-%m-%d %T %p') as create_date \n" +
			"from ums_result \n" +
			"order by us_idx desc \n" +
			"limit 0, 30";
	
	console.log("sql : " + sql);
	
	db.query(sql, function(error, results){
		if(error){
			console.log("error");
			response.send(error);
		}else{
			response.send(results);
		}
	});
};
