var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
require('date-utils');
var db = require("../../../DB_config.js").connect;
var osModule = require('os');

exports.listener=function(request, response){
	console.log("##################################### company_save Enter #####################################");
	
	var use_os_falg = false;
	if(osModule.type()=='Linux') use_os_falg = true;
	var mode= request.param("mode");
		
	var orgmem_seqNo  =  request.param("orgmem_seqNo") == undefined ? '' : request.param("orgmem_seqNo"); 
	var orgmem_grdyear  =  request.param("orgmem_grdyear") == undefined ? '' : request.param("orgmem_grdyear"); 
	var orgmem_grdimg  =  request.param("orgmem_grdimg") == undefined ? '' : request.param("orgmem_grdimg"); 
	var orgmem_nowimg  =  request.param("orgmem_nowimg") == undefined ? '' : request.param("orgmem_nowimg"); 
	var orgmem_name  =  request.param("orgmem_name") == undefined ? '' : request.param("orgmem_name"); 
	var orgmem_name_han  =  request.param("orgmem_name_han") == undefined ? '' : request.param("orgmem_name_han"); 
	var orgmem_class  =  request.param("orgmem_class") == undefined ? '' : request.param("orgmem_class");
	var company_name =  request.param("company_name") == undefined ? '' : request.param("company_name"); 
	var company_position1  =  request.param("company_position1") == undefined ? '' : request.param("company_position1"); 
	var company_position2  =  request.param("company_position2") == undefined ? '' : request.param("company_position2"); 
	var orgmem_home_addr1 =  request.param("orgmem_home_addr1") == undefined ? '' : request.param("orgmem_home_addr1"); 
	var orgmem_office_addr1 =  request.param("orgmem_office_addr1") == undefined ? '' : request.param("orgmem_office_addr1"); 
	var company_tel1 =  request.param("company_tel1") == undefined ? '' : request.param("company_tel1"); 
	var company_tel2 =  request.param("company_tel2") == undefined ? '' : request.param("company_tel2"); 
	var company_tel3 =  request.param("company_tel3") == undefined ? '' : request.param("company_tel3"); 
	var orgmem_home_tel1  =  request.param("orgmem_home_tel1") == undefined ? '' : request.param("orgmem_home_tel1"); 
	var orgmem_home_tel2  =  request.param("orgmem_home_tel2") == undefined ? '' : request.param("orgmem_home_tel2"); 
	var orgmem_home_tel3  =  request.param("orgmem_home_tel3") == undefined ? '' : request.param("orgmem_home_tel3"); 
	var orgmem_phone1  =  request.param("orgmem_phone1") == undefined ? '' : request.param("orgmem_phone1"); 
	var orgmem_phone2  =  request.param("orgmem_phone2") == undefined ? '' : request.param("orgmem_phone2"); 
	var orgmem_phone3  =  request.param("orgmem_phone3") == undefined ? '' : request.param("orgmem_phone3"); 
	var orgmem_email  =  request.param("orgmem_email") == undefined ? '' : request.param("orgmem_email"); 
	var remrk   =  request.param("remrk") == undefined ? '' : request.param("remrk"); 
	var orgmem_no   =  request.param("orgmem_no") == undefined ? '' : request.param("orgmem_no"); 
	
	var orgmem_grdimg_path = "";
	var orgmem_nowimg_path = "";
	
	var extensionIndex = "";
	var extension = "";
	var date = new Date();
	var day = date.toFormat('YYYYMMDDHHMISS');
	var pathlast = __dirname;
	var pathIndex = "";

	if (use_os_falg) {
		pathIndex = pathlast.lastIndexOf('\/custom_module');
	} else {
		pathIndex = pathlast.lastIndexOf('\\custom_module');
	}

	var path = pathlast.substring(pathIndex, 0);                  //파일이름
	var memberImg_original = "";
	var memberImg_path = "";

	if (request.param("orgmem_grdimg") != undefined) {
		orgmem_grdimg = request.param("orgmem_grdimg");
	} else if (request.files.orgmem_grdimg.name != "") {
		memberImg_original = request.files.orgmem_grdimg.name;
		orgmem_grdimg_path = request.files.orgmem_grdimg.path;

		extensionIndex = memberImg_original.lastIndexOf('.');
		extension = memberImg_original.substring(extensionIndex, memberImg_original.length);   //파일확장자

		if (extension != "") {
			orgmem_grdimg = day + 0 + extension;
		} else {
			orgmem_grdimg = "";
		}
	}

	if (request.param("orgmem_nowimg") != undefined) {
		orgmem_nowimg = request.param("orgmem_nowimg");
	} else if (request.files.orgmem_nowimg.name != "") {
		memberImg_original = request.files.orgmem_nowimg.name;
		orgmem_nowimg_path = request.files.orgmem_nowimg.path;

		extensionIndex = memberImg_original.lastIndexOf('.');
		extension = memberImg_original.substring(extensionIndex, memberImg_original.length);   //파일확장자

		if (extension != "") {
			orgmem_nowimg = day + 1 + extension;
		} else {
			orgmem_nowimg = "";
		}
	}

	var sql ="";
		
	 if(mode=="insert"){ 
		 sql = "insert into orgmember( \n" +
		" orgmem_seqNo \n" +
		 ", orgmem_grdyear \n" +
		 ", orgmem_grdimg \n" +
		 ", orgmem_nowimg \n" +
		 ", orgmem_name \n" +
		 ", orgmem_name_han \n" +
		 ", orgmem_class \n" +
		 ", company_name \n" +
		 ", company_position1 \n" +
		 ", company_position2 \n" +
		 ", orgmem_home_addr1 \n" +
		 ", orgmem_office_addr1 \n" +
		 ", company_tel1 \n" +
		 ", company_tel2 \n" +
		 ", company_tel3 \n" +
		 ", orgmem_home_tel1 \n" +
		 ", orgmem_home_tel2 \n" +
		 ", orgmem_home_tel3 \n" +
		 ", orgmem_phone1 \n" +
		 ", orgmem_phone2 \n" +
		 ", orgmem_phone3 \n" +
		 ", orgmem_email \n" +
		 ", remrk \n" + 
		 ", create_date ) \n" +
		 	
		 		" values( \n" +
		 		"'"+orgmem_seqNo+"', \n" +
		 		"'"+orgmem_grdyear+"', \n" +
		 		"'"+orgmem_grdimg+"', \n" +
		 		"'"+orgmem_nowimg+"', \n" +
		 		"'"+orgmem_name+"', \n" +
		 		"'"+orgmem_name_han+"', \n" +
		 		"'"+orgmem_class+"', \n" +
		 		"'"+company_name+"', \n" +
		 		"'"+company_position1+"', \n" +
		 		"'"+company_position2+"', \n" +
		 		"'"+orgmem_home_addr1+"', \n" +
		 		"'"+orgmem_office_addr1+"', \n" +
		 		"'"+company_tel1+"', \n" +
		 		"'"+company_tel2+"', \n" +
		 		"'"+company_tel3+"', \n" +
				"'"+orgmem_home_tel1+"', \n" +
		 		"'"+orgmem_home_tel2+"', \n" +
		 		"'"+orgmem_home_tel3+"', \n" +
				"'"+orgmem_phone1+"', \n" +
		 		"'"+orgmem_phone2+"', \n" +
		 		"'"+orgmem_phone3+"', \n" +
				"'"+orgmem_email+"', \n" +
		 		"'"+remrk+"', \n" +
                "now() " +
		 		")";
	 }
	 else {
		 school_no = request.param("no");
		 
		 sql = "update orgmember set \n" +
		 		"orgmem_seqNo ='"+orgmem_seqNo +"', \n" +
		 		"orgmem_grdyear ='"+orgmem_grdyear +"', \n" +
		 		"orgmem_grdimg ='"+orgmem_grdimg +"', \n" +
				"orgmem_nowimg ='"+orgmem_nowimg +"', \n" +
				"orgmem_name ='"+orgmem_name +"', \n" +
				"orgmem_name_han ='"+orgmem_name_han +"', \n" +
				"orgmem_class ='"+orgmem_class +"', \n" +
				"company_name ='"+company_name +"', \n" +
				"company_position1 ='"+company_position1 +"', \n" +
				"company_position2 ='"+company_position2 +"', \n" +
				"orgmem_home_addr1 ='"+orgmem_home_addr1 +"', \n" +
				"orgmem_office_addr1 ='"+orgmem_office_addr1 +"', \n" +
				"company_tel1='"+company_tel1+"', \n" +
				"company_tel2='"+company_tel2+"', \n" +
				"company_tel3='"+company_tel3+"', \n" +
				"orgmem_home_tel1 ='"+orgmem_home_tel1 +"', \n" +
				"orgmem_home_tel2 ='"+orgmem_home_tel2 +"', \n" +
				"orgmem_home_tel3 ='"+orgmem_home_tel3 +"', \n" +
				"orgmem_phone1 ='"+orgmem_phone1 +"', \n" +
				"orgmem_phone2 ='"+orgmem_phone2 +"', \n" +
				"orgmem_phone3 ='"+orgmem_phone3 +"', \n" +
				"orgmem_email ='"+orgmem_email +"', \n" +
				"remrk ='"+remrk +"', \n" +
		 		"update_date=now() \n" +

		 		"where orgmem_no=" + orgmem_no;
	 }
	 
	async.series({
		one : function(callback){
			console.log("sql == " + sql);
			db.query(sql, function(error, results){
				if(error){
					response.send(error);
				}else{

					if (request.param("orgmem_grdimg") == undefined && request.files.orgmem_grdimg.name != "") {
						var orgpath = "";
						if (use_os_falg) {
						   orgpath = path + "\/file\/member\/" + orgmem_grdimg;      //파일업로드 경로
						} else {
						   orgpath = path + "\\file\\member\\" + orgmem_grdimg;      //파일업로드 경로
						}
			
						//파일을 동기적으로 사용(기본으로 비동기적)
						var data = fs.readFileSync(orgmem_grdimg_path);
						fs.writeFileSync(orgpath, data);
					 }

					 if (request.param("orgmem_nowimg") == undefined && request.files.orgmem_nowimg.name != "") {
						var orgpath = "";
						if (use_os_falg) {
						   orgpath = path + "\/file\/member\/" + orgmem_nowimg;      //파일업로드 경로
						} else {
						   orgpath = path + "\\file\\member\\" + orgmem_nowimg;      //파일업로드 경로
						}
			
						//파일을 동기적으로 사용(기본으로 비동기적)
						var data = fs.readFileSync(orgmem_nowimg_path);
						fs.writeFileSync(orgpath, data);
					 }

					callback(null, null);
					
				}
			});				 
		}
	}, function(error, result){
		response.writeHead(200, {
			'Content-type': 'text/html; charset=utf-8'
		});
		response.end('<script>opener.document.writehtm.submit(); window.close();</script>');
	});	 
};
