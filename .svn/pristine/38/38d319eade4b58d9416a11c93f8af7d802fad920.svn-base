var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../../../DB_config.js").connect;

var layout = require("../../../../function/layout.js");
var code = require("../../../../function/codeMngt.js");

exports.listener =  function(request, response){
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	var search_major = request.param("search_major")==undefined ? "" : request.param("search_major");
	var search_position = request.param("search_position")==undefined ? "" : request.param("search_position");
	var orgmem_seqNo = request.param("orgmem_seqNo")==undefined ? "" : request.param("orgmem_seqNo");
	var isSearch = request.param("isSearch")==undefined ? "false" : request.param("isSearch");
	var sql = "";
	var p_where = "";
	var chk_search = 0;
	
	if(request.session.admin_yn=='Y'){
		fs.readFile("./views/admin/web/ums/ums_list.html","utf-8", function(error, data) {
			code.selectBoxList("orgmem_major", "search_major", function(error, s_data){
				code.selectBoxList("orgmem_orgMba", "search_position", function(err, s_data2){
					sql += "select	\n"+
					" @RNUM := @RNUM +1 as num, \n" +
					" orgmem_no,	\n" +
					" orgmem_name,	\n" +
					" concat(orgmem_phone1, '-', orgmem_phone2, '-', orgmem_phone3) as orgmem_phone, \n" +
					" (select org_seqNo from org_seq where org_no = A.orgmem_seqNo) as orgmem_seqNo \n" +
					" from orgmember A, (SELECT @RNUM := 0 ) r \r";
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
					
					sql += "order by orgmem_name asc ";
	
					console.log(sql);
					
					db.query(sql, function(error, results){
						if(error){
							response.send(error);
						}else{
							sql ="select * from org_seq where cast(org_seqNo as signed) > 28 order by org_seqNo desc";
							db.query(sql, function(error, results2){
								if(isSearch == "false"){
									response.send(ejs.render(layout.include("web_admin", data),{
										db_data : results,
										org_seqList : results2,
										search_text : search_text,
										search_major : search_major,
										s_orgmem_major : s_data,
										search_position : search_position,
										s_orgmem_position : s_data2,
										orgmem_seqNo : orgmem_seqNo,
										menuNum : 5
									}));
								}else{
									response.send(results)
								}
							});
						}
					});
				});
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

	
