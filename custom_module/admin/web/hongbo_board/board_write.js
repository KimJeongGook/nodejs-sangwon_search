var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var layout = require("../../../../function/layout.js");
var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	var table = "hongbo_board";
	var file_table = "hongbo_files";	
	var mode = request.param("mode") == undefined ? "write" : request.param("mode");
	var admin = request.session.ad_id;
	var brd_no = request.param("number");
	var isDeleted = request.param("isDeleted") == undefined ? "N" : request.param("isDeleted");

	fs.readFile("./views/admin/web/hongbo_board/board_write.html","utf-8",function(error, data){
		if(mode == 'write'){
			response.send(ejs.render(layout.include("web_admin_popup", data), {
				data : [],
				mode :mode,
				data_banner_file : '',
				isDeleted : 'N'
			}));
		}else if(mode ='modify'){
			
			var sql = "select a.*, ifnull(b.orgmem_name, '') as orgmem_name, ";
				sql += " case b.orgmem_seqNo \n";
					sql +=" when '0000' then '재일동문' \n";
					sql +=" else concat(b.orgmem_seqNo, '회') \n";
				sql +=" end as orgmem_seqNm \n";
			    //sql += " ifnull((select org_seqNo from org_seq where org_no = b.orgmem_seqNo), '') as org_leader, "; 
			    //sql += " ifnull((select org_seqYear from org_seq where org_no = b.orgmem_seqNo), '') as org_leader_day "; 
				sql += " from "+table+" a ";
				sql += " left outer join orgmember b ";
				sql += " on a.orgmem_no = b.orgmem_no ";
				sql += " where a.board_no = " + brd_no;
				
			var sql_files = "select * ";
				sql_files += " from "+file_table+" ";
				sql_files += " where board_no = " + brd_no;
				sql_files += " and   file_type = 'content'";
				sql_files += " order by file_no";
				
			var sql_main_files = "select * ";
				sql_main_files += " from "+file_table+" ";
				sql_main_files += " where board_no = " + brd_no;
				sql_main_files += " and   file_type = 'main'";
				sql_main_files += " order by file_no";		
				
			var sql_banner_files = "select * ";
				sql_banner_files += " from "+file_table+" ";
				sql_banner_files += " where board_no = " + brd_no;
				sql_banner_files += " and   file_type = 'banner'";
				sql_banner_files += " order by file_no";			
			
			 async.series({
				 first : function(callback){
					 db.query(sql, function(error, results){
						 if(error){
							 response.send("fail");
						 }else{
							 callback(null, results);	
						 }
					 });				 
				 },
				 second : function(callback){
					 db.query(sql_files, function(error, results_files){
						 if(error){
							 response.send("fail");
						 }else{
							 callback(null, results_files);	
						 }
					 });				 
				 },
				 third : function(callback){
					 db.query(sql_main_files, function(error, results_main_files){
						 if(error){
							 response.send("fail");
						 }else{
							 callback(null, results_main_files);	
						 }
					 });				 
				 },
				 fourth : function(callback){
					 db.query(sql_banner_files, function(error, results_banner_files){
						 if(error){
							 response.send("fail");
						 }else{
							 callback(null, results_banner_files);	
						 }
					 });				 
				 }
			 }, function(error, result){
	     		 response.send(ejs.render(layout.include("web_admin_popup", data), {
					data : result.first,
					data_file : result.second,
					data_main_file : result.third,
					data_banner_file : result.fourth,
					mode : mode,
					isDeleted : isDeleted,
					admin : admin,
	        		menuNum:2
	    		 }));
			 });			
		}
	});
};
