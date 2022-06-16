var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;
var layout = require("../../../../function/layout.js");
var session = require("../../../../function/session.js");
var code = require("../../../../function/codeMngt.js");

exports.listener = function (request, response) {

    var mode = request.param("mode") == null ? "" : request.param("mode");
    var year = request.param("year") == null ? "" : request.param("year");
    var month = request.param("month") == null ? "" : request.param("month");
    var price = request.param("price") == null ? "" : request.param("price");
    var pay_option = request.param("pay_option") == null ? "" : request.param("pay_option");
    var orgmem_no = request.param("orgmem_no") == null ? "" : request.param("orgmem_no");
    var dues_id = request.param("dues_id");
    var create_id = request.session.ad_id;
	var create_host = request.connection.remoteAddress;

    var sql = "";

    switch (mode) {
        case 'insert':
            sql += "INSERT INTO dues (year,month,price,pay_option,orgmem_no,create_id,create_host) VALUES ("
            sql += " '"+year+"' \n"
            sql += ",'"+month+"' \n"
            sql += ",'"+price+"' \n"
            sql += ",'"+pay_option+"' \n"
            sql += ",'"+orgmem_no+"' \n"
            sql += ",'"+create_id+"' \n"
            sql += ",'"+create_host+"' \n"
            sql += ") \n"
            break;
        case 'delete':
            sql += "DELETE FROM dues WHERE dues_id = "+dues_id;

        break;
         case 'update':
            sql += "update dues set year ='" + year +
			"', month ='" + month + 
			"', price = '" + price + 
			"', pay_option = '" + pay_option + 
			"', update_host = '" + create_host + 
			"', update_id ='" + create_id + 
			"', update_date = now() where dues_id = " + dues_id;
        break;

        default:
            break;
    }


    db.query(sql, function (error, result) {
        console.log(sql);
        response.send(result);
    });
};
