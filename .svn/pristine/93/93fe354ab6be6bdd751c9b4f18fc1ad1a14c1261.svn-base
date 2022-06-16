var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;
var layout = require("../../../../function/layout.js");
var session = require("../../../../function/session.js");
var code = require("../../../../function/codeMngt.js");

exports.listener = function (request, response) {

    var searchText = request.param("searchText") == null ? "" : request.param("searchText");
    var year = request.param("year") == null ? "" : request.param("year");
    var month = request.param("month") == null ? "" : request.param("month");

    var sql = "SELECT * FROM orgmember F1 \n";
    sql += "WHERE \n";
    sql += "(orgmem_name LIKE '%"+searchText+"%' \n";
    sql += "OR orgmem_name_eng LIKE '%"+searchText+"%' \n";
    sql += "OR orgmem_name_jpn LIKE '%"+searchText+"%' \n";
    sql += "OR orgmem_name_chi LIKE '%"+searchText+"%' \n";
    sql += "OR orgmem_phone1 LIKE '%"+searchText+"%' \n";
    sql += "OR orgmem_phone2 LIKE '%"+searchText+"%' \n";
    sql += "OR orgmem_phone3 LIKE '%"+searchText+"%' \n";
    sql += "OR orgmem_seqNum LIKE '%"+searchText+"%') \n";
    fs.readFile("./views/user/member/member_list.html", "utf-8", function (error, data) {
        db.query(sql, function (error, result) {
            console.log(sql);
            response.send(result);
        });
    });
};
