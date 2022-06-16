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
	

	if(month.toString().length == 1){
		month ="0"+month;
	}


	
	if(request.session.admin_yn=='Y'){
		fs.readFile("./views/admin/web/dues_manage/dues_view.html", "utf-8", function(error, data){
			if(month != ''){
			page_navi.action('dues', 'AND YEAR = '+year+' AND MONTH = '+month+'', nowPage, col_count, row_count, function(error, page_txt, page_start, page_end){
			
	
			var sql = "SELECT * FROM dues F1 LEFT OUTER JOIN orgmember F2 ON F1.orgmem_no = F2.orgmem_no WHERE year ='"+year+"' AND month ='"+month+"'";	

			switch (search_type) {
				case 'name':
					sql += " AND F2.orgmem_name LIKE '%"+search_text+"%'"
					break;
				case 'gisu':
					sql += " AND F2.orgmem_seqNo = '"+search_text+"'";
					break;
			
				default:
					break;
			}

			sql += " limit " + page_start +", " + page_end;
			console.log(sql);
			db.query(sql, function(error, results){
				if(error){
					response.send("fail");
					console.log("admin/web/board_list/error======", sql);
				}else{
					response.send(ejs.render(layout.include("web_admin", data), {
										data : results,
										nowPage : nowPage,
										page_navi :page_txt,
										search_text : search_text,
										search_type : search_type,
										admin : admin,
										menuNum : 8,
										month : month,
										year : year
								}));
							}
						});
					});

				}else{
					page_navi.action('dues', 'AND YEAR = '+year+'', nowPage, col_count, row_count, function(error, page_txt, page_start, page_end){
			
						var sql = "SELECT * FROM dues F1 LEFT OUTER JOIN orgmember F2 ON F1.orgmem_no = F2.orgmem_no WHERE year ='"+year+"'";	
						
						switch (search_type) {
							case 'name':
								sql += " AND F2.orgmem_name LIKE '%"+search_text+"%'"
								break;
							case 'gisu':
								sql += " AND F2.orgmem_seqNo = '"+search_text+"'";
								break;
						
							default:
								break;
						}
			
						sql += " limit " + page_start +", " + page_end;
						console.log(sql);
						db.query(sql, function(error, results){
							if(error){
								response.send("fail");
								console.log("admin/web/board_list/error======", sql);
							}else{
								response.send(ejs.render(layout.include("web_admin", data), {
													data : results,
													nowPage : nowPage,
													page_navi :page_txt,
													search_text : search_text,
													search_type : search_type,
													admin : admin,
													menuNum : 8,
													month : month,
													year : year
											}));
										}
									});
								});
				}		
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
