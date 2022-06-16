
var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var layout = require("../../../../function/layout.js");
var db = require("../../../DB_config.js").connect;
var code = require("../../../../function/codeMngt.js");

exports.listener=function(request, response){
	var s_org_no = request.param("s_org_no") == null ? '' : request.param("s_org_no");
	var param_major = request.param("param_major") == '' ? 'major' : request.param("param_major");
	var param_area = request.param("param_area") == '' ? 'area' : request.param("param_area");
	
	console.log("param_major = " + param_major);
	console.log("param_area = " + param_area);
	
	var sql ="";

	fs.readFile("./views/admin/web/orgmember_mngt/orgm_writeForm.html","utf-8",function(error, data){
		code.selectBoxList("orgmem_orgMba", "010", function(err,s_data3){
			code.selectBoxList("orgmem_major", param_major, function(err, s_data4){
				code.selectBoxList("orgmem_phone1", "010", function(err, s_data5){
					code.selectBoxList("orgmem_area", param_area, function(err, s_data6){
						code.selectBoxList("org_position", param_area, function(err, s_data7){
							code.selectBoxList("orgmem_position1", param_area, function(err, s_data8){
								code.selectBoxList("org_area_position", param_area, function(err, s_data9){
						sql ="select * from org_seq order by org_seqNo desc"; //기수
						db.query(sql, function(error, results2){
							response.send(ejs.render(layout.include("web_admin_popup", data), {
								db_data : [],
								menuNum: 0,
								s_org_orgMba : s_data3,
								s_orgmem_major : s_data4,
								orgmem_phone1 : s_data5,
								s_orgmem_area : s_data6,
								org_seqList : results2,
								s_org_no : s_org_no,
								org_position : s_data7,
								orgmem_position1 : s_data8,
								org_area_position : s_data9
							}));
						});
					});
				});
			});
		});
	});
});
});
});
};


