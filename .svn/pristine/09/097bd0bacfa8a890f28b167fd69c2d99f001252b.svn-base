var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../../../DB_config.js").connect;
var page_navi = require("../../../../function/person_page_navi.js");
var layout = require("../../../../function/layout.js");
var nodeExcel = require('excel-export'); //빼면 된다.

exports.listener =  function(request, response){
	var type = request.param("type");

	var tr_sendstat = request.param("tr_sendstat");
	var status = request.param("status");

	var st_date = request.param("st_date");
	var ed_date = request.param("ed_date");

	var chd_st_date = request.param("chd_st_date");
	var chd_ed_date = request.param("chd_ed_date");

	var conf ={};   
	conf.cols = [{
		caption:'문자제목',
		captionStyleIndex: 1,        
		type:'string',
		beforeCellWrite:function(row, cellData){
			return cellData.toUpperCase();
		}
	, width:70
	},{
		caption:'전화번호',
		captionStyleIndex: 1,        
		type:'string',
		beforeCellWrite:function(row, cellData){
			return cellData.toUpperCase();
		}
	, width:15
	},{
		caption:'기수',
		captionStyleIndex: 1,        
		type:'string',
		beforeCellWrite:function(row, cellData){
			return cellData.toUpperCase();
		}
	, width:8
	},{
		caption:'이름',
		captionStyleIndex: 1,        
		type:'string',
		beforeCellWrite:function(row, cellData){
			return cellData.toUpperCase();
		}
	, width:12
	},{
		caption:'발송상태',
		captionStyleIndex: 1,        
		type:'string',
		beforeCellWrite:function(row, cellData){
			return cellData.toUpperCase();
		}
	, width:10
	},{
		caption:'발송날짜',
		captionStyleIndex: 1,        
		type:'string',
		beforeCellWrite:function(row, cellData){
			return cellData.toUpperCase();
		}
	, width:25
	},{
		caption:'구분',
		captionStyleIndex: 1,        
		type:'string',
		beforeCellWrite:function(row, cellData){
			return cellData.toUpperCase();
		}
	, width:10
	}];

	if(request.method == "GET"){
		fs.readFile("./views/admin/web/ums/ums_result.html","utf-8", function(error, data) {
			response.send(ejs.render(layout.include("web_admin_popup", data), {
			}));
		});
	}else{
		var unionMMS = "";
		var unionSC = "";

		sdate = parseInt(chd_st_date);
		edate = parseInt(chd_ed_date);

		for(i=sdate+1;i<=edate;i++){
			unionSC += "UNION ALL select a.TR_MSG, a.TR_PHONE, a.TR_SENDSTAT, date_format(a.TR_SENDDATE, '%Y-%m-%d %T %p') as TR_SENDDATE , ifnull(b.orgmem_name, '') as orgmem_name, 0 as file_cnt_real, \n" +
							"ifnull((select org_seqNo from org_seq where org_no = b.orgmem_seqNo), '') as orgmem_seqNo \n" +
							"from flash21_ums.SC_LOG_"+i+" a left outer join orgmember b \n" +
							"on a.TR_PHONE = concat(b.orgmem_phone1, b.orgmem_phone2, b.orgmem_phone3) \n" +
							"where date_format(TR_SENDDATE, '%Y-%m-%d') >= '"+st_date+"' \n" +
							"and date_format(TR_SENDDATE, '%Y-%m-%d') <= '"+ed_date+"' \n" +
							"and a.TR_ETC1 = 'daegong' \n"
							if(tr_sendstat != "all"){
								unionSC += "and TR_SENDSTAT = '"+tr_sendstat+"' \n"
							}
			
							if(i == edate){
								unionSC += "order by TR_SENDDATE desc \n"
							}
			
			unionMMS += "UNION ALL select a.SUBJECT, a.MSG, a.PHONE, a.STATUS, date_format(a.REQDATE, '%Y-%m-%d %T %p') as REQDATE, ifnull(b.orgmem_name, '') as orgmem_name, a.file_cnt_real, \n" +
							"ifnull((select org_seqNo from org_seq where org_no = b.orgmem_seqNo), '') as orgmem_seqNo \n" +
							"from flash21_ums.MMS_LOG_"+i+" a left outer join orgmember b \n" +
							"on a.PHONE = concat(b.orgmem_phone1, b.orgmem_phone2, b.orgmem_phone3) \n" +
							"where date_format(REQDATE, '%Y-%m-%d') >= '"+st_date+"' \n" +
							"and date_format(REQDATE, '%Y-%m-%d') <= '"+ed_date+"' \n" +
							"and a.ETC1 = 'daegong' \n"
							if(status != "all"){
								unionMMS += "and STATUS = '"+status+"'  \n"
							}
							
							if(i == edate){
								unionMMS += "order by REQDATE desc \n"
							}
		}
		
		if(request.session.admin_yn=='Y'){
			qry = "";
			qry2 = "";
			if(unionMMS == "" || unionSC == ""){
				if(type == "all"){
					qry += "select a.TR_MSG, a.TR_PHONE, a.TR_SENDSTAT, date_format(a.TR_SENDDATE, '%Y-%m-%d %T %p') as TR_SENDDATE , ifnull(b.orgmem_name, '') as orgmem_name, 0 as file_cnt_real, \n" +
								"ifnull((select org_seqNo from org_seq where org_no = b.orgmem_seqNo), '') as orgmem_seqNo \n" +
								"from flash21_ums.SC_LOG_"+chd_st_date+" a left outer join orgmember b \n" +
								"on a.TR_PHONE = concat(b.orgmem_phone1, b.orgmem_phone2, b.orgmem_phone3) \n" +
								"where date_format(TR_SENDDATE, '%Y-%m-%d') >= '"+st_date+"' \n" +
								"and date_format(TR_SENDDATE, '%Y-%m-%d') <= '"+ed_date+"' \n" +
								"and a.TR_ETC1 = 'daegong' \n" +
								"order by TR_SENDDATE desc \n"
					
					qry2 +=	"select a.SUBJECT, a.MSG, a.PHONE, a.STATUS, date_format(a.REQDATE, '%Y-%m-%d %T %p') as REQDATE, ifnull(b.orgmem_name, '') as orgmem_name, a.file_cnt_real, \n" +
								"ifnull((select org_seqNo from org_seq where org_no = b.orgmem_seqNo), '') as orgmem_seqNo \n" +
								"from flash21_ums.MMS_LOG_"+chd_st_date+" a left outer join orgmember b \n" +
								"on a.PHONE = concat(b.orgmem_phone1, b.orgmem_phone2, b.orgmem_phone3) \n" +
								"where date_format(REQDATE, '%Y-%m-%d') >= '"+st_date+"' \n" +
								"and date_format(REQDATE, '%Y-%m-%d') <= '"+ed_date+"' \n" +
								"and a.ETC1 = 'daegong' \n" +
								"order by REQDATE desc \n"
				}else if(type == "sms"){
					qry += "select a.TR_MSG, a.TR_PHONE, a.TR_SENDSTAT, date_format(a.TR_SENDDATE, '%Y-%m-%d %T %p') as TR_SENDDATE, ifnull(b.orgmem_name, '') as orgmem_name, 0 as file_cnt_real, \n" +
								"ifnull((select org_seqNo from org_seq where org_no = b.orgmem_seqNo), '') as orgmem_seqNo \n" +
								"from flash21_ums.SC_LOG_"+chd_st_date+" a left outer join orgmember b \n" +
								"on a.TR_PHONE = concat(b.orgmem_phone1, b.orgmem_phone2, b.orgmem_phone3) \n" +
								"where date_format(TR_SENDDATE, '%Y-%m-%d') >= '"+st_date+"' \n" +
								"and date_format(TR_SENDDATE, '%Y-%m-%d') <= '"+ed_date+"' \n" +
								"and a.TR_ETC1 = 'daegong' \n"
								if(tr_sendstat != "all"){
									qry += "and TR_SENDSTAT = '"+tr_sendstat+"' \n"
								}
								qry += "order by TR_SENDDATE desc \n"
				}else if(type == "lms"){
					qry +=	"select a.SUBJECT, a.MSG, a.PHONE, a.STATUS, date_format(a.REQDATE, '%Y-%m-%d %T %p') as REQDATE, ifnull(b.orgmem_name, '') as orgmem_name, a.file_cnt_real, \n" +
								"ifnull((select org_seqNo from org_seq where org_no = b.orgmem_seqNo), '') as orgmem_seqNo \n" +
								"from flash21_ums.MMS_LOG_"+chd_st_date+" a left outer join orgmember b \n" +
								"on a.PHONE = concat(b.orgmem_phone1, b.orgmem_phone2, b.orgmem_phone3) \n" +
								"where date_format(REQDATE, '%Y-%m-%d') >= '"+st_date+"' \n" +
								"and date_format(REQDATE, '%Y-%m-%d') <= '"+ed_date+"' \n" +
								"and a.file_cnt_real = 0 \n" +
								"and a.ETC1 = 'daegong' \n"
								if(status != "all"){
									qry += "and STATUS = '"+status+"'  \n"
								}
								qry += "order by REQDATE desc \n"
				}else if(type == "mms"){
					qry +=	"select a.SUBJECT, a.MSG, a.PHONE, a.STATUS, date_format(a.REQDATE, '%Y-%m-%d %T %p') as REQDATE, ifnull(b.orgmem_name, '') as orgmem_name, a.file_cnt_real, \n" +
								"ifnull((select org_seqNo from org_seq where org_no = b.orgmem_seqNo), '') as orgmem_seqNo \n" +
								"from flash21_ums.MMS_LOG_"+chd_st_date+" a left outer join orgmember b \n" +
								"on a.PHONE = concat(b.orgmem_phone1, b.orgmem_phone2, b.orgmem_phone3) \n" +
								"where date_format(REQDATE, '%Y-%m-%d') >= '"+st_date+"' \n" +
								"and date_format(REQDATE, '%Y-%m-%d') <= '"+ed_date+"' \n" +
								"and a.file_cnt_real > 0 \n" +
								"and a.ETC1 = 'daegong' \n"
								if(status != "all"){
									qry += "and STATUS = '"+status+"'  \n"
								}
								qry += "order by REQDATE desc \n"
				}
			}else{
				if(type == "all"){
					qry += "select a.TR_MSG, a.TR_PHONE, a.TR_SENDSTAT, date_format(a.TR_SENDDATE, '%Y-%m-%d %T %p') as TR_SENDDATE, ifnull(b.orgmem_name, '') as orgmem_name, 0 as file_cnt_real, \n" +
								"ifnull((select org_seqNo from org_seq where org_no = b.orgmem_seqNo), '') as orgmem_seqNo \n" +
								"from flash21_ums.SC_LOG_"+chd_st_date+" a left outer join orgmember b \n" +
								"on a.TR_PHONE = concat(b.orgmem_phone1, b.orgmem_phone2, b.orgmem_phone3) \n" +
								"where date_format(TR_SENDDATE, '%Y-%m-%d') >= '"+st_date+"' \n" +
								"and date_format(TR_SENDDATE, '%Y-%m-%d') <= '"+ed_date+"' \n" +
								"and a.TR_ETC1 = 'daegong' \n" +
								""+unionSC+"  \n"
					
					qry2 +=	"select a.SUBJECT, a.MSG, a.PHONE, a.STATUS, date_format(a.REQDATE, '%Y-%m-%d %T %p') as REQDATE, ifnull(b.orgmem_name, '') as orgmem_name, a.file_cnt_real, \n" +
								"ifnull((select org_seqNo from org_seq where org_no = b.orgmem_seqNo), '') as orgmem_seqNo \n" +
								"from flash21_ums.MMS_LOG_"+chd_st_date+" a left outer join orgmember b \n" +
								"on a.PHONE = concat(b.orgmem_phone1, b.orgmem_phone2, b.orgmem_phone3) \n" +
								"where date_format(REQDATE, '%Y-%m-%d') >= '"+st_date+"' \n" +
								"and date_format(REQDATE, '%Y-%m-%d') <= '"+ed_date+"' \n" +
								"and a.ETC1 = 'daegong' \n" +
								""+unionMMS+"  \n"
				}else if(type == "sms"){
					qry += "select a.TR_MSG, a.TR_PHONE, a.TR_SENDSTAT, date_format(a.TR_SENDDATE, '%Y-%m-%d %T %p') as TR_SENDDATE, ifnull(b.orgmem_name, '') as orgmem_name, 0 as file_cnt_real, \n" +
								"ifnull((select org_seqNo from org_seq where org_no = b.orgmem_seqNo), '') as orgmem_seqNo \n" +
								"from flash21_ums.SC_LOG_"+chd_st_date+" a left outer join orgmember b \n" +
								"on a.TR_PHONE = concat(b.orgmem_phone1, b.orgmem_phone2, b.orgmem_phone3) \n" +
								"where date_format(TR_SENDDATE, '%Y-%m-%d') >= '"+st_date+"' \n" +
								"and date_format(TR_SENDDATE, '%Y-%m-%d') <= '"+ed_date+"' \n" +
								"and a.TR_ETC1 = 'daegong' \n"
								if(tr_sendstat != "all"){
									qry += "and TR_SENDSTAT = '"+tr_sendstat+"' \n"
								}
								qry += ""+unionSC+" \n"
				}else if(type == "lms"){
					qry += "select a.SUBJECT, a.MSG, a.PHONE, a.STATUS, date_format(a.REQDATE, '%Y-%m-%d %T %p') as REQDATE, ifnull(b.orgmem_name, '') as orgmem_name, a.file_cnt_real, \n" +
								"ifnull((select org_seqNo from org_seq where org_no = b.orgmem_seqNo), '') as orgmem_seqNo \n" +
								"from flash21_ums.MMS_LOG_"+chd_st_date+" a left outer join orgmember b \n" +
								"on a.PHONE = concat(b.orgmem_phone1, b.orgmem_phone2, b.orgmem_phone3) \n" +
								"where date_format(REQDATE, '%Y-%m-%d') >= '"+st_date+"' \n" +
								"and date_format(REQDATE, '%Y-%m-%d') <= '"+ed_date+"' \n" +
								"and a.file_cnt_real = 0 \n" +
								"and a.ETC1 = 'daegong' \n"
								if(status != "all"){
									qry += "and STATUS = '"+status+"' \n";
								}
								qry += ""+unionMMS+" \n"
				}else if(type == "mms"){
					qry += "select a.SUBJECT, a.MSG, a.PHONE, a.STATUS, date_format(a.REQDATE, '%Y-%m-%d %T %p') as REQDATE, ifnull(b.orgmem_name, '') as orgmem_name, a.file_cnt_real, \n" +
								"ifnull((select org_seqNo from org_seq where org_no = b.orgmem_seqNo), '') as orgmem_seqNo \n" +
								"from flash21_ums.MMS_LOG_"+chd_st_date+" a left outer join orgmember b \n" +
								"on a.PHONE = concat(b.orgmem_phone1, b.orgmem_phone2, b.orgmem_phone3) \n" +
								"where date_format(REQDATE, '%Y-%m-%d') >= '"+st_date+"' \n" +
								"and date_format(REQDATE, '%Y-%m-%d') <= '"+ed_date+"' \n" +
								"and a.file_cnt_real > 0 \n" +
								"and a.ETC1 = 'daegong' \n"
								if(status != "all"){
									qry += "and STATUS = '"+status+"' \n";
								}
								qry += ""+unionMMS+" \n"
				}
			}
			console.log(qry);
			console.log(qry2);

			db.query(qry, function(error, result){
				if(error){
					response.send(error);
				}else{
					var arr = [];
					if(qry2 != ""){
						db.query(qry2, function(error, result2){
							var subject = "";
							var phone = "";
							var flag = "";
							var name = "";
							var status = "";
							var sendDate = "";
							var type = "";
							
							for(i=0; i<result.length; i++){
								subject = result[i].TR_MSG;
								phone = result[i].TR_PHONE;
								flag = result[i].orgmem_seqNo;
								name = result[i].orgmem_name;
								status = result[i].TR_SENDSTAT;
								sendDate = result[i].TR_SENDDATE;
								type = "SMS";
								
								a=[subject, phone, flag, name, status, sendDate, type];
								arr.push(a);
							}
							
							for(i=0; i<result2.length; i++){
								subject = result2[i].SUBJECT;
								phone = result2[i].PHONE;
								flag = result2[i].orgmem_seqNo;
								name = result2[i].orgmem_name;
								status = result2[i].STATUS;
								sendDate = result2[i].REQDATE;
								if(result2[i].file_cnt_real > 0) {
									type = "MMS";
								} else {
									type = "LMS";
								}
								
								a=[subject, phone, flag, name, status, sendDate, type];
								arr.push(a);
							}
							conf.rows = arr;
							var result3 = nodeExcel.execute(conf);
							response.setHeader('Content-Type', 'application/vnd.openxmlformats');
							response.setHeader("Content-Disposition", "attachment; filename=" + "excel_export.xlsx");
							response.end(result3, 'binary');
						});
					}else{
						var type = request.param("type");
						
						if(type == "sms"){
							var subject = "";
							var phone = "";
							var flag = "";
							var name = "";
							var status = "";
							var sendDate = "";
							var type = "";
							
							for(i=0; i<result.length; i++){
								subject = result[i].TR_MSG;
								phone = result[i].TR_PHONE;
								flag = result[i].orgmem_seqNo;
								name = result[i].orgmem_name;
								status = result[i].TR_SENDSTAT;
								sendDate = result[i].TR_SENDDATE;
								type = "SMS";
								
								a=[subject, phone, flag, name, status, sendDate, type];
								arr.push(a);
							}
						}else{
							var subject = "";
							var phone = "";
							var flag = "";
							var name = "";
							var status = "";
							var sendDate = "";
							var type = "";
							
							for(i=0; i<result.length; i++){
								subject = result[i].SUBJECT;
								phone = result[i].PHONE;
								flag = result[i].orgmem_seqNo;
								name = result[i].orgmem_name;
								status = result[i].STATUS;
								sendDate = result[i].REQDATE;
								if(result[i].file_cnt_real > 0) {
									type = "MMS";
								} else {
									type = "LMS";
								}
								
								a=[subject, phone, flag, name, status, sendDate, type];
								arr.push(a);
							}
						}
						conf.rows = arr;
						var result3 = nodeExcel.execute(conf);
						response.setHeader('Content-Type', 'application/vnd.openxmlformats');
						response.setHeader("Content-Disposition", "attachment; filename=" + "excel_export.xlsx");
						response.end(result3, 'binary');
					}
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
	}
}


