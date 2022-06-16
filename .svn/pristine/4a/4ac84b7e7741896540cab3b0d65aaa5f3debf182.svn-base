var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;
var layout = require("../../../../function/layout.js");
var session = require("../../../../function/session.js");
var code = require("../../../../function/codeMngt.js");

exports.listener = function (request, response) {

    var orgmem_no = request.param("orgmem_no") == null ? "" : request.param("orgmem_no");

    var sql = "SELECT * FROM orgmember F1 \n";
    sql += "WHERE \n";
    sql += "orgmem_no = '"+orgmem_no+"' \n";
    fs.readFile("./views/user/member/member_list.html", "utf-8", function (error, data) {
        db.query(sql, function (error, result) {
            console.log(sql);
            response.send(result);
        });
    });
};
