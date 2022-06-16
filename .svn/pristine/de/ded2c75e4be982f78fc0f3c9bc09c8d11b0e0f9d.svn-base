var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;
var page_navi = require("../../../../function/person_page_navi.js");
var layout = require("../../../../function/layout.js");
var code = require("../../../../function/codeMngt.js");


exports.listener=function(request, response){
	console.log("****************************** orgm_list.js Enter ******************************");
	
	var nowPage = request.param("nowPage")==null ? 1 : request.param("nowPage");
	var search_type = request.param("search_type")==undefined ? "" : request.param("search_type");
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	
	var search_major = request.param("search_major")==undefined ? "" : request.param("search_major");
	var search_area = request.param("search_area")==undefined ? "" : request.param("search_area");
	var orgmem_seqNo = request.param("orgmem_seqNo")==undefined ? "" : request.param("orgmem_seqNo");
	var search_seqNo = request.param("search_seqNo")==undefined ? "" : request.param("search_seqNo");
	var search_admyear = request.param("search_admyear")==undefined ? "" : request.param("search_admyear");
	
	var order_type = request.param("order_type")==undefined ? "no" : request.param("order_type");
	var row_count = 336; //페이지목록 갯수
	var col_count = 10; //하단 페이지수
	var sql = "";
	var p_where = "";
	var cnt_sql="";
	var chk_search = 0;
	var adnm = request.session.ad_nm;
	
	console.log("search_type ::: " + search_type);
	console.log("search_text ::: " + search_text);
	
	if(search_text != ''){
		if(search_type == "orgmem_name"){
			p_where += " and orgmem_name like '%" + search_text +  "%' \n" ;
		} else if (search_type == "orgmem_seqNo"){
			p_where += " and orgmem_seqNo like '%" + search_text +  "%' \n" ;
		} 
	}
	

	
	//if(request.session.admin_yn=='Y'){
		fs.readFile("./views/admin/web/orgmember_mngt/orgm_listForm.html", "utf-8", function(error, data){
			code.selectBoxList("orgmem_major", "search_major", function(err, s_data2){
				code.selectBoxList("orgmem_area", "search_area", function(err, s_data3){
					page_navi.action('orgmember', p_where, nowPage, col_count, row_count, function(error, page_txt, page_start, page_end, total_cnt){
						
						sql = "select \n";
						sql += "@RNUM := @RNUM + 1 as num \n";
						sql += ", orgmem_no \n";
						sql += ", orgmem_seqNo \n";
						sql += ", orgmem_grdyear \n";
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
						sql += " from orgmember a \n";
						sql += " , (SELECT @RNUM := 0 ) r \n";
						sql += " where 1 = 1";
						
						if(search_text != ''){
							if(search_type == "orgmem_name"){
								sql += " and orgmem_name like '%" + search_text +  "%' \n" ;
							} else if (search_type == "orgmem_seqNo"){
								sql += " and orgmem_seqNo = '" + search_text +  "' \n" ;
							} 
						}
						
						if(order_type=='no'){
							sql += " order by orgmem_seqNo, orgmem_class, orgmem_name ";
						}else if(order_type=='name'){
							//sql += " order by company_name asc ";
							sql += " ORDER BY orgmem_name asc";
						}
						
						sql += " limit " + page_start + "," +page_end;
						
						console.log("sql ::::: " + sql);
						
						cnt_sql += "select \n"
						cnt_sql += " count(*) as cnt \n";
						cnt_sql += " from ( \n";
						cnt_sql += sql;
						cnt_sql += " ) a \n";
						
						db.query(sql, function(error, results){
							db.query(cnt_sql, function(error, count_result) {
								
								/*console.log("count_result[0].cnt :: "+count_result[0].cnt);
								console.log("results :: "+results);
								
								console.log("results[0] :: " + results[0]);*/
								
								var list = [];
								for(var i = 0; i < count_result[0].cnt; i++){
									if(i != count_result[0].cnt - 1){
										list += results[i].orgmem_no + ",";
									} else {
										list += results[i].orgmem_no;
									}
									
								}
								//console.log("list :::: " + list);
								
								if(error){
									response.send(error);
								}else{
									sql ="select * from org_seq where cast(org_seqNo as signed) > 28 order by org_seqNo desc"; //기수
									db.query(sql, function(error, results2){
										response.send(ejs.render(layout.include("admin_web", data),{
											db_data : results,
											db_data_length : count_result[0].cnt,
											db_data_totallist : list,
											page_navi : page_txt,
											org_seqList : results2,
											nowPage : nowPage,
											search_text : search_text,
											search_type : search_type,
											search_major : search_major,
											search_area : search_area,
											search_seqNo : search_seqNo,
											search_admyear : search_admyear,
											s_orgmem_major : s_data2,
											/*s_orgmem_position : search_position,*/
											s_orgmem_area : s_data3,
											orgmem_seqNo : orgmem_seqNo,
											menuNum : 0,
											subMenuNum : 0,
											order_type : order_type,
											total_cnt : total_cnt,
											page_start : page_start+1,
											adnm: adnm
										}));
									});
								}
							});
						});
					});
				});
			});
		});
	/*}else{
		fs.readFile('views/location_page.html', "utf-8", function(error, data){
			response.send(ejs.render(data, {
				loc_txt : '관리자 로그인이 필요합니다.',
				loc_url : '/admin/web'
			}));
		});
	}*/
};
