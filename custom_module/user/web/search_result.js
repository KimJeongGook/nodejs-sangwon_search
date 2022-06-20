var db = require("../../DB_config").connect;
var koreaChk = require("../../../js/koreanchk.js");


exports.listener=function(request, response){
    console.log("######################## search_result.js Enter ########################");

    var name = request.body.name;
    var seqNo = request.body.seqNo == undefined ? "" : request.body.seqNo;

    console.log("name : " + name);
    console.log("seqNo : " + seqNo);
    
    var sql = "select a.*, \n"
        sql += " ifnull(a.orgmem_nowimg, 'no-img.jpg') as now_img, ifnull(a.orgmem_grdimg, 'no-img.jpg') as grd_img \n"
        sql += " from orgmember a where 1=1 \n"
        if (seqNo == 'all') {
            sql += "";
        } else if(seqNo != ""){
            sql += " and a.orgmem_seqNo = " + seqNo + "\n"
        }
        if(name!=""){
            sql += " and ("+koreaChk.koreanChk('orgmem_name', name)+")";
        }
    console.log(sql);

    db.query(sql, function(error, result){
        if(error){
            console.log(error);
        } else {
            response.send({
                "success" : true,
                "result" : result
            });
        }
    });
}