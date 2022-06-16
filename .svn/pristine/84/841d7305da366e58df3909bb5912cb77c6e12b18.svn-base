
var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var layout = require("../../../../function/layout.js");
var code = require("../../../../function/codeMngt.js");
var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){

	var orgmem_no = request.param("number");

	var sql1 = "select * from orgmember where orgmem_no = " + orgmem_no;
	fs.readFile("./views/admin/web/orgmember_mngt/orgm_writeForm.html", "utf-8", function(error, data){
		db.query(sql1, function(error, results1){
			code.selectBoxList("orgmem_orgMba",results1[0].orgmem_position_mba, function(err,s_data3){
				code.selectBoxList("orgmem_major", results1[0].orgmem_major, function(err, s_data4){
					code.selectBoxList("orgmem_phone1", results1[0].orgmem_phone1, function(err, s_data5){
						code.selectBoxList("orgmem_area", results1[0].orgmem_area, function(err, s_data6){
							code.selectBoxList("org_position", results1[0].orgmem_position2, function(err, s_data7){
								code.selectBoxList("orgmem_position1", results1[0].orgmem_position1, function(err, s_data8){
									code.selectBoxList("org_area_position", results1[0].orgmem_position2_2, function(err, s_data9){
							sql ="select * from org_seq order by org_seqYear desc"; //기수
							db.query(sql, function(error, results2){
								response.send(ejs.render(layout.include("web_admin_popup", data), {
									db_data : results1,
									s_org_orgMba : s_data3,
									s_orgmem_major : s_data4,
									orgmem_phone1 : s_data5,
									s_orgmem_area : s_data6,
									menuNum: 0 ,
									org_seqList : results2,
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
});
};