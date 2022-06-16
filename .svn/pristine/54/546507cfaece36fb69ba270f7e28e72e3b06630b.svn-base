
var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var layout = require("../../../../function/layout.js");
var code = require("../../../../function/codeMngt.js");
var db = require("../../../DB_config.js").connect;


exports.listener=function(request, response){
	console.log("##################################### company_modify Enter #####################################");
	
	var orgmem_no = request.param("number");
	var mode = "modify";
	
	var sql1 = "select  \n" +
				" orgmem_no \n" +
				", orgmem_seqNo \n" +
				", orgmem_grdyear \n" +
				", orgmem_grdimg \n" +
				", orgmem_nowimg \n" +
				", orgmem_name \n" +
				", orgmem_name_han \n" +
				", orgmem_class \n" +
				", company_name \n" +
				", company_position1 \n" +
				", company_position2 \n" +
				", orgmem_home_addr1 \n" +
				", orgmem_office_addr1 \n" +
				", company_tel1 \n" +
				", company_tel2 \n" +
				", company_tel3 \n" +
				", orgmem_home_tel1 \n" +
				", orgmem_home_tel2 \n" +
				", orgmem_home_tel3 \n" +
				", orgmem_phone1 \n" +
				", orgmem_phone2 \n" +
				", orgmem_phone3 \n" +
				", orgmem_email \n" +
				", remrk \n" + 
				" from orgmember where orgmem_no = " + orgmem_no;
	
	console.log("company_modify sql1 ::::: " + sql1);
	
	fs.readFile("./views/admin/web/orgmember_mngt/company_writeForm.html", "utf-8", function(error, data){
			db.query(sql1, function(error, results1){
				response.send(ejs.render(layout.include("web_admin_popup", data), {
					db_data : results1,
					mode : mode,
						
				}));
			});
	});
};