var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var sql =  "";
var db = require("../../../DB_config").connect;

exports.listener = function(request, response){
	console.log("********************* get_admin_position2.js enter *********************");
	
	var p_code = request.param("p_code") == undefined ? '' : request.param("p_code");
	var start_num = request.param("start_num") == undefined ? '' : request.param("start_num");
	var end_num = request.param("end_num") == undefined ? '' : request.param("end_num");
	var c_code = request.param("c_code") == undefined ? '' : request.param("c_code");
	var upcode = request.param("upcode") == undefined ? '' : request.param("upcode");
	
	console.log("p_code :::: " + p_code);
	console.log("start_num :::: " + start_num);
	console.log("end_num :::: " + end_num);
	console.log("c_code :::: " + c_code);
	console.log("upcode :::: " + upcode);
	
	
	sql = "select \n"+
	"  code_group, \n"+
	"  code, \n"+
	"  code_name, \n"+
	"  code_mode, \n"+
	"  code_order \n"+
	"from code \n" + 
	"where \n" + 
	"code_mode = 'child' \n" +
	"and code_group = '"+p_code+"' \n";
	
	sql +=  "order by code_order asc, code_name asc";  

	console.log("test sql : " + sql);
	
	var arry = new Array();
	var txt ="";
	
	if(p_code == 'orgmem_cate'){
		txt += "<option value=''>회원구분</option>";
	}else{
		txt += "<option value=''>3차 선택</option>";
	}
	
	db.query(sql, function(error, data){
		if(error) {
            console.log("ERROR : ",error);            
        } else {
        	arry = data;
    		for(i=0; i<arry.length; i++){
    			if(arry[i].code==c_code){
    				txt += "<option value='" + arry[i].code + "' selected='selected'>" + arry[i].code_name + "</option>";
    			} else{
    				txt += "<option value='" + arry[i].code + "'>" + arry[i].code_name + "</option>";
    			}
    		}
        }
		response.send(txt);
	});

}