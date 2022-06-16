var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var page_navi = require("../../../../function/person_page_navi.js");
var layout = require("../../../../function/layout.js");
var db = require("../../../DB_config.js").connect;
var code = require("../../../../function/codeMngt.js");

exports.listener=function(request, response){

	var mngt_no = request.param("brd_no");
	var seqNo = request.param("seqNo");
	var s_major = request.param("s_major");
	var s_position = request.param("s_position");
	var s_text = request.param("s_text");
	var order_type = request.param("order_type");
	var nowPage = request.param("nowPage");
	
	//기존 테이블 사용자 저장
	var sql = "update orgmember \n" +
	  "set \n" +
	  "orgmem_seqNo = (select * from (select seqNo_storage from orgmember where orgmem_no = '"+mngt_no+"') as x), \n" +
	  "seqNo_storage = '' \n" +
	  "where orgmem_no = '"+mngt_no+"'";
	
	console.log(sql);
	
	db.query(sql, function(error, results){
		if(error){
			response.send("fail");
		}else{
			var nowPage = request.param("nowPage")==null ? 1 : request.param("nowPage");
			var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
			/*var search_type = request.param("search_type")==undefined ? "" : request.param("search_type");*/
			var search_major = request.param("search_major")==undefined ? "" : request.param("search_major");
			var search_position = request.param("search_position")==undefined ? "" : request.param("search_position");
			var orgmem_seqNo = request.param("orgmem_seqNo")==undefined ? "" : request.param("orgmem_seqNo");
			var order_type = request.param("order_type")==undefined ? "no" : request.param("order_type");
			var row_count = 20; //페이지목록 갯수
			var col_count = 10; //하단 페이지수
			var sql = "";
			var p_where = "";
			var chk_search = 0;
			var app_install_sql = "";
			
			if(orgmem_seqNo == ''){
				p_where += " and orgmem_seqNo != '00' \n";
			}else if(orgmem_seqNo != ''){
				if(orgmem_seqNo == 'moreData'){
					p_where += " and cast( getOrgSeqNo(orgmem_seqNo) as signed) between 1 and 28\n"; //28기이전 데이터 조회
				}else{
					p_where += " and orgmem_seqNo = '" + orgmem_seqNo + "' \n"; //선택기수 조회
				}
				chk_search++;
			}
			
			if(search_major != ''){
				p_where += " and orgmem_major = '" + search_major +"' \n";
			}
			
			if(search_position != ''){
				p_where += " and orgmem_position_mba = '" + search_position +"' \n";
			}
			
			if(search_text != ''){
				p_where += 'and (';
				p_where += "orgmem_name like'%" + search_text  + "%' \n" ;
				p_where += " or orgmem_leader_code like'%" + search_text  + "%' \n" ;
				p_where += " or ifnull(getCodeName('orgmem_orgMba',orgmem_position_mba),'') like'%" + search_text  + "%' \n" ;
				p_where += " or concat(orgmem_phone1, orgmem_phone2, orgmem_phone3) like  concat('%',replace('" + search_text + "','-',''),'%') \n" ;
				p_where += " or orgmem_address_work like'%" + search_text  + "%' \n" ;
				p_where += " or orgmem_address_home like'%" + search_text  + "%' \n" ;
				p_where += " or orgmem_keyword like'%" + search_text  + "%' \n" ;
				p_where += ')';
			}

			if(request.session.admin_yn=='Y'){
				fs.readFile("./views/admin/web/orgmember_mngt/orgm_listForm.html", "utf-8", function(error, data){
					code.selectBoxList("orgmem_major", "search_major", function(err, s_data2){
						code.selectBoxList("orgmem_orgMba", "search_position", function(err, s_data3){
							page_navi.action('orgmember', p_where, nowPage, col_count, row_count, function(error, page_txt, page_start, page_end, total_cnt){
								sql += "select	\n"+
								" @RNUM := @RNUM +1 as num, \n" +
								//" (select x.type from push x where replace(x.phone_num, '-', '') = concat(orgmem_phone1, orgmem_phone2, orgmem_phone3) order by final_date limit 0,1) as device_os, \n" +
								" (select x.type from push x where x.orgmem_no = a.orgmem_no order by final_date limit 0,1) as device_os, \n" +
								" orgmem_no,	\n" +
								" orgmem_name,	\n" +
								" orgmem_birth_year,	\n" +
								" orgmem_address_home,	\n" +
								" orgmem_address_work,	\n" +
								" orgmem_work_duty,	\n" +
								" orgmem_phone0,	\n" +
								" orgmem_phone1,	\n" +
								" orgmem_phone2,	\n" +
								" orgmem_phone3,	\n" +
								" orgmem_leader_code,	\n" +
								" orgmem_email,	\n" +
								" orgmem_img,	\n" +
								" orgmem_seqNo,	\n" +
								" (select org_seqNo from org_seq where org_no = orgmem_seqNo) as org_leader, \n" + 
								" (select org_seqYear from org_seq where org_no = orgmem_seqNo) as org_leader_day, \n" + 
								" orgmem_keyword,	\n" +
								" ifnull(getCodeName('orgmem_major',orgmem_major),'') as orgmem_major,	\n" +
								" ifnull(getCodeName('orgmem_orgMba',orgmem_position_mba),'') as orgmem_position_mba,	\n" +
								" orgmem_memberYn,	\n" +
								" create_id,	\n" +
								" create_date,	\n" +
								" create_host	\n" +
								" from orgmember a, (SELECT @RNUM := 0 ) r \r";
								sql += " where \n";
								sql += " 1=1 \n";
								
								if(orgmem_seqNo == ''){
									sql += " and orgmem_seqNo != '00' \n";
								}else if(orgmem_seqNo != ''){
									if(orgmem_seqNo == 'moreData'){
										sql += " and cast( getOrgSeqNo(orgmem_seqNo) as signed) between 1 and 28\n"; //28기이전 데이터 조회
									}else{
										sql += " and orgmem_seqNo = '" + orgmem_seqNo + "' \n"; //선택기수 조회
									}
								}
								
								if(search_major != ''){
									sql += " and orgmem_major = '" + search_major +"' \n";
								}
								
								if(search_position != ''){
									sql += " and orgmem_position_mba = '" + search_position +"' \n";
								}
								
								if(search_text != ''){
									sql += 'and (';
									sql += "orgmem_name like'%" + search_text  + "%' \n" ;
									sql += " or orgmem_leader_code like'%" + search_text  + "%' \n" ;
									sql += " or ifnull(getCodeName('orgmem_orgMba',orgmem_position_mba),'') like'%" + search_text  + "%' \n" ;
									sql += " or concat(orgmem_phone1, orgmem_phone2, orgmem_phone3) like  concat('%',replace('" + search_text + "','-',''),'%') \n" ;
									sql += " or orgmem_address_work like'%" + search_text  + "%' \n" ;
									sql += " or orgmem_address_home like'%" + search_text  + "%' \n" ;
									sql += " or orgmem_keyword like'%" + search_text  + "%' \n" ;
									sql += ')';
								}
								
								if(order_type=='no'){
									sql += "order by orgmem_no desc ";
								}else if(order_type=='name'){
									sql += "order by orgmem_name asc ";
								}
			
								sql += "limit " + page_start + "," +page_end;
								console.log(sql);
								
								//앱 설치된 사람 카운트
								app_install_sql = "select count(*) as cnt from orgmember a, push b where a.orgmem_no = b.orgmem_no " + p_where;
								console.log(app_install_sql);
								console.log("======================================================= \n");
								console.log("\n \n " + app_install_sql);
								
								db.query(app_install_sql, function(error, app_install_count_result){
									db.query(sql, function(error, results){
										if(error){
											response.send(error);
										}else{
											sql ="select * from org_seq where cast(org_seqNo as signed) > 28 order by org_seqNo desc"; //기수
											db.query(sql, function(error, results2){
												response.send(ejs.render(layout.include("web_admin", data),{
													db_data : results,
													page_navi : page_txt,
													org_seqList : results2,
													nowPage : nowPage,
													search_text : search_text,
													/*search_type : search_type,*/
													search_major : search_major,
													s_orgmem_major : s_data2,
													search_position : search_position,
													s_orgmem_position : s_data3,
													orgmem_seqNo : orgmem_seqNo,
													menuNum : 0,
													order_type : order_type,
													total_cnt : total_cnt,
													app_install_count : app_install_count_result[0].cnt,
													page_start : page_start+1
												}));
											});
										}
									});
								});
							});
						});
					});
				});
			}
			else{
				fs.readFile('views/location_page.html', "utf-8", function(error, data){
					response.send(ejs.render(data, {
						loc_txt : '관리자 로그인이 필요합니다.',
						loc_url : '/admin/web'
					}));
				});
			}
		}
	});
};
