var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;
var page_navi = require("../../../../function/person_page_navi.js");
var layout = require("../../../../function/layout.js");
var code = require("../../../../function/codeMngt.js");

exports.listener=function(request, response){
	var nowPage = request.param("nowPage")==null ? 1 : request.param("nowPage");
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	/*var search_type = request.param("search_type")==undefined ? "" : request.param("search_type");*/
	var search_major = request.param("search_major")==undefined ? "" : request.param("search_major");
	var search_area = request.param("search_area")==undefined ? "" : request.param("search_area");
	var orgmem_seqNo = request.param("orgmem_seqNo")==undefined ? "" : request.param("orgmem_seqNo");
	var row_count = 10; //페이지목록 갯수
	var col_count = 10; //하단 페이지수
	var sql = "";
	var p_where = "";
	var chk_search = 0;

	if(orgmem_seqNo!=''){
		if(orgmem_seqNo == 'moreData'){
			p_where += " and cast( getOrgSeqNo(orgmem_seqNo) as signed) between 1 and 28 \n"; //28기이전 데이터 조회
		}else{
			p_where += " and orgmem_seqNo = '" + orgmem_seqNo + "' \n"; //선택기수 조회
		}
		chk_search++;
	}
	
	if(search_major != ''){
		p_where += " and orgmem_major = '" + search_major +"' \n";
	}
	
	if(search_area != ''){
		p_where += " and orgmem_area = '" + search_area +"' \n";
	}
	
	if(search_text != ''){
		p_where += 'and (';
		p_where += "orgmem_name like'%" + search_text  + "%' \n" ;
		p_where += " or orgmem_leader_code like'%" + search_text  + "%' \n" ;
		p_where += " or ifnull(getCodeName('orgmem_orgMba',orgmem_position_mba),'') like'%" + search_text  + "%' \n" ;
		p_where += " or concat(orgmem_phone1, orgmem_phone2, orgmem_phone3) like  concat('%',replace('" + search_text + "','-',''),'%') \n" ;
		//p_where += " or orgmem_address_work like'%" + search_text  + "%' \n" ;
		//p_where += " or orgmem_address_home like'%" + search_text  + "%' \n" ;
		p_where += " or orgmem_keyword like'%" + search_text  + "%' \n" ;
		p_where += ')';
	}

	if(request.session.admin_yn=='Y'){
		fs.readFile("./views/admin/web/orgmember_mngt/orgm_listForm_popup.html", "utf-8", function(error, data){
			code.selectBoxList("orgmem_major", "search_major", function(err, s_data2){
				code.selectBoxList("orgmem_area", "search_area", function(err, s_data3){
					page_navi.action('orgmember', p_where, nowPage, col_count, row_count, function(error, page_txt, page_start, page_end){
						sql += "select	\n"+ 
						" @RNUM := @RNUM +1 as num, \n" +
						//" (select x.type from push x where replace(x.phone_num, '-', '') = concat(orgmem_phone1, orgmem_phone2, orgmem_phone3) order by final_date limit 0,1) as device_os, \n" +
						" (select x.type from push x where x.orgmem_no = a.orgmem_no order by final_date limit 0,1) as device_os, \n" +
						" orgmem_no,	\n" +
						" orgmem_name,	\n" +
						" orgmem_birth,	\n" +
						" orgmem_work_duty,	\n" +
						" orgmem_phone0,	\n" +
						" orgmem_phone1,	\n" +
						" orgmem_phone2,	\n" +
						" orgmem_phone3,	\n" +
						" orgmem_leader_code,	\n" +
						" orgmem_email,	\n" +
						" orgmem_img,	\n" +
						" orgmem_seqNo,	\n" +
						" case orgmem_seqNo	\n" +
							" when '0000' then '재일동문' \n" +
							" else concat(orgmem_seqNo,	'회') \n" +
						" end as orgmem_seqNm,	\n" +
						" (select org_seqNo from org_seq where org_no = orgmem_seqNo) as org_leader, \n" + 
						" (select org_seqYear from org_seq where org_no = orgmem_seqNo) as org_leader_day, \n" + 
						" orgmem_keyword,	\n" +
						" ifnull(getCodeName('orgmem_major',orgmem_major),'') as orgmem_major,	\n" +
						" orgmem_major_txt,	\n" +
						" ifnull(getCodeName('orgmem_orgMba',orgmem_position_mba),'') as orgmem_position_mba,	\n" +
						" ifnull(getCodeName('orgmem_area',orgmem_area),'') as orgmem_area,	\n" +
						" orgmem_memberYn,	\n" +
						" orgmem_office_nm,	\n" +
						" orgmem_office_addr1,	\n" +
						" orgmem_office_addr2,	\n" +
						" orgmem_office_addr_zipcode,	\n" +
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
						
						if(search_area != ''){
							sql += " and orgmem_area = '" + search_area +"' \n";
						}
	
						if(search_text != ''){
							sql += 'and (';
							sql += "orgmem_name like'%" + search_text  + "%' \n" ;
							sql += " or orgmem_leader_code like'%" + search_text  + "%' \n" ;
							sql += " or ifnull(getCodeName('orgmem_orgMba',orgmem_position_mba),'') like'%" + search_text  + "%' \n" ;
							sql += " or concat(orgmem_phone1, orgmem_phone2, orgmem_phone3) like  concat('%',replace('" + search_text + "','-',''),'%') \n" ;
							//sql += " or orgmem_address_work like'%" + search_text  + "%' \n" ;
							//sql += " or orgmem_address_home like'%" + search_text  + "%' \n" ;
							sql += " or orgmem_keyword like'%" + search_text  + "%' \n" ;
							sql += ')';
						}
	
						sql += "order by orgmem_no desc "; 
						sql += "limit " + page_start + "," +page_end;
						
						console.log(sql);
	
						db.query(sql, function(error, results){
	
							if(error){
								response.send(error);
							}else{
								sql ="select * from org_seq where cast(org_seqNo as signed) > 28 order by org_seqNo desc"; //기수
								db.query(sql, function(error, results2){
									response.send(ejs.render(layout.include("web_admin_popup", data),{
										db_data : results,  
										page_navi :page_txt,
										org_seqList : results2,
										nowPage : nowPage,
										search_text :search_text,
										/*search_type :search_type,*/
										search_major : search_major,
										s_orgmem_major : s_data2,
										search_area : search_area,
										s_orgmem_area : s_data3,
										orgmem_seqNo :orgmem_seqNo,
										page_start : page_start+1,
										menuNum: 0
									}));
								});
							}
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
};
