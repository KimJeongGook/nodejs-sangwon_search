var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config").connect;
var layout = require("../../../function/layout.js");

exports.listener=function(request, response){
	console.log("********************* search_view.js enter *********************");
	var id = request.param("id")==undefined ? "" : request.param("id");
   
   var sql = "SELECT a.*, ifnull(a.orgmem_nowimg, 'no-img.jpg') as now_img, a.orgmem_grdimg \n"
      sql +=" from orgmember a where orgmem_no = " + id;

   var sql2 = "select orgmem_grdimg from orgimg_group where orgmem_seqNo = ? and orgmem_class = ? and orgmem_img_group = '' ";
   
   var sql3 = "select orgmem_grdimg from orgimg_group where orgmem_seqNo = ? and orgmem_class = ? and orgmem_img_group = ?  ";
   
   console.log(sql3);
   db.query(sql, function(err, result) {
      if(err) return response.send('fail');

      db.query(sql2, [result[0].orgmem_seqNo, result[0].orgmem_class], function(err, class_img){
         if(err) return response.send('fail');

         db.query(sql3, [result[0].orgmem_seqNo, result[0].orgmem_class, result[0].orgmem_img_group], function(err, team_img){
            if(err) return response.send('fail');
           
            return response.render("user/web/search_view", {
               result: result,
               class_img: class_img, 
               team_img: team_img
             })
         })
      })
   });
}