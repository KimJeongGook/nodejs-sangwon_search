var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
require('date-utils');
var db = require("../../../DB_config.js").connect;
var express = require('express');
var osModule = require('os');
var session = require("../../../../function/session.js");

exports.listener=function(request, response){
	var use_os_falg = false;
	if(osModule.type()=='Linux') use_os_falg = true;
	var table = "event";
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
	var mainFilesArray = [];
	var bannerFilesArray = [];
	
	var connectorNo = session.connectorNo(request);
	var connectorName = session.connectorName(request);
	var connectorPhone = session.connectorPhone(request);
	var connectorImage = session.connectorImage(request);
	
	var brd_id =  "event";
	var brd_title =  request.param("brdTitle")  == undefined ? "" : request.param("brdTitle");
	var brd_content =  request.param("brdContent") == undefined ? "" : request.param("brdContent");
	var orgmem_seqNo =  request.param("orgmem_seqNo") == undefined ? "" : request.param("orgmem_seqNo");
	var sort = request.param("sort");
	var brd_create_id = request.session.ad_id;
	var board_no = "";
	var brd_create_date = "";
	var brd_create_host = request.connection.remoteAddress;
	var sql= "";
	var file_sql="";
	var select_sql = "";
	var strt_dt = request.param("strt_dt") == undefined ? "" : request.param("strt_dt");
	var end_dt = request.param("end_dt") == undefined ? "" : request.param("end_dt");
	
	if(request.files.brdFileMainImg != undefined){
		for(var i = 0; i < request.files.brdFileMainImg.length; i++){ 
			if(request.files.brdFileMainImg[i].name != ""){
				var tempObj = {};
				tempObj.originalFilename = request.files.brdFileMainImg[i].name;
				tempObj.path = request.files.brdFileMainImg[i].path;
				mainFilesArray.push(tempObj);
			}
		}
	}
	
	if(request.files.brdFileBannerImg != undefined){
		for(var i = 0; i < request.files.brdFileBannerImg.length; i++){ 
			if(request.files.brdFileBannerImg[i].name != ""){
				var tempObj = {};
				tempObj.originalFilename = request.files.brdFileBannerImg[i].name;
				tempObj.path = request.files.brdFileBannerImg[i].path;
				bannerFilesArray.push(tempObj);
			}
		}
	}
	
	if(mode=="write"){
		sql = "insert into "+table+"(" +
				"board_id, board_title, board_content, sort, " +
				"strt_dt, end_dt, create_id, create_date, create_host) " +
				"values('" + brd_id + 
				"', '" + brd_title + 
				"', '" + brd_content + 
				"', '" + sort + 
				"', '" + strt_dt +
				"', '" + end_dt +
				"', '" + brd_create_id + 
				"', now(), '" + brd_create_host + "')";
		
		query();
		
	}else {
		board_no = request.param("number");
		sql = "update "+table+" set board_id='" + brd_id +
			"', board_title = '" + brd_title + 
			"', board_content = '" + brd_content + 
			"', sort = '" + sort + 
			"', strt_dt = '" + strt_dt + 
			"', end_dt = '" + end_dt + 
			"', update_id ='" + brd_create_id + 
			"', update_date = now(), update_host = '" + brd_create_host + "' where board_no =" + board_no;
		
		query();
	}
	
	function query() {
		
		async.series({
			 first : function(callback){
				db.query(sql, function(error, results){
					if(error){
						response.send("fail");
						console.log("admin/web/event_save/error=====", sql);
					}else{
						if(mode == "write"){
							select_sql = "select max(board_no) as brd_no from "+table+"";
							
							db.query(select_sql, function(error, brd_no){
								if(error){
									response.send("fail");
								}else{
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
			//if(!use_os_falg) {
				response.writeHead(200, {
					'Content-type': 'text/html; charset=utf-8'
				});
			//}
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
				
				if(use_os_falg) {
					file_path.push(path + "\/file\/"+table+"\/" + file_dtname[i]);
				} else {
					file_path.push(path + "\\file\\"+table+"\\" + file_dtname[i]);
				}
			
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
				"board_no, board_id, file_name, file_dtname, file_type, file_path)" +
				"values('" + board_no +  
				"', '" + brd_id + 
				"', '" + file_name[i] + 
				"', '" + file_dtname[i] + 
				"', 'content" + 
				"', '" + file_path[i] + "')";
				
				db.query(file_sql, function(error, results){
					if(error){
						console.log("admin/web/event_save/file/error===", file_sql);
						response.send("fail");
					} 
				});
			} 
		}
		
		if(mainFilesArray.length > 0) {
			var filename = [];
			var extensionIndex = [];
			var extension = [];
			var file_name = [];
			var file_dtname = [];
			var file_path = [];
			
			var count = 0;
			for(var i = 0; i < mainFilesArray.length; i++) {
				file_name.push(mainFilesArray[i].originalFilename);									//기존 파일이름
				extensionIndex[i] = file_name[i].lastIndexOf('.');
				extension[i] = file_name[i].substring(extensionIndex[i], file_name[i].length);	//파일확장자
				file_dtname[i] = day+ "(" + i + ")" + "M" + extension[i];
				
				if(use_os_falg) {
					file_path.push(path + "\/file\/"+table+"\/" + file_dtname[i]);
				} else {
					file_path.push(path + "\\file\\"+table+"\\" + file_dtname[i]);
				}
				
				var orgpath = ""; 
				
				orgpath = file_path[i];		//파일업로드 경로
				
				if(orgpath) {
					//파일을 동기적으로 사용(기본으로 비동기적)
					var data = fs.readFileSync(mainFilesArray[i].path);
					fs.writeFileSync(file_path[i], data); 
				} else {
					response.send("fail");
				}
				
				file_sql = "insert into "+file_table+"(" +
				"board_no, board_id, file_name, file_dtname, file_type, file_path)" +
				"values('" + board_no +  
				"', '" + brd_id + 
				"', '" + file_name[i] + 
				"', '" + file_dtname[i] + 
				"', 'main" + 
				"', '" + file_path[i] + "')";
				
				db.query(file_sql, function(error, results){
					if(error){
						console.log("admin/web/event_save/file/error===", file_sql);
						response.send("fail");
					} 
				});
			} 
		} 
		
		//배너 이미지
		if(bannerFilesArray.length > 0) {
			var filename = [];
			var extensionIndex = [];
			var extension = [];
			var file_name = [];
			var file_dtname = [];
			var file_path = [];
			
			var count = 0;
			for(var i = 0; i < bannerFilesArray.length; i++) {
				file_name.push(bannerFilesArray[i].originalFilename);									//기존 파일이름
				extensionIndex[i] = file_name[i].lastIndexOf('.');
				extension[i] = file_name[i].substring(extensionIndex[i], file_name[i].length);	//파일확장자
				file_dtname[i] = day+ "(" + i + ")" + "B" + extension[i];
				
				if(use_os_falg) {
					file_path.push(path + "\/file\/"+table+"\/" + file_dtname[i]);
				} else {
					file_path.push(path + "\\file\\"+table+"\\" + file_dtname[i]);
				}
				
				var orgpath = ""; 
				
				orgpath = file_path[i];		//파일업로드 경로
				
				if(orgpath) {
					//파일을 동기적으로 사용(기본으로 비동기적)
					var data = fs.readFileSync(bannerFilesArray[i].path);
					fs.writeFileSync(file_path[i], data); 
				} else {
					response.send("fail");
				}
				
				file_sql = "insert into "+file_table+"(" +
				"board_no, board_id, file_name, file_dtname, file_type, file_path)" +
				"values('" + board_no +  
				"', '" + brd_id + 
				"', '" + file_name[i] + 
				"', '" + file_dtname[i] + 
				"', 'banner" + 
				"', '" + file_path[i] + "')";

				
				db.query(file_sql, function(error, results){
					if(error){
						response.send("fail");
					} 
				});
			} 
		} 
	}
	
};

