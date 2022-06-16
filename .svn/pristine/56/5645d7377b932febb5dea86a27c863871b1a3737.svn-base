var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var layout = require("../../../../function/layout.js");
var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	
	 var mngt_no = request.param("number");
	 
	 var sql = "select " +
	 	" orgmem_no,	\n" +
		" orgmem_name,	\n" +
		" orgmem_name_chi,	\n" +
		" orgmem_birth_year,	\n" +
		" orgmem_work_duty,	\n" +
		" orgmem_phone0,	\n" +
		" orgmem_phone1,	\n" +
		" orgmem_phone2,	\n" +
		" orgmem_phone3,	\n" +
		" orgmem_email,	\n" +
		" orgmem_img,	\n" +
		" orgmem_lunar,	\n" +
		" orgmem_url,	\n" +
		" orgmem_seqNo,	\n" +
		" case orgmem_seqNo	\n" +
			" when '0000' then '재일동문' \n" +
			" else concat(orgmem_seqNo,	'회') \n" +
		" end as orgmem_seqNm,	\n" +
		" orgmem_area_work,	\n" +
		" orgmem_department,	\n" +
		" orgmem_position,	\n" +
		" orgmem_seqNum,	\n" +
		" orgmem_admyear,	\n" +
		" orgmem_grdyear,	\n" +
		" industry,	\n" +
		" date_format(create_date, '%Y.%m.%d') as c_date,	\n" +
	    " (select org_seqNo from org_seq where org_no = orgmem_seqNo) as org_leader, \n" + 
	    " (select org_seqYear from org_seq where org_no = orgmem_seqNo) as org_leader_day, \n" + 
		" orgmem_keyword,	\n" +
		" orgmem_leader_code,	\n" +
		" ifnull(getCodeName('orgmem_major',orgmem_major),'') as orgmem_major,	\n" +
		" orgmem_major_txt,	\n" +
		" ifnull(getCodeName('orgmem_orgMba',orgmem_position_mba),'') as orgmem_position_mba,	\n" +
		" ifnull(getCodeName('orgmem_area',orgmem_area),'') as orgmem_area,	\n" +
		" orgmem_memberYn,	\n" +
		" code1,	\n" +
		" code2,	\n" +
		" code3,	\n" +
		" code4,	\n" +
		" orgmem_office_nm,	\n" +
		" orgmem_office_addr1,	\n" +
		" orgmem_office_addr2,	\n" +
		" orgmem_office_addr_zipcode,	\n" +
		" orgmem_home_addr1,	\n" +
		" orgmem_home_addr2,	\n" +
		" orgmem_home_addr_zipcode,	\n" +
		" company_tel1,	\n" +
		" company_tel2,	\n" +
		" company_tel3,	\n" +
		" orgmem_fax1,	\n" +
		" orgmem_fax2,	\n" +
		" orgmem_fax3,	\n" +
		" orgmem_homepage,	\n" +
		" orgmem_sns,	\n" +
		" business_field,	\n" +
		" link1,	\n" +
		" link2,	\n" +
		" remrk,	\n" +
		" topcompany,	\n" +
		" company_img1,	\n" +
		" company_img2,	\n" +
		" company_img3,	\n" +
		" company_img4,	\n" +
		" business_card,	\n" +
		" company_intro,	\n" +
		" case when orgmem_position1 = '1' then '회장단' when orgmem_position1 = '2' then '고문' when orgmem_position1 = '3' then '자문위원' when orgmem_position1 = '4' then '장학회' when orgmem_position1 = '5' then '지역동문회'when orgmem_position1 = '6' then '회원' END AS orgmem_position1,	\n" +
		"  IF(orgmem_position1 = 1,(SELECT code_name FROM code c WHERE c.code = orgmem_position2 AND code_group = 'org_position'),  orgmem_position2)as orgmem_position2,	\n" +
		" orgmem_position3,	\n" +
		" chapter_position1,	\n" +
		" chapter_position2,	\n" +
		" chapter_position3,	\n" +
		" committee_position1,	\n" +
		" committee_position2,	\n" +
		" committee_position3,	\n" +
		" etc_position,	\n" +
		" etc_position1,	\n" +
		" create_id,	\n" +
		" create_date,	\n" +
		" create_host	\n" +
		 " from orgmember where orgmem_no = " + mngt_no;
		 
		console.log(sql);
	 
	 fs.readFile("./views/admin/web/orgmember_mngt/orgm_viewForm.html", "utf-8", function(error, data){
		 
		 db.query(sql, function(error, results){
			 
			 if(error){
				 response.send("fail");
			 }else{
        		response.send(ejs.render(layout.include("web_admin_popup", data), {
        			db_data : results,
        			menuNum: 0
        		}));				 
			 }
		 });
	 });
};
