var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var layout = require("../../../../function/layout.js");
var db = require("../../../DB_config.js").connect;

exports.listener = function (request, response) {
    var mode = request.param("mode") == undefined ? "write" : request.param("mode");
    var admin = request.session.ad_id;
    var brd_no = request.param("number");
    var year = request.param("search_year");
    var month = request.param("search_month");

    console.log(year);
    console.log(month);

    console.log("============================================================================================================================");
    console.log("=======================================         *  DUES POPUP VIEW *         ===============================================");
    console.log("============================================================================================================================");


    fs.readFile("./views/admin/web/dues_manage/payment_manage.html", "utf-8", function (error, data) {

        var sql = "SELECT 1 FROM DUAL";

        db.query(sql, function (error, results) {
            if (error) {
                response.send("fail");
                console.log("admin/web/board_list/error======", sql);
            } else {
                response.send(ejs.render(layout.include("web_admin_popup", data), {
                    data: results,
                    admin: admin,
                    menuNum: 8,
                    year:year,
                    month:month
                }));
            }
        });
    });
};
