var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
require('date-utils');
var db = require("../../../DB_config.js").connect;
var osModule = require('os');

exports.listener=function(request, response){
	var use_os_falg = false;
	if(osModule.type()=='Linux') use_os_falg = true;
	var mode= request.param("mode");
	
	// PK
	var orgmem_no = request.param("orgmem_no") == undefined ? null : request.param("orgmem_no");
	// code1
	var code1 = request.param("code1") == undefined ? null : request.param("code1");
	// code2
	var code2 = request.param("code2") == undefined ? null : request.param("code2");
	// code3
	var code3 = request.param("code3") == undefined ? null : request.param("code3");
	// code4
	var code4 = request.param("code4") == undefined ? null : request.param("code4");
	// 이름(국문)
	var orgmem_name = request.param("orgmem_name") == undefined ? null : request.param("orgmem_name");
	// 이름(한문)
	var orgmem_name_chi = request.param("orgmem_name_chi") == undefined ? null : request.param("orgmem_name_chi");
	// 기수
	var orgmem_seqNo = request.param("orgmem_seqNo") == undefined ? null : request.param("orgmem_seqNo");
	// 전공
	var orgmem_major = request.param("orgmem_major") == undefined ? null : request.param("orgmem_major");
	// 상세전공
	var orgmem_major_txt = request.param("orgmem_major_txt") == undefined ? null : request.param("orgmem_major_txt");
	// 지역
	var orgmem_area = request.param("orgmem_area") == undefined ? null : request.param("orgmem_area");
	// 휴대번호1
	var orgmem_phone1 = request.param("orgmem_phone1") == undefined ? null : request.param("orgmem_phone1");
	// 휴대번호2
	var orgmem_phone2 = request.param("orgmem_phone2") == undefined ? null : request.param("orgmem_phone2");
	// 휴대번호3
	var orgmem_phone3 = request.param("orgmem_phone3") == undefined ? null : request.param("orgmem_phone3");
	// 이메일
	var orgmem_email = request.param("orgmem_email") == undefined ? null : request.param("orgmem_email");
	// 직종
	var industry = request.param("industry") == undefined ? null : request.param("industry");
	// 근무지명
	var orgmem_office_nm = request.param("orgmem_office_nm") == undefined ? null : request.param("orgmem_office_nm");
	// 근무지 우편번호
	var orgmem_office_addr_zipcode = request.param("orgmem_office_addr_zipcode") == undefined ? null : request.param("orgmem_office_addr_zipcode");
	// 근무지 주소1
	var orgmem_office_addr1 = request.param("orgmem_office_addr1") == undefined ? null : request.param("orgmem_office_addr1");
	// 근무지 주소2(상세주소)
	var orgmem_office_addr2 = request.param("orgmem_office_addr2") == undefined ? null : request.param("orgmem_office_addr2");
	// 부서
	var orgmem_department = request.param("orgmem_department") == undefined ? null : request.param("orgmem_department");
	// 직위
	var orgmem_position = request.param("orgmem_position") == undefined ? null : request.param("orgmem_position");
	// 자택 우편번호
	var orgmem_home_addr_zipcode = request.param("orgmem_home_addr_zipcode") == undefined ? null : request.param("orgmem_home_addr_zipcode");
	// 자택 주소1
	var orgmem_home_addr1 = request.param("orgmem_home_addr1") == undefined ? null : request.param("orgmem_home_addr1");
	// 자택 주소2(상세주소)
	var orgmem_home_addr2 = request.param("orgmem_home_addr2") == undefined ? null : request.param("orgmem_home_addr2");
	// 자택 연락처1
	var company_tel1 = request.param("company_tel1") == undefined ? null : request.param("company_tel1");
	// 자택 연락처2
	var company_tel2 = request.param("company_tel2") == undefined ? null : request.param("company_tel2");
	// 자택 연락처3
	var company_tel3 = request.param("company_tel3") == undefined ? null : request.param("company_tel3");

	// 2020-07-28 추가 S
	var orgmem_fax1 = request.param("orgmem_fax1") == null ? '' : request.param("orgmem_fax1");
	var orgmem_fax2 = request.param("orgmem_fax2") == null ? '' : request.param("orgmem_fax2");
	var orgmem_fax3 = request.param("orgmem_fax3") == null ? '' : request.param("orgmem_fax3");	
	var orgmem_homepage = request.param("orgmem_homepage") == undefined ? '' : request.param("orgmem_homepage");
	var orgmem_sns = request.param("orgmem_sns") == undefined ? '' : request.param("orgmem_sns");
	var business_field = request.param("business_field") == undefined ? '' : request.param("business_field");

	var company_img1 = request.param("company_img1") == undefined || null ? '' : request.param("company_img1");
	var company_img2 = request.param("company_img2") == undefined || null ? '' : request.param("company_img2");
	var company_img3 = request.param("company_img3") == undefined || null ? '' : request.param("company_img3");
	var company_img4 = request.param("company_img4") == undefined || null ? '' : request.param("company_img4");

	var business_card = request.param("business_card") == undefined || null ? '' : request.param("business_card");
	var company_intro = request.param("company_intro") == undefined || null ? '' : request.param("company_intro");

	var link1 =  request.param("link1") == undefined ? '' : request.param("link1");
	var link2 =  request.param("link2") == undefined ? '' : request.param("link2");

	var remrk = request.param("remrk") == undefined ? '' : request.param("remrk");

	var topcompany = request.param("topcompany") == undefined ? '' : request.param("topcompany");

	var company_img1_path="";
	var company_img2_path="";
	var company_img3_path="";
	var company_img4_path="";
	var business_card_path="";
	var company_intro_path="";

	var orgmem_position1 = request.param("orgmem_position1") == undefined ? null : request.param("orgmem_position1");

	var orgmem_position2 = request.param("orgmem_position2") == undefined ? "" : request.param("orgmem_position2");
	var orgmem_position2_1 = request.param("orgmem_position2_1") == undefined ? "" : request.param("orgmem_position2_1");
	var orgmem_position2_2 = request.param("orgmem_position2_2") == undefined ? "" : request.param("orgmem_position2_2");
	var orgmem_position2_3 = request.param("orgmem_position2_3") == undefined ? "" : request.param("orgmem_position2_3");
	var orgmem_position2_4 = request.param("orgmem_position2_4") == undefined ? "" : request.param("orgmem_position2_4");
	var orgmem_position2_5 = request.param("orgmem_position2_5") == undefined ? "" : request.param("orgmem_position2_5");


	orgmem_position2 += orgmem_position2_1 + orgmem_position2_2 + orgmem_position2_3 + orgmem_position2_4 +orgmem_position2_5;
	var orgmem_position3 = request.param("orgmem_position3") == undefined ? null : request.param("orgmem_position3");
	
	var chapter_position1 = request.param("chapter_position1") == undefined ? "" : request.param("chapter_position1");
	var chapter_position2 = request.param("chapter_position2") == undefined ? "" : request.param("chapter_position2");
	var chapter_position3 = request.param("chapter_position3") == undefined ? "" : request.param("chapter_position3");

	var committee_position1 = request.param("committee_position1") == undefined ? "" : request.param("committee_position1");
	var committee_position2 = request.param("committee_position2") == undefined ? "" : request.param("committee_position2");
	var committee_position3 = request.param("committee_position3") == undefined ? "" : request.param("committee_position3");
	var etc_position = request.param("etc_position") == undefined ? "" : request.param("etc_position");
	var etc_position1 = request.param("etc_position1") == undefined ? "" : request.param("etc_position1");
	// 2020-07-28 추가 E

	var create_id = request.session.ad_id;
	var create_host = request.connection.remoteAddress;
	 
	var extensionIndex = "";
	var extension = "";
	var date = new Date();
	var day = date.toFormat('YYYYMMDDHHMISS');
	var pathlast = __dirname;
	var pathIndex = "";
	
	if(use_os_falg) {
		pathIndex = pathlast.lastIndexOf('\/custom_module');
	} else {
		pathIndex = pathlast.lastIndexOf('\\custom_module');
	}
	
	var path = pathlast.substring(pathIndex, 0);						//파일이름
	var orgmem_img = "";
	var memberImg_original = "";
	var memberImg_path = "";

	if(request.param("memberImg") != undefined){
		orgmem_img = request.param("memberImg");
		
	}else if(request.files.memberImg.name != ""){
		memberImg_original = request.files.memberImg.name;
		memberImg_path = request.files.memberImg.path;
		
		extensionIndex = memberImg_original.lastIndexOf('.');
		extension = memberImg_original.substring(extensionIndex, memberImg_original.length);	//파일확장자
		
		if(extension != ""){
			orgmem_img = day + extension;
		}else{
			orgmem_img = "";
		}
	}

	if(request.param("company_img1") != undefined){
		company_img1 = request.param("company_img1");
	}else if(request.files.company_img1.name != ""){
		memberImg_original = request.files.company_img1.name;
		company_img1_path = request.files.company_img1.path;
		
		extensionIndex = memberImg_original.lastIndexOf('.');
		extension = memberImg_original.substring(extensionIndex, memberImg_original.length);	//파일확장자
		
		if(extension != ""){
			company_img1 = day +'1'+ extension;
		}else{
			company_img1 = "";
		}
	}
	if(request.param("company_img2") != undefined){
		company_img2 = request.param("company_img2");
	}else if(request.files.company_img2.name != ""){
		memberImg_original = request.files.company_img2.name;
		company_img2_path = request.files.company_img2.path;
		
		extensionIndex = memberImg_original.lastIndexOf('.');
		extension = memberImg_original.substring(extensionIndex, memberImg_original.length);	//파일확장자
		
		if(extension != ""){
			company_img2 = day+'2' + extension;
		}else{
			company_img2 = "";
		}
	}
	if(request.param("company_img3") != undefined){
		company_img3 = request.param("company_img3");
	}else if(request.files.company_img3.name != ""){
		memberImg_original = request.files.company_img3.name;
		company_img3_path = request.files.company_img3.path;
		
		extensionIndex = memberImg_original.lastIndexOf('.');
		extension = memberImg_original.substring(extensionIndex, memberImg_original.length);	//파일확장자
		
		if(extension != ""){
			company_img3 = day+'3' + extension;
		}else{
			company_img3 = "";
		}
	}
	if(request.param("company_img4") != undefined){
		company_img4 = request.param("company_img4");
	}else if(request.files.company_img4.name != ""){
		memberImg_original = request.files.company_img4.name;
		company_img4_path = request.files.company_img4.path;
		
		extensionIndex = memberImg_original.lastIndexOf('.');
		extension = memberImg_original.substring(extensionIndex, memberImg_original.length);	//파일확장자
		
		if(extension != ""){
			company_img4 = day+'4' + extension;
		}else{
			company_img4 = "";
		}
	}


	if(request.param("business_card") != undefined){
		business_card = request.param("business_card");
	}else if(request.files.business_card.name != ""){
		memberImg_original = request.files.business_card.name;
		business_card_path = request.files.business_card.path;
		
		extensionIndex = memberImg_original.lastIndexOf('.');
		extension = memberImg_original.substring(extensionIndex, memberImg_original.length);	//파일확장자
		
		if(extension != ""){
			business_card = day+'c' + extension;
		}else{
			business_card = "";
		}
	}
	
	
	if(request.param("company_intro") != undefined){
		company_intro = request.param("company_intro");
	}else if(request.files.company_intro.name != ""){
		memberImg_original = request.files.company_intro.name;
		company_intro_path = request.files.company_intro.path;
		
		extensionIndex = memberImg_original.lastIndexOf('.');
		extension = memberImg_original.substring(extensionIndex, memberImg_original.length);	//파일확장자
		
		if(extension != ""){
			company_intro = day+'f' + extension;
		}else{
			company_intro = "";
		}
	}
	
	 var sql = "";
	 
	 if(mode=="insert"){
		 sql = "insert into orgmember(" +
		 		"orgmem_img, " + // 사진
		 		"code1, " + // code1
		 		"code2, " + // code2
		 		"code3, " + // code3
		 		"code4, " + // code4
		 		"orgmem_name, " + // 이름(국문)
		 		"orgmem_name_chi, " + // 이름(한문)
		 		"orgmem_seqNo, " + // 기수
		 		"orgmem_major, " + // 전공(코드)
		 		"orgmem_major_txt, " + // 상세전공명
		 		"orgmem_area, " + // 지역(코드)
		 		"orgmem_phone1, " + // 휴대번호1자리(코드)
		 		"orgmem_phone2, " + // 휴대번호2자리
		 		"orgmem_phone3, " + // 휴대번호3자리
		 		"orgmem_email, " + // 이메일
		 		"industry, " + // 직종
		 		"orgmem_office_nm, " + // 근무지명
		 		"orgmem_office_addr_zipcode, " + // 근무지 우편번호
		 		"orgmem_office_addr1, " + // 근무지 주소
		 		"orgmem_office_addr2, " + // 근무지 상세주소
		 		"orgmem_department, " + // 부서
		 		"orgmem_position, " + // 직위
		 		"orgmem_home_addr_zipcode, " + // 자택 우편번호
		 		"orgmem_home_addr1, " + // 자택 주소
		 		"orgmem_home_addr2, " + // 자택 상세주소
		 		"company_tel1, " + // 자택 연락처1
		 		"company_tel2, " + // 자택 연락처2
		 		"company_tel3, " + // 자택 연락처3
		 		// 추가
		 		"orgmem_fax1, " +
		 		"orgmem_fax2, " +
				"orgmem_fax3, " +
				"orgmem_homepage, " +
				"business_field, " +
				"company_intro, " +
				"orgmem_sns, " +
		 		"company_img1, " +
		 		"company_img2, " +
		 		"company_img3, " +
		 		"company_img4, " +
		 		"business_card, " +
		 		"link1, " +
				"link2, " +
				"remrk, " +
				"topcompany, " +
				"orgmem_position1, " +
				"orgmem_position2, " +
				"orgmem_position3, " +
				"chapter_position1, " +
				"chapter_position2, " +
				"chapter_position3, " +
				"committee_position1, " +
				"committee_position2, " +
				"committee_position3, " +
				"etc_position, " +
				"etc_position1, " +
		 		"create_id, " + // 등록자
		 		"create_date, " + // 등록일자
		 		"create_host) " + // 등록자IP
		 		"values(" +
		 		"'"+orgmem_img+"'," + // 사진
		 		"'"+code1+"'," + // 코드1
		 		"'"+code2+"'," + // 코드2
		 		"'"+code3+"'," + // 코드3
		 		"'"+code4+"'," + // 코드4
		 		"'"+orgmem_name+"'," + // 이름(국문)
		 		"'"+orgmem_name_chi+"'," + // 이름(한문)
		 		"'"+orgmem_seqNo+"'," + // 기수
		 		"'"+orgmem_major+"'," + // 전공(코드)
		 		"'"+orgmem_major_txt+"'," + // 상세전공명
		 		"'"+orgmem_area+"'," + // 지역(코드)
		 		"'"+orgmem_phone1+"'," + // 휴대번호1자리(코드)
		 		"'"+orgmem_phone2+"'," + // 휴대번호2자리
		 		"'"+orgmem_phone3+"'," + // 휴대번호3자리
		 		"'"+orgmem_email+"'," + // 이메일
		 		"'"+industry+"'," + // 직종
		 		"'"+orgmem_office_nm+"'," + // 근무지명
		 		"'"+orgmem_office_addr_zipcode+"'," + // 근무지 우편번호
		 		"'"+orgmem_office_addr1+"'," + // 근무지 주소
		 		"'"+orgmem_office_addr2+"'," + // 근무지 상세주소
		 		"'"+orgmem_department+"'," + // 부서
		 		"'"+orgmem_position+"'," + // 직위
		 		"'"+orgmem_home_addr_zipcode+"'," + // 자택 우편번호
		 		"'"+orgmem_home_addr1+"'," + // 자택 주소
		 		"'"+orgmem_home_addr2+"'," + // 자택 상세주소
		 		"'"+company_tel1+"'," + // 자택 연락처1
		 		"'"+company_tel2+"'," + // 자택 연락처2
		 		"'"+company_tel3+"'," + // 자택 연락처3
				// 추가
				"'"+orgmem_fax1+"'," +
				"'"+orgmem_fax2+"'," +
				"'"+orgmem_fax3+"'," +
				"'"+orgmem_homepage+"'," +
				"'"+business_field+"'," + 
				"'"+company_intro+"'," +
				"'"+orgmem_sns+"'," +
				"'"+company_img1+"'," +
				"'"+company_img2+"'," +
				"'"+company_img3+"'," +
				"'"+company_img4+"'," +
				"'"+business_card+"'," +
				"'"+link1+"'," +
				"'"+link2+"'," +
				"'"+remrk+"'," +
				"'"+topcompany+"'," +
				"'"+orgmem_position1+"'," +
				"'"+orgmem_position2+"'," +
				"'"+orgmem_position3+"'," +
				"'"+chapter_position1+"'," +
				"'"+chapter_position2+"'," +
				"'"+chapter_position3+"'," +
				"'"+committee_position1+"'," +
				"'"+committee_position2+"'," +
				"'"+committee_position3+"'," +
				"'"+etc_position+"'," +
				"'"+etc_position1+"'," +
				"'"+create_id+"'," +
				"now(), " +
				"'"+create_host+"'" +
				")";
	 }
	 else {
		 sql = "update orgmember set " +
		 			"orgmem_img='"+orgmem_img+"', " + // 사진
		 			"code1='"+code1+"', " + // 코드1
		 			"code2='"+code2+"', " + // 코드2
		 			"code3='"+code3+"', " + // 코드3
		 			"code4='"+code4+"', " + // 코드4
		 			"orgmem_name='"+orgmem_name+"', " + // 이름(국문)
		 			"orgmem_name_chi='"+orgmem_name_chi+"', " + // 이름(한문)
		 			"orgmem_seqNo='"+orgmem_seqNo+"', " + // 기수
		 			"orgmem_major='"+orgmem_major+"', " + // 전공(코드)
		 			"orgmem_major_txt='"+orgmem_major_txt+"', " + // 상세전공명
		 			"orgmem_area='"+orgmem_area+"', " + // 지역(코드)
		 			"orgmem_phone1='"+orgmem_phone1+"', " + // 휴대번호1자리(코드)
		 			"orgmem_phone2='"+orgmem_phone2+"', " + // 휴대번호2자리
		 			"orgmem_phone3='"+orgmem_phone3+"', " + // 휴대번호3자리
		 			"orgmem_email='"+orgmem_email+"', " + // 이메일
		 			"industry='"+industry+"', " + // 직종
		 			"orgmem_office_nm='"+orgmem_office_nm+"', " + // 근무지명
		 			"orgmem_office_addr_zipcode='"+orgmem_office_addr_zipcode+"', " + // 근무지 우편번호
		 			"orgmem_office_addr1='"+orgmem_office_addr1+"', " + // 근무지 주소
		 			"orgmem_office_addr2='"+orgmem_office_addr2+"', " + // 근무지 상세주소
		 			"orgmem_department='"+orgmem_department+"', " + // 부서
		 			"orgmem_position='"+orgmem_position+"', " + // 직위
		 			"orgmem_home_addr_zipcode='"+orgmem_home_addr_zipcode+"', " + // 자택 우편번호
		 			"orgmem_home_addr1='"+orgmem_home_addr1+"', " + // 자택 주소
		 			"orgmem_home_addr2='"+orgmem_home_addr2+"', " + // 자택 상세주소
		 			"company_tel1='"+company_tel1+"', " + // 자택 연락처1
		 			"company_tel2='"+company_tel2+"', " + // 자택 연락처2
		 			"company_tel3='"+company_tel3+"', " + // 자택 연락처3
		 			// 추가
		 			"orgmem_fax1='"+orgmem_fax1+"', " +
			 		"orgmem_fax2='"+orgmem_fax2+"', " +
					"orgmem_fax3='"+orgmem_fax3+"', " +
					"company_img1='"+company_img1+"', " +
			 		"company_img2='"+company_img2+"', " +
			 		"company_img3='"+company_img3+"', " +
			 		"company_img4='"+company_img4+"', " +
			 		"company_intro='"+company_intro+"', " +
			 		"orgmem_sns='"+orgmem_sns+"', " +
			 		"business_card='"+business_card+"', " +
			 		"link1='"+link1+"', " +
					"link2='"+link2+"', " +
					"remrk='"+remrk+"', " +
					"topcompany='"+topcompany+"', " +
					"orgmem_position1='"+orgmem_position1+"', " +
					"orgmem_position2='"+orgmem_position2+"', " +
					"orgmem_position3='"+orgmem_position3+"', " +
					"chapter_position1='"+chapter_position1+"', " +
					"chapter_position2='"+chapter_position2+"', " +
					"chapter_position3='"+chapter_position3+"', " +
					"committee_position1='"+committee_position1+"', " +
					"committee_position2='"+committee_position2+"', " +
					"committee_position3='"+committee_position3+"', " +
					"orgmem_homepage='"+orgmem_homepage+"', " +
					"business_field='"+business_field+"', " +
					"etc_position='"+etc_position+"', " +
					"etc_position1='"+etc_position1+"', " +
		 			"create_id='"+create_id+"', " +
			 		"create_date=now(), " +
			 		"create_host='"+create_host+"'" +
			 	"where orgmem_no=" + request.param("orgmem_no");
		 /*
		 sql = "update orgmember set " +
				"orgmem_keyword='"+orgmem_keyword+"', " +
		 		"orgmem_name='"+orgmem_name+"', " +
		 		"orgmem_birth_year='"+orgmem_birth_year+"', " +
		 		"orgmem_address_home='"+orgmem_address_home+"', " +
		 		"orgmem_address_work='"+orgmem_address_work+"', " +
		 		"orgmem_phone0='"+orgmem_phone0+"', " +
		 		"orgmem_phone1='"+orgmem_phone1+"', " +
		 		"orgmem_phone2='"+orgmem_phone2+"', " +
		 		"orgmem_phone3='"+orgmem_phone3+"', " +
		 		"orgmem_leader_code='"+orgmem_leader_code+"', " +
		 		"orgmem_email='"+orgmem_email+"', " +
		 		"orgmem_img='"+orgmem_img+"', " +
		 		"orgmem_seqNo='"+orgmem_seqNo+"', " +
		 		"orgmem_position_mba='"+orgmem_position_mba+"', " +
		 		"orgmem_major='"+orgmem_major+"', " +
		 		"orgmem_memberYn='"+orgmem_memberYn+"', " +
		 		"orgmem_lunar='"+orgmem_lunar+"', " +
		 		"orgmem_url='"+orgmem_url+"', " +
				
				"orgmem_department='"+orgmem_department+"', " +
				"orgmem_position='"+orgmem_position+"', " +
				"orgmem_area_work='"+orgmem_area_work+"', " +
				"orgmem_seqNum='"+orgmem_seqNum+"', " +
				"orgmem_admyear='"+orgmem_admyear+"', " +
				"orgmem_grdyear='"+orgmem_grdyear+"', " +
				"industry='"+industry+"', " +

		 		"create_id='"+create_id+"', " +
		 		"create_date=now(), " +
		 		"create_host='"+create_host+"'" +
		 		"where orgmem_no=" + request.param("no");
		 */
	 }
	 
	 console.log("sql:"+sql);
	 
	 db.query(sql, [], function(error, results){
		 if(error){
			 console.log(error);
		 }else{
				if(request.param("memberImg") == undefined && request.files.memberImg.name != "") {
					var orgpath = "";
					if(use_os_falg) {
						orgpath = path + "\/file\/member\/" + orgmem_img;		//파일업로드 경로
					} else {
						orgpath = path + "\\file\\member\\" + orgmem_img;		//파일업로드 경로
					}
					
					//파일을 동기적으로 사용(기본으로 비동기적)
					var data = fs.readFileSync(memberImg_path);
					fs.writeFileSync(orgpath, data); 
				}
				if(request.param("company_img1") == undefined && request.files.company_img1.name != "") {
					 
					var orgpath = "";
					if(use_os_falg) {
						orgpath = path + "\/file\/member\/" + company_img1;		//파일업로드 경로
					} else { 
						orgpath = path + "\\file\\member\\" + company_img1;		//파일업로드 경로
					}
					
					//파일을 동기적으로 사용(기본으로 비동기적)
					var data = fs.readFileSync(company_img1_path);
					fs.writeFileSync(orgpath, data); 
				}
				if(request.param("company_img2") == undefined && request.files.company_img2.name != "") {
					 
					var orgpath = "";
					if(use_os_falg) {
						orgpath = path + "\/file\/member\/" + company_img2;		//파일업로드 경로
					} else { 
						orgpath = path + "\\file\\member\\" + company_img2;		//파일업로드 경로
					}
					
					//파일을 동기적으로 사용(기본으로 비동기적)
					var data = fs.readFileSync(company_img2_path);
					fs.writeFileSync(orgpath, data); 
				}
				if(request.param("company_img3") == undefined && request.files.company_img3.name != "") {
					 
					var orgpath = "";
					if(use_os_falg) {
						orgpath = path + "\/file\/member\/" + company_img3;		//파일업로드 경로
					} else { 
						orgpath = path + "\\file\\member\\" + company_img3;		//파일업로드 경로
					}
					
					//파일을 동기적으로 사용(기본으로 비동기적)
					var data = fs.readFileSync(company_img3_path);
					fs.writeFileSync(orgpath, data); 
				}
				if(request.param("company_img4") == undefined && request.files.company_img4.name != "") {
					 
					var orgpath = "";
					if(use_os_falg) {
						orgpath = path + "\/file\/member\/" + company_img4;		//파일업로드 경로
					} else { 
						orgpath = path + "\\file\\member\\" + company_img4;		//파일업로드 경로
					}
					
					//파일을 동기적으로 사용(기본으로 비동기적)
					var data = fs.readFileSync(company_img4_path);
					fs.writeFileSync(orgpath, data); 
				}
				if(request.param("business_card") == undefined && request.files.business_card.name != "") {
					 
					var orgpath = "";
					if(use_os_falg) {
						orgpath = path + "\/file\/member\/" + business_card;		//파일업로드 경로
					} else { 
						orgpath = path + "\\file\\member\\" + business_card;		//파일업로드 경로
					}
					
					//파일을 동기적으로 사용(기본으로 비동기적)
					var data = fs.readFileSync(business_card_path);
					fs.writeFileSync(orgpath, data); 
				}
				if(request.param("company_intro") == undefined && request.files.company_intro.name != "") {
					 
					var orgpath = "";
					if(use_os_falg) {
						orgpath = path + "\/file\/member\/" + company_intro;		//파일업로드 경로
					} else { 
						orgpath = path + "\\file\\member\\" + company_intro;		//파일업로드 경로
					}
					
					//파일을 동기적으로 사용(기본으로 비동기적)
					var data = fs.readFileSync(company_intro_path);
					fs.writeFileSync(orgpath, data); 
				} 
			 
			 console.log(create_host);
			    //if(!use_os_falg) {
					response.writeHead(200, {
						'Content-type': 'text/html; charset=utf-8'
					});
			    //}
				response.end('<script>alert(\'저장되었습니다.\'); opener.document.writehtm.submit(); window.close();</script>');
		 }
	 });
};
