var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var layout = require("../../../../function/layout.js");
var db = require("../../../DB_config.js").connect;


exports.listener=function(request, response){

	console.log("##################################### company_view Enter #####################################");
	
	var orgmem_no = request.param("number");
	
	var sql = "select \n";
		sql += " orgmem_no \n";
		sql += ", orgmem_seqNo \n";
		sql += ", orgmem_grdyear \n";
		sql += ", orgmem_grdimg \n";
		sql += ", orgmem_nowimg \n";
		sql += ", orgmem_name \n";
		sql += ", orgmem_name_han \n";
		sql += ", orgmem_class \n";
		sql += ", company_name \n";
		sql += ", company_position1 \n";
		sql += ", company_position2 \n";
		sql += ", orgmem_home_addr1 \n";
		sql += ", orgmem_office_addr1 \n";
		sql += ", company_tel1 \n";
		sql += ", company_tel2 \n";
		sql += ", company_tel3 \n";
		sql += ", orgmem_home_tel1 \n";
		sql += ", orgmem_home_tel2 \n";
		sql += ", orgmem_home_tel3 \n";
		sql += ", orgmem_phone1 \n";
		sql += ", orgmem_phone2 \n";
		sql += ", orgmem_phone3 \n";
		sql += ", orgmem_email \n";
		sql += ", remrk \n";
		sql += " , (SELECT @RNUM := 0 ) r \n";

		sql += " from orgmember where orgmem_no = " + orgmem_no;
	
	console.log("sql :::: " + sql);
			
	
	fs.readFile("./views/admin/web/orgmember_mngt/company_viewForm.html", "utf-8", function(error, data){
		 
		db.query(sql, function(error, results){
			
			if(error){
				response.send("fail");
			}else{
			   response.send(ejs.render(layout.include("web_admin_popup", data), {
				   db_data : results,
				  
			   }));				 
			}
		});
	});
};
