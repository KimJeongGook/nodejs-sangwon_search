var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;
var page_navi = require("../../../../function/person_page_navi.js");
var layout = require("../../../../function/layout.js");

exports.listener=function(request, response){

	console.log("============================================================================================================================");
	console.log("=======================================         *  DUES MANAGE VIEW *        ===============================================");
	console.log("============================================================================================================================");
    var duse_id = request.param("number");
	var nowPage = (request.param("nowPage")==null) ? 1 : request.param("nowPage");
	var admin = request.session.ad_id;
	var row_count = 10;
	var col_count = 10;
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	var search_type = request.param("search_type")==undefined ? "" : request.param("search_type");
	var p_where = "";

	var currentDate = new Date();

	var currentYear = currentDate.getFullYear();
	var currentMonth = currentDate.getMonth()+1;

	var year = request.param("search_year") == undefined ? currentYear : request.param("search_year");
	var month = request.param("search_month") == undefined ? currentMonth : request.param("search_month");
	

	
	if(request.session.admin_yn=='Y'){
		fs.readFile("./views/admin/web/dues_manage/payment_manage_modify.html", "utf-8", function(error, data){
			 
        var sql = "SELECT * FROM dues F1 LEFT OUTER JOIN orgmember F2 ON F1.orgmem_no = F2.orgmem_no WHERE dues_id ='"+duse_id+"'";
        

			db.query(sql, function(error, results){
				if(error){
                    response.send("fail");
                    console.log(sql);
				}else{
					response.send(ejs.render(layout.include("web_admin_popup", data), {
										data : results,
										nowPage : nowPage,
										admin : admin,
										menuNum : 8,
										duse_id:duse_id,
										year:year,
										month:month
								}));
							}
						});
					
			}); 
	}else{
		fs.readFile('views/location_page.html', "utf-8", function(error, data){
			response.send(ejs.render(data, {
				loc_txt : '관리자 로그인이 필요합니다.',
				loc_url : '/admin/web'
			}));
		});
	}
};
