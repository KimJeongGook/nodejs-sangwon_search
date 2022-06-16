var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");


var page_navi = require("../../../../function/person_page_navi.js");
var layout = require("../../../../function/layout.js");
var code = require("../../../../function/codeMngt.js");
var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	console.log("****************************** orgm_del.js Enter ******************************");
		
	var orgmem_no = request.param("brd_no");
	
	var qry = "delete from orgmember where orgmem_no = " + orgmem_no;
	console.log(qry);

	db.query(qry, function(error, results){
		response.redirect('admin/web/orgm_list');
	});

	if(request.session.admin_yn=='Y'){
		fs.readFile('views/location_page.html', "utf-8", function(error, data){
			response.send(ejs.render(data, {
			loc_txt : '관리자 로그인이 필요합니다.',
			loc_url : '/admin/web'
			}));
		});
	}
}