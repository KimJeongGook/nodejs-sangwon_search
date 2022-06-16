var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config").connect;
var page_navi = require("../../../function/person_page_navi.js");
var layout = require("../../../function/layout.js");
var koreaChk = require("../../../js/koreanchk.js");

exports.listener=function(request, response){

	console.log("********************* search_data.js enter *********************");

	var search_name = request.param("search_name")==undefined ? "" : request.param("search_name");
	var seqNo = request.param("type_select")==undefined ? "" : request.param("type_select");
	
	//var sql="";
	//sql = "select * from orgmember where 1=1 and " + koreaChk.koreanChk('orgmem_name', search_name) + "";
	
	var sql = "select * \n"
		sql += " from orgmember where 1=1 \n"
		if(seqNo != ""){
			sql += " and orgmem_seqNo = " + seqNo;
		}
		if(search_name != ""){
			sql += " and ("+ koreaChk.koreanChk('orgmem_name', search_name) + ")";
		}
	console.log("seqNo:::",seqNo);
	console.log("search_name:::",search_name);
	console.log("sql:::",sql);

	/* 데이터 S */
	fs.readFile("./views/user/web/search_data.html", "utf-8", function(error,data){
		db.query(sql, function(error, result){
			response.send(ejs.render(layout.include("web_admin", data), {
				result : result,
				search_name : search_name,
				type_select : seqNo
			}));
		});
	});
};
