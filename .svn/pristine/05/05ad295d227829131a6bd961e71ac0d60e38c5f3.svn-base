var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../custom_module/DB_config.js").connect;

function code_result (p_code, callback){
	var qry = "";
	var data = "";
	var arry = new Array();
			
			qry = 	"select \n"+
					"  code_group, \n"+
					"  code, \n"+
					"  code_name, \n"+
					"  code_mode, \n"+
					"  code_order \n"+
					"from code \n" + 
					"where \n" + 
					"code_mode = 'child' \n" +
					"and code_group = '"+p_code+"' \n";
			qry +=  "order by code_order";  
			
			db.query(qry,function(error, results){
				if (error) 
		            callback(error);
		        else
		        	console.log("test ::::::::::::::::12 ",qry);
		            callback(null,results);
			});
}

/**
 * param: 부모코드(str), 선택자식코드(str), 사용할이름(ex: name='xxx'), return data (str)
 * */
exports.selectBoxList = function (p_code, c_code, callback){
	console.log("c_code ======= " + c_code);
	var arry = new Array();
	var txt ="";
	if(c_code == "search_major"){
		txt += "<option value=''>전공선택</option>";
	}else if(c_code == "search_position"){
		txt += "<option value=''>직위선택</option>";
	}else if(c_code == "search_area"){
		txt += "<option value=''>지역선택</option>";
	}else{
		txt += "<option value=''>1차 선택</option>";
	}
	code_result(p_code, function(err,data){
		 if (err) {
	            console.log("ERROR : ",err);            
	        } else {            
	        	arry = data;
	    		for(i=0; i<arry.length; i++){
	    			
	    			if(arry[i].code==c_code)
	    				txt += "<option value='" + arry[i].code + "' selected='selected'>" + arry[i].code_name + "</option>";
	    			else
	    				txt += "<option value='" + arry[i].code + "'>" + arry[i].code_name + "</option>";
	    		}
	    		if (err) 
	    	        callback(err);
	    	    else
	    	        callback(null,txt);
	        }  
	});
}

exports.userSelectBox = function (p_code, c_code, callback){
	console.log("c_code ------- " + c_code);
	var arry = new Array();
	var txt ="";
	if(c_code == "search_major"){
		txt += "<option value=''>전공</option>";
	}else if(c_code == "search_position"){
		txt += "<option value=''>직위</option>";
	}else if(c_code == "search_area"){
		txt += "<option value=''>지역</option>";
	}else{
		txt += "<option value=''>선택</option>";
	}
	code_result(p_code, function(err,data){
		 if (err) {
	            console.log("ERROR : ",err);            
	        } else {            
	        	arry = data;
	    		for(i=0; i<arry.length; i++){
	    			
	    			if(arry[i].code==c_code)
	    				txt += "<option value='" + arry[i].code + "' selected='selected'>" + arry[i].code_name + "</option>";
	    			else
	    				txt += "<option value='" + arry[i].code + "'>" + arry[i].code_name + "</option>";
	    		}
	    		if (err) 
	    	        callback(err);
	    	    else
	    	        callback(null,txt);
	        }  
	});
}