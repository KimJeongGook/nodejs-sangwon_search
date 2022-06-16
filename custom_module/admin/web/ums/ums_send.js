var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var http = require('http');
var imageType = require('image-type');
var db = require("../../../DB_config.js").connect;
var page_navi = require("../../../../function/person_page_navi.js");
var layout = require("../../../../function/layout.js");
var osModule = require('os');
require('date-utils');

exports.listener =  function(request, response){
	var use_os_falg = false;
	if(osModule.type()=='Linux') use_os_falg = true;
	
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
	
	var ums_key = "daegong";
	var create_id = request.session.ad_id;
	var wrk_ip = request.connection.remoteAddress;
	var sender_number =  request.param("repre_numberID") == undefined ? "" : request.param("repre_numberID"); // 발신번호
	var title =  request.param("title") == undefined ? "" : request.param("title").replace(/\'/g,'"'); // 제목
	var ums_msg =  request.param("ums_msg") == undefined ? "" : request.param("ums_msg").replace(/\'/g,'"'); // 내용
	var tonumberzone_id =  request.param("tonumberzone_id") == undefined ? "" : request.param("tonumberzone_id"); // 수신자목록(구분자는 ,)
	var tonumberzone_value =  request.param("tonumberzone_value") == undefined ? "" : request.param("tonumberzone_value"); // 수신자목록(구분자는 ,)

	// 내용의 길이를 구한다.
	var msg_Length = 0;
	msg_Length = (function(s,b,i,c){
		for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
		return b
	})(ums_msg);

	console.log("sender_number == " + sender_number);
	console.log("title == " + title);
	console.log("msg_Length == " + msg_Length);
	console.log("ums_msg == " + ums_msg);
	console.log("tonumberzone_value == " + tonumberzone_value);

	var tonumberzone_array;
	tonumberzone_array = tonumberzone_value.split(",");
	var result_num = 0;
	var result_flag = false;
	var result_msg = "";
	var result_cnt = 0;
	var error_cnt = 0;
	var success_cnt = 0;
	var ums_type;
	var sql = "";
	var stats = "";
	
	var file_write_result_path = "";
	var imageFlag = false;
	
	async.series({
		one : function(callback){
			// 첨부파일이 존재할시 서버에 저장한다.	
			var filename = "";
			var extensionIndex = "";
			var extension = "";
			var file_name = "";
			var file_dtname = "";
			var file_path = "";
			var file_path_change = "";
			var ums_file = "";
			
			var file_write_result = false;
			
			if(request.files.ums_file1 != null && request.files.ums_file1 != 'undefined') {
				console.log("request.files.ums_file1 == " + request.files.ums_file1);
				
				file_name = request.files.ums_file1.name; // 파일명
				file_path = request.files.ums_file1.path; // 파일경로
				//console.log("file_name == " + file_name);
				//console.log("file_path == " + file_path);
				
				extensionIndex = file_name.lastIndexOf('.');
				//console.log("extensionIndex == " + extensionIndex);
				
				extension = file_name.substring(extensionIndex, file_name.length);
				//console.log("extension == " + extension);
				
				file_dtname = day+extension;
				//console.log("file_dtname == " + file_dtname);
				
				if(use_os_falg) {
					file_path_change = path + "\/file\/ums\/" + file_dtname;
				} else {
					file_path_change = path + "\\file\\ums\\" + file_dtname;
				}
				
				var data = fs.readFileSync(file_path);
				file_write_result = fs.writeFileSync(file_path_change, data);
				
				try {
					stats = fs.statSync(file_path_change);
					console.log("1File exists.");
					file_write_result = true;
					file_write_result_path = "http://"+request.headers.host+"/file/ums/"+file_dtname;
					
					
					http.get(file_write_result_path, function (res) {
					    res.once('data', function (chunk) {
					        res.destroy();
					        console.log(imageType(chunk));
					        
					        console.log("imageObj.ext == " + imageType(chunk).ext);
					        console.log("imageObj.mime == " + imageType(chunk).mime);
					        
					        if(imageType(chunk).mime.indexOf('image/jpeg') > -1) {
					        	imageFlag = true;
					        	console.log("jpeg!!!!!!!!!");
					        	
					        	console.log("size == " + stats["size"]/1000);
					        	console.log("size == " + parseInt(stats["size"]/1000));
					        	
					        	// 파일이 이미지(jpg)지만, 파일크기가 60KByte이상은 MMS로 보내지 않는다.
					        	// LG에서는 60KByte로 권장하고 있다.
					        	if(parseInt(stats["size"]/1000) < 60) {
					        		imageFlag = true;
					        	} else {
					        		tonumberzone_array = "";
					        		result_flag = false;
					        		var json = JSON.stringify({ 
										result_flag : false,
										result_msg : "파일 용량 초과\n\n등록요청 파일 용량 : "+ stats["size"]/1000 + "KByte\n\n60KByte 이하로 등록하세요."
									});
									response.send(json);
					        	}
					        } else {
					        	console.log("not jpeg");
					        	tonumberzone_array = "";
				        		result_flag = false;
				        		var json = JSON.stringify({ 
									result_flag : false,
									result_msg : "허용된 이미지가 아닙니다.\n\n등록요청 파일 확장자 : "+ imageType(chunk).ext + "입니다.\n\njpg파일 확장자로 등록하세요."
								});
								response.send(json);
					        }
					        //=> {ext: 'gif', mime: 'image/gif'}
					        
					        callback(null, file_write_result_path, imageFlag);
					    });
					});
				}
				catch (e) {
					console.log("1File does not exist.");
					callback(null, file_write_result_path, imageFlag);
				}
			} else {
				callback(null, file_write_result_path, imageFlag);
			}
		},
		two : function(callback) {
			console.log("file_write_result_path == " + file_write_result_path);
			console.log("imageFlag == " + imageFlag);
			
			//if(ums_msg == "" || tonumberzone_array.length==0) {
			if(tonumberzone_array.length==0) {

			} else {
				for(var i=0; i<tonumberzone_array.length; i++) {
					console.log("tonumberzone_array["+i+"] == " + tonumberzone_array[i]);
					
					if(imageFlag) {
						console.log("MMS Send~*");
						ums_type = 2;
						sql = "insert into flash21_ums.MMS_MSG \n";
						sql += "(subject, phone, callback, status, reqdate, msg, file_cnt, file_path1, type, etc1) \n";
						sql += "values \n";
						sql += "('"+title+"', '"+tonumberzone_array[i]+"', '"+sender_number+"', '0', now(), '"+ums_msg+"', '1', '"+file_write_result_path+"' ,'0', '"+ums_key+"')";
					} else {
						if(msg_Length>80) {
							console.log("LMS Send~*");
							ums_type = 1;
							sql = "insert into flash21_ums.MMS_MSG \n";
							sql += "(subject, phone, callback, status, reqdate, msg, file_cnt, file_path1, type, etc1) \n";
							sql += "values \n";
							sql += "('"+title+"', '"+tonumberzone_array[i]+"', '"+sender_number+"', '0', now(), '"+ums_msg+"', '0', '' ,'0', '"+ums_key+"')";
						} else {
							console.log("SMS Send~*");
							ums_type = 0;
							sql = "insert into flash21_ums.SC_TRAN \n";
							sql += "(tr_senddate, tr_sendstat, tr_msgtype, tr_phone, tr_callback, tr_msg, tr_etc1) \n";
							sql += "values \n";
							sql += "(now(), '0', '0', '"+tonumberzone_array[i]+"', '"+sender_number+"', '"+ums_msg+"', '"+ums_key+"')";
						}
					}
					
					/***********************테스트 DB***********************/
					/*if(imageFlag) {
						console.log("MMS ~~~~~~~");
						// MMS
						ums_type = 2;
						sql = "insert into umsTest \n";
						sql += "(subject, phone, callback, status, regdate, msg, file_cnt, file_path1, type, etc1) \n";
						sql += "values \n";
						sql += "('"+title+"', '"+tonumberzone_array[i]+"', '"+sender_number+"', '0', now(), '"+ums_msg+"', '1', '"+file_write_result_path+"' ,'0', '"+ums_key+"')\n";
					} else {
						if(msg_Length>80) {
							console.log("LMS ~~~~~~~");
							// LMS
							ums_type = 1;
							sql = "insert into umsTest \n";
							sql += "(subject, phone, callback, status, regdate, msg, file_cnt, file_path1, type, etc1) \n";
							sql += "values \n";
							sql += "('"+title+"', '"+tonumberzone_array[i]+"', '"+sender_number+"', '0', now(), '"+ums_msg+"', '0', '' ,'0', '"+ums_key+"')\n";
						} else { // SMS 단문
							ums_type = 0;
							sql = "insert into umsTest \n";
							sql += "(tr_senddate, tr_sendstat, tr_msgtype, tr_phone, tr_callback, tr_msg, tr_etc1) \n";
							sql += "values \n";
							sql += "(now(), '0', '0', '"+tonumberzone_array[i]+"', '"+sender_number+"', '"+ums_msg+"', '"+ums_key+"')\n";
						}
					}*/
					
					result_cnt++;
					db.query(sql, function(error, result){
						if(error){
							console.log("ums.send error="+error);
							var json = JSON.stringify({ 
								result_flag : result_flag,
								result_msg : "실패하였습니다."
							});
							response.send(json);
						}
						else{
							result_num++;
							result_flag = true;
							result_msg = "총 "+ result_cnt +"에게 전송되었습니다.";
							if(result_num == tonumberzone_array.length){
								callback(null, result);
							}
						}
					});
				}
			} // end if
		} // two one
	}, function(error, result){
		if(error) {
			console.log("모든 task 종료 후 에러");
			var json = JSON.stringify({ 
				result : result_flag,
				result_msg : "실패하였습니다."
			});
			response.send(json);
		} else {
			console.log("result_flag == " + result_flag);
			console.log("result_msg == " + result_msg);

			if(result_flag) {
				// 전송히스토리를 저장한다.
				sql = "insert into ums_result \n";
				sql += "(ums_key, ums_type, ums_send_cnt, ums_title, ums_content, ums_sendtype, ums_send_id, create_id, create_date, create_host) \n";
				sql += "values \n";
				sql += "('"+ums_key+"', '"+ums_type+"', '"+result_cnt+"', '"+title+"', '"+ums_msg+"', 0, '"+tonumberzone_id+"', '"+create_id+"', now(), '"+wrk_ip+"')";

				console.log("히스토리_sql == " + sql);
				db.query(sql, function(error, results){
					if(error){
						console.log("히스토리 저장 오류~!");
						var json = JSON.stringify({ 
							result_flag : result_flag,
							result_msg : "실패하였습니다."
						});
						response.send(json);
					}else if(results.affectedRows==1) {
						console.log("히스토리.affectedRows == " + results.affectedRows);
						console.log("완료~!");
						var json = JSON.stringify({ 
							result_flag : result_flag,
							result_msg : result_msg
						});
						response.send(json);
					}
				});
			}
		}
	});
}