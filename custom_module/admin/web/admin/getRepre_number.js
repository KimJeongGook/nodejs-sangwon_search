var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../../../DB_config.js").connect;

exports.listener =  function(request, response){
	var mode = request.param("repre_mode");
	var repre_number = request.param("repre_number");
	var create_id = request.session.ad_id;
	var wrk_ip = request.connection.remoteAddress;
	var sql = "";
	console.log("mode == " +mode);
	
	if(mode == 'select'){
		if(request.session.ad_id == "admin"){
			sql = "select repre_number from repre_number";
		}else{
			sql = "select concat(orgmem_phone1, orgmem_phone2, orgmem_phone3) as repre_number \n" +
					"from orgmember \n" +
					"where orgmem_no = (select orgmem_no from admin_mngt where ad_id = '"+ request.session.ad_id+"')";
		}
		
		console.log("sql == " + sql);
		
		db.query(sql, function(error, results){
			if(error){
				console.log("error");
				response.send(error);
			}else{
				if(results.length == 0){
					response.send("error");
				}else{
					response.send(results);
				}	
			}
		});
	} else if(mode == 'insert'){
		sql = "insert into repre_number \n";
		sql += "(repre_number, create_id, create_date, create_host) \n";
		sql += "values \n";
		sql += "('"+repre_number+"', '"+create_id+"', now(), '"+wrk_ip+"')";
		console.log("sql == " + sql);
		db.query(sql, function(error, results){
			if(error){
				response.send(error);
			}else{
				response.send("success");	
			}
		});
	} else if(mode == 'update'){
		sql = "update  repre_number set \n";
		sql += "repre_number = '"+repre_number+"', \n";
		sql += "create_id = '"+create_id+"', \n";
		sql += "create_date = now(), \n";
		sql += "create_id = '"+wrk_ip+"'";
		console.log("sql == " + sql);
		db.query(sql, function(error, results){
			if(error){
				response.send(error);
			}else{
				response.send("success");	
			}
		});
	}
}