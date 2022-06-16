var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../../../DB_config.js").connect;

exports.listener =  function(request, response){
	var search_name = request.param("search_name");
	
	async.series({
		one : function(callback){
			sql = "select count(1) as cnt from orgmember where orgmem_name like '%"+search_name+"%'";
			console.log("sql == " + sql);
			db.query(sql, function(error, results){
				if(error){
					response.send(error);
				}else{
					one_results_length = results[0].cnt;
					callback(null, results);	
				}
			});				 
		},
		two : function(callback){
			if(one_results_length == 0) {
				response.send("error");
			} else {
				sql = "select orgmem_no, orgmem_name, concat(company_tel1, '-', company_tel2, '-', company_tel3) as company_tel, orgmem_office_addr1 from orgmember where orgmem_name like '%"+search_name+"%'";
				console.log("sql == " + sql);
				db.query(sql, function(error, results){
					if(error){
						response.send(error);
					}else{
						//callback(null, results[0].random_number);	
						callback(null, results);
					}
				});				 
			}
		}
	}, function(error, result){
		if(result.one.length == 0){
			response.send("error");
		}else{
			response.send(result.two);
		}
	});
}