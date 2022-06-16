/**
 * New node file
 */

var nodeExcel = require('excel-export');

var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
//app.get('/Excel', function(req, res){

	var orgmem_seqNo = request.param("orgmem_seqNo")==undefined ? "" : request.param("orgmem_seqNo");
	var search_seqNo = request.param("search_seqNo")==undefined ? "" : request.param("search_seqNo");
	var search_major = request.param("search_major")==undefined ? "" : request.param("search_major");
	var search_area = request.param("search_area")==undefined ? "" : request.param("search_area");
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	var order_type = request.param("order_type")==undefined ? "no" : request.param("order_type");
	var search_admyear = request.param("search_admyear")==undefined ? "" : request.param("search_admyear");
	var sql = "";	
	

	
    var conf ={};   
    
    conf.cols = [{
        caption:'번호',
        type:'number',
        width:8
    },{
        caption:'이름',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
             return cellData.toUpperCase();
        }
        , width:12
    },{
    	caption:'기수',
    	captionStyleIndex: 1,        
    	type:'string',
    	beforeCellWrite:function(row, cellData){
    		return cellData.toUpperCase();
    	}
    	, width:12
    },{
    	caption:'지역',
    	captionStyleIndex: 1,        
    	type:'string',
    	beforeCellWrite:function(row, cellData){
    		return cellData.toUpperCase();
    	}
    	, width:12
    },{
    	caption:'전공',
    	captionStyleIndex: 1,        
    	type:'string',
    	beforeCellWrite:function(row, cellData){
    		return cellData.toUpperCase();
    	}
    	, width:12
    },{
    	caption:'상세전공',
    	captionStyleIndex: 1,        
    	type:'string',
    	beforeCellWrite:function(row, cellData){
    		return cellData.toUpperCase();
    	}
    	, width:12
    },{
    	caption:'휴대번호',
    	captionStyleIndex: 1,        
    	type:'string',
    	beforeCellWrite:function(row, cellData){
    		return cellData.toUpperCase();
    	}
    	, width:15
    },{
    	caption:'이메일',
    	captionStyleIndex: 1,        
    	type:'string'/*,
    	beforeCellWrite:function(row, cellData){
    		return cellData.toUpperCase();
    	}*/
    , width:15
    },{
    	caption:'직종',
    	captionStyleIndex: 1,        
    	type:'string',
    	beforeCellWrite:function(row, cellData){
    		return cellData.toUpperCase();
    	}
    	, width:12
    },{
    	caption:'근무지명',
    	captionStyleIndex: 1,        
    	type:'string'/*,
    	beforeCellWrite:function(row, cellData){
    		return cellData.toUpperCase();
    	}*/
    	, width:30
    },{
    	caption:'근무지(우편번호)',
    	captionStyleIndex: 1,        
    	type:'string'/*,
    	beforeCellWrite:function(row, cellData){
    		return cellData.toUpperCase();
    	}*/
    , width:30
    },{
    	caption:'근무지 주소',
    	captionStyleIndex: 1,        
    	type:'string'/*,
    	beforeCellWrite:function(row, cellData){
    		return cellData.toUpperCase();
    	}*/
    , width:30
    },{
    	caption:'근무지 상세주소',
    	captionStyleIndex: 1,        
    	type:'string'/*,
    	beforeCellWrite:function(row, cellData){
    		return cellData.toUpperCase();
    	}*/
    , width:30
    },{
    	caption:'부서',
    	captionStyleIndex: 1,        
    	type:'string'/*,
    	beforeCellWrite:function(row, cellData){
    		return cellData.toUpperCase();
    	}*/
    	, width:12
    },{
    	caption:'직위',
    	captionStyleIndex: 1,        
    	type:'string'/*,
    	beforeCellWrite:function(row, cellData){
    		return cellData.toUpperCase();
    	}*/
    	, width:12
    }/*,{
    	caption:'현주소(거주지)',
    	captionStyleIndex: 1,        
    	type:'string',
    	beforeCellWrite:function(row, cellData){
    		return cellData.toUpperCase();
    	}
    	, width:35
    }*/
	];

    sql = "select	\n"+
		" @RNUM := @RNUM +1 as num, \n" +
			" orgmem_no,	\n" +
			" orgmem_name,	\n" +
			" orgmem_birth_year,	\n" +
			" orgmem_work_duty,	\n" +
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
			
			" orgmem_department,	\n" +
			" orgmem_position,	\n" +
			" orgmem_area_work,	\n" +
			" orgmem_seqNum,	\n" +
			" orgmem_admyear,	\n" +
			" orgmem_grdyear,	\n" +
			" industry,	\n" +

			" (select org_seqNo from org_seq where org_no = orgmem_seqNo) as org_leader, \n" + 
			" (select org_seqYear from org_seq where org_no = orgmem_seqNo) as org_leader_day, \n" + 
			" orgmem_keyword,	\n" +
			" ifnull(getCodeName('orgmem_major',orgmem_major),'') as orgmem_major,	\n" +
			" ifnull(orgmem_major_txt, '') as orgmem_major_txt,	\n" +
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
			" from orgmember , (SELECT @RNUM := 0 ) r \r";
	sql += " where \n";
	sql += " 1=1 \n";
	
	/*
	if(orgmem_seqNo == ''){
		sql += " and orgmem_seqNo != '00' \n";
	}else if(orgmem_seqNo != ''){
		if(orgmem_seqNo == 'moreData'){
			sql += " and cast( getOrgSeqNo(orgmem_seqNo) as signed) between 1 and 28\n"; //28기이전 데이터 조회
		}else{
			sql += " and orgmem_seqNo = '" + orgmem_seqNo + "' \n"; //선택기수 조회
		}
	}
    */
	
	sql += " and orgmem_seqNo != '-1' \n";
	
	if(search_seqNo != ''){
		sql += " and orgmem_seqNo = '" + search_seqNo +"' \n";
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
	 
	 if(order_type=='no'){
		 sql += "order by orgmem_no desc ";
	 }else if(order_type=='name'){
		 sql += "order by orgmem_name asc ";
	 }
	
	console.log(sql);
	
	db.query(sql, function(error, results){
		 if(error){
			 //response.send(error);
		 }else{
			var arr = [];
			
			for(i=0; i<results.length; i++){
				var resultData=[
					i+1
					, results[i].orgmem_name // 이름
					, results[i].orgmem_seqNm // 기수
					, results[i].orgmem_area // 지역
					, results[i].orgmem_major // 전공
					, results[i].orgmem_major_txt // 상세전공
					, results[i].orgmem_phone1 +"-"+ results[i].orgmem_phone2 +"-"+ results[i].orgmem_phone3 // 휴대번호
					, results[i].orgmem_email // 이메일
					, results[i].industry // 직종
					, results[i].orgmem_office_nm // 근무지명
					, results[i].orgmem_office_addr_zipcode // 근무지 우편번호
					, results[i].orgmem_office_addr1 // 근무지 주소
					, results[i].orgmem_office_addr2 // 근무지 상세주소
					, results[i].orgmem_department // 부서
					, results[i].orgmem_position // 직위
					//, results[i].orgmem_address_home // 현주소(거주지)
				];
			
				arr.push(resultData);
			}
			
			conf.rows = arr;
			
			var result = nodeExcel.execute(conf);

		    response.setHeader('Content-Type', 'application/vnd.openxmlformats');

		    response.setHeader("Content-Disposition", "attachment; filename=" + "excel_export.xlsx");

		    response.end(result, 'binary');
		 }		 
		 
	});
}