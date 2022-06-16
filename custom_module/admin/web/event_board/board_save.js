var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
require('date-utils');
var db = require("../../../DB_config.js").connect;
var express = require('express');
var osModule = require('os');
var session = require("../../../../function/session.js");
var androidPush = require("../../../../function/android_push.js");
var iosPush = require("../../../../function/ios_push.js");
var smsSend = require("../../../../function/sms_send.js");

exports.listener=function(request, response){
	var use_os_falg = false;
	if(osModule.type()=='Linux') use_os_falg = true;
	var table = "event_board";
	var file_table = "event_files";
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
	var mode = request.param("mode");
	var filesArray = [];
	
	var connectorNo = session.connectorNo(request);
	var connectorName = session.connectorName(request);
	var connectorPhone = session.connectorPhone(request);
	var connectorImage = session.connectorImage(request);
	
	var brd_id =  "event";
	var brd_title =  request.param("brdTitle")  == undefined ? "" : request.param("brdTitle");
	var brd_content =  request.param("brdContent") == undefined ? "" : request.param("brdContent");
	var brdPushYn =  request.param("brdPushYn") == undefined ? "" : request.param("brdPushYn");
	var brdPushYn_result =  request.param("brdPushYn_result") == undefined ? "" : request.param("brdPushYn_result");
	var smsYn =  request.param("smsYn") == undefined ? "" : request.param("smsYn");
	var smsYn_result =  request.param("smsYn_result") == undefined ? "" : request.param("smsYn_result");
	var orgmem_seqNo =  request.param("orgmem_seqNo") == undefined ? "" : request.param("orgmem_seqNo");
	var sms_sender =  request.param("sms_sender") == undefined ? "" : request.param("sms_sender");
	var sort = request.param("sort");	
	var brd_create_id = request.session.ad_id;
	var board_no = "";
	var brd_create_date = "";
	var brd_create_host = request.connection.remoteAddress;
	var sql= "";
	var file_sql="";
	var select_sql = "";
	var ios_push_url = "";
	/* 2019. 12. 3 KWS*/
	var board_startdate =  request.param("boardStartdate")  == undefined ? "" : request.param("boardStartdate");
	var board_enddate =  request.param("boardEnddate")  == undefined ? "" : request.param("boardEnddate");
	var board_eventsdate =  request.param("boardEventsdate")  == undefined ? "" : request.param("boardEventsdate");
	var board_eventedate =  request.param("boardEventedate")  == undefined ? "" : request.param("boardEventedate");

	var board_eventstime =  request.param("boardEventstime")  == undefined ? "" : request.param("boardEventstime");
	var board_eventetime =  request.param("boardEventetime")  == undefined ? "" : request.param("boardEventetime");

	var board_address =  request.param("boardAddress")  == undefined ? "" : request.param("boardAddress");
	var board_address_detail =  request.param("boardAddress_detail")  == undefined ? "" : request.param("boardAddress_detail");
	var board_xgps =  request.param("boardXgps")  == undefined ? "" : request.param("boardXgps");
	var board_ygps =  request.param("boardYgps")  == undefined ? "" : request.param("boardYgps");
	/* 2019. 12. 3 KWS*/

	
	if(request.files.brdFileImg != undefined){
		for(var i = 0; i < request.files.brdFileImg.length; i++){ 
			if(request.files.brdFileImg[i].name != ""){
				var tempObj = {};
				tempObj.originalFilename = request.files.brdFileImg[i].name;
				tempObj.path = request.files.brdFileImg[i].path;
				filesArray.push(tempObj);
			}
		}
	}
	
	if(mode=="write"){
		sql = "insert into "+table+"(" +
				"board_id, board_title, board_content, board_startdate, board_enddate, board_eventsdate, board_eventedate, board_eventstime, board_eventetime, board_address, board_address_detail, board_xgps, board_ygps," +
				"sort, create_id, create_date, create_host) " +
				"values('" + brd_id + 
				"', '" + brd_title + 
				"', '" + brd_content + 
				"', '" + board_startdate + 
				"', '" + board_enddate + 
				"', '" + board_eventsdate + 
				"', '" + board_eventedate + 
				"', '" + board_eventstime + 
				"', '" + board_eventetime + 
				"', '" + board_address + 
				"', '" + board_address_detail + 
				"', '" + board_xgps + 
				"', '" + board_ygps + 
				"', '" + sort + 
				"', '" + brd_create_id + 
				"', now(), '" + brd_create_host + "')";
		query();
		
	}else {
		board_no = request.param("number");
		sql = "update "+table+ " set board_id ='" + brd_id +
			"', board_title ='" + brd_title + 
			"', board_content = '" + brd_content + 

			"', board_startdate = '" + board_startdate + 
			"', board_enddate = '" + board_enddate + 
			"', board_eventsdate = '" + board_eventsdate + 
			"', board_eventedate = '" + board_eventedate + 
			"', board_eventstime = '" + board_eventstime + 
			"', board_eventetime = '" + board_eventetime + 
			"', board_address = '" + board_address + 
			"', board_address_detail = '" + board_address_detail + 
			"', board_xgps = '" + board_xgps + 
			"', board_ygps = '" + board_ygps + 

			"', sort = '" + sort + 
			"', update_id ='" + brd_create_id + 
			"', update_date = now(), update_host = '" + brd_create_host + "' where board_no = " + board_no;
		
		query();
	}
	
	function query() {
		
		async.series({
			 first : function(callback){
				db.query(sql, function(error, results){
					if(error){
						response.send("fail");
						console.log("admin/web/board_save/error=====", sql);
					}else{
						if(mode == "write"){
							select_sql = "select max(board_no) as brd_no from "+table+"";
							
							db.query(select_sql, function(error, brd_no){
								if(error){
									response.send("fail");
								}else{
									//push알림 체크일 경우
									if(brdPushYn_result == "Y"){
										// var push_sql = "select key_num, type, popup_yn, phone_num from push where phone_num != ? and popup_yn = 'y' ";
										var push_sql = "select a.orgmem_phone, b.type, b.key_num, b.popup_yn \n";
										push_sql += "from \n";
										push_sql += "( \n";
											push_sql += "select \n";
											push_sql += "orgmem_seqNo, concat( replace(ifnull(orgmem_phone1, ''), '-', ''), replace(ifnull(orgmem_phone2, ''), '-', ''), replace(ifnull(orgmem_phone3, ''), '-', '') ) as orgmem_phone \n";
											push_sql += "from orgmember \n";
											push_sql += "where 1=1 \n";
											if(orgmem_seqNo!="" && orgmem_seqNo!="all") {
												push_sql += "and 	orgmem_seqNo = '"+orgmem_seqNo+"' \n";
											} else if(orgmem_seqNo=="") {
												push_sql += "and 	orgmem_seqNo = '999' \n";
											}
										push_sql += ") as a left outer join push b on a.orgmem_phone = replace(b.phone_num, '-', '')";
										console.log("event_board push_sql ::::::" + push_sql);
										db.query(push_sql, connectorPhone, function(error, results2){
											
											if(error){
												console.log(push_sql);
											}
											
											if(results2.length > 0){
												
												for(var i = 0; i < results2.length; i++){
													
													if(results2[i].type == "android"){
														console.log("results2[i].type == " + results2[i].type + " >> 안드로이드 >> " + results2[i].phone_num);
														androidPush.push("event", results2[i].key_num, connectorName, brd_title, connectorNo, brd_no[0].brd_no, "", results2[i].popup_yn);
													} else if(results2[i].type == "ios"){
														console.log("results2[i].type == " + results2[i].type + " >> IOS");
														ios_push_url = "/event_board_view?brd_no=" + brd_no[0].brd_no;
														iosPush.push("event", results2[i].key_num, connectorName, brd_title, connectorNo, brd_no[0].brd_no, "", results2[i].popup_yn);
													} else {
														if(smsYn_result == "Y") { // 문자알림이 설정되어 있으면
															//console.log("results2[i].type == " + results2[i].type + " >> SMS >> " + results2[i].orgmem_phone);
															//smsSend.send(results2[i].orgmem_phone, sms_sender, brd_title);
														}
													}
												}
											}
										});
									}
									
									board_no = brd_no[0].brd_no;
									callback(null, null);
								}
							});
						}else{
							callback(null, null);
						}
					}
				});				 
			 },
			 second : function(callback){
				 file(); 
				 callback(null, null);
			 }
		 }, function(error, result){
			/*response.writeHead({
				'Content-type': 'text/html; charset=utf-8'
			});*/
			
			response.writeHead(200, {									// 실서버용
				'Content-type': 'text/html; charset=utf-8'
			});
			
			response.end('<script>opener.document.boardForm.submit(); window.close();</script>');
		 });			
	}	
	
	function file() {
		if(filesArray.length > 0) {
			var filename = [];
			var extensionIndex = [];
			var extension = [];
			var file_name = [];
			var file_dtname = [];
			var file_path = [];
			
			var count = 0;
			for(var i = 0; i < filesArray.length; i++) {
				file_name.push(filesArray[i].originalFilename);									//기존 파일이름
				extensionIndex[i] = file_name[i].lastIndexOf('.');
				extension[i] = file_name[i].substring(extensionIndex[i], file_name[i].length);	//파일확장자
				file_dtname[i] = day+ "(" + i + ")" + extension[i];
				//file_path.push(path + "\\file\\"+table+"\\" + file_dtname[i]);
				file_path.push(path + "\/file\/"+table+"\/" + file_dtname[i]);		//실서버용
			
				var orgpath = ""; 

				orgpath = file_path[i];		//파일업로드 경로
				
				if(orgpath) {
					//파일을 동기적으로 사용(기본으로 비동기적)
					var data = fs.readFileSync(filesArray[i].path);
					fs.writeFileSync(file_path[i], data); 
				} else {
					response.send("fail");
				}

				file_sql = "insert into "+file_table+"(" +
				"board_no, board_id, file_name, file_dtname, file_path)" +
				"values('" + board_no +  
				"', '" + brd_id + 
				"', '" + file_name[i] + 
				"', '" + file_dtname[i] + 
				"', '" + file_path[i] + "')";

				console.log(file_sql);
				
				db.query(file_sql, function(error, results){
					if(error){
						console.log("admin/web/board_save/file/error===", file_sql);
						response.send("fail");
					} 
				});
			} 
		}  
	}
	
};

