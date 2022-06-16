var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;
var layout = require("../../../../function/layout.js");
var session = require("../../../../function/session.js");
var code = require("../../../../function/codeMngt.js");

exports.listener=function(request, response){
	console.log("****************************** print_admin_list Enter ******************************");
	
	var search_seqNo = request.param("search_seqNo")==undefined ? "" : request.param("search_seqNo");
	var search_major = request.param("search_major")==undefined ? "" : request.param("search_major");
	var search_area = request.param("search_area")==undefined ? "" : request.param("search_area");
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	var app_user_search = request.param("app_user_search") == undefined ? '' : request.param("app_user_search");
	var connectorNo = session.connectorNo(request);
	var connectorDivision = session.connectorDivision(request);
	var search_all = request.param("search_all")==undefined ? "" : request.param("search_all");
	var order_type = request.param("order_type")==undefined ? "" : request.param("order_type");
	
	var index_total = request.param("index_total")==undefined ? "" : request.param("index_total");
	var index_cnt = request.param("index_cnt")==undefined ? "" : request.param("index_cnt");
	
	var label_select = request.param("label_select")==undefined ? "" : request.param("label_select");
	var destination = request.param("destination")==undefined ? "" : request.param("destination");
	
	//console.log("index_total ::: " + index_total);
	//console.log("index_cnt ::: " + index_cnt);
	
	console.log("label_select ::: " + label_select);
	console.log("destination ::: " + destination);
	console.log("order_type ::: " + order_type);
	
	var index_split = index_total.split(',');
	
	var sql="";

	sql = "select \n";
		sql += "@RNUM := @RNUM + 1 as num \n";
		sql += ", orgmem_no \n";
		sql += ", company_name \n";
		sql += ", if(LEFT(company_name, 1) = '(' and SUBSTRING(company_name, 3, 1) = ')', substr(company_name, 4), company_name) AS company_name_result \n";
		sql += ", orgmem_name \n";
		sql += ", orgmem_office_addr1 \n";
		sql += ", orgmem_office_addr_zipcode \n";
	sql += "from	orgmember a \n";
	sql += "        , (SELECT @RNUM := 0 ) r \n";
	sql += "where	1 = 1 AND";
	
	//console.log("index_split :: " + index_split);
	
	for(var i = 0; i < index_cnt; i++){
		if(i == 0){
			sql += " orgmem_no = " + index_split[i];
		} else {
			sql += " OR orgmem_no = " + index_split[i];
		}
		//console.log("index_split[i] :: " + index_split[i]);
	}
	if(order_type == "no"){
		sql += " ORDER BY orgmem_no desc";
	} else {
		sql += " ORDER BY company_name_result asc";
	}
	
	
	console.log();
	console.log('sql ::::::: ' + sql);
	console.log();

	if(label_select == "two_six"){
		console.log("label_select 2X6 :::: " + label_select);
		
		fs.readFile("./views/admin/web/orgmember_mngt/2X6_print_admin_list.html", "utf-8", function(error, data){
			db.query(sql, function(error, results){
				response.send(ejs.render(layout.include("web_admin_popup", data), {
					connectorNo : connectorNo,
					db_data : results,
					label_select : label_select,
					destination : destination,
					db_data_size : index_cnt,
				}));
			});
		});
		
	} else if(label_select == "two_seven"){
		console.log("label_select 2X7 :::: " + label_select);
		
		fs.readFile("./views/admin/web/orgmember_mngt/2X7_print_admin_list.html", "utf-8", function(error, data){
			db.query(sql, function(error, results){
				response.send(ejs.render(layout.include("web_admin_popup", data), {
					connectorNo : connectorNo,
					db_data : results,
					label_select : label_select,
					destination : destination,
					db_data_size : index_cnt,
				}));
			});
		});
		
	} else if(label_select == "two_eight"){
		console.log("label_select 2X8 :::: " + label_select);
		
		fs.readFile("./views/admin/web/orgmember_mngt/2X8_print_admin_list.html", "utf-8", function(error, data){
			db.query(sql, function(error, results){
				response.send(ejs.render(layout.include("web_admin_popup", data), {
					connectorNo : connectorNo,
					db_data : results,
					label_select : label_select,
					destination : destination,
					db_data_size : index_cnt,
				}));
			});
		});
		
	}
	
};
