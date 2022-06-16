var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../../../DB_config.js").connect;

exports.listener =  function(request, response){
	var sql = "";
	var orgmem_no_array =  request.param("orgmem_no_array") == undefined ? "noData" : request.param("orgmem_no_array");
	var result_num = 0;
	var results = [];
	
	for(var i=0; i<orgmem_no_array.length; i++){
		sql = "select	\n"+
		" @RNUM := @RNUM +1 as num, \n" +
		" orgmem_no,	\n" +
		" orgmem_name,	\n" +
		" concat(orgmem_phone1, '-', orgmem_phone2, '-', orgmem_phone3) as orgmem_phone, \n" +
		" (select org_seqNo from org_seq where org_no = A.orgmem_seqNo) as orgmem_seqNo \n" +
		" from orgmember A, (SELECT @RNUM := 0 ) r \n";
		sql += " where \n";
		sql += " 1=1 \n";
		sql += " and orgmem_no = " + orgmem_no_array[i] +" \n";
		sql += "order by orgmem_name asc \n";

		console.log("::" + sql);
		
		db.query(sql, function(error, result){
			if(error){
				console.log("error");
				response.send(error);
			}
			else{
				result_num++;
				results.push(result);
				
				if(result_num == orgmem_no_array.length){
					response.send(results);
				}
			}
		});
	}
}