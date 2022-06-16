var express = require('express')
  , http = require('http')
  , fs = require('fs') 
  , cookieParser = require('cookie-parser');

/*custom modules start*/
var db = require("./custom_module/DB_config.js").connect;
var layout = require("./function/layout.js");

var app = express();

//web
/* admin */
var admin_login = require("./custom_module/admin/web/admin/admin_login.js");
var admin_logout = require("./custom_module/admin/web/admin/admin_logout.js");

var orgm_list = require("./custom_module/admin/web/orgmember_mngt/orgm_list.js");
var company_view = require("./custom_module/admin/web/orgmember_mngt/company_view.js");
var company_write = require("./custom_module/admin/web/orgmember_mngt/company_write.js");
var company_save = require("./custom_module/admin/web/orgmember_mngt/company_save.js");
var company_modify = require("./custom_module/admin/web/orgmember_mngt/company_modify.js");
var orgm_del = require("./custom_module/admin/web/orgmember_mngt/orgm_del.js");
var admin_exceldown = require("./custom_module/admin/web/excel/admin_exceldown.js");


app.set("view engine", "ejs")
app.set("views", process.cwd() + "/views")
app.configure(function(){ 
	app.use(express.cookieParser());
	app.use(express.session({ secret : "secret key" }));
	app.use(express.static(__dirname));
	app.use(express.bodyParser({}));
	app.use("/file", express.static("file"))
});



/////////////////////////////////////////////인터셉터용/////////////////////////////////////////////
/*
app.use(function(req, res, next) {
	var usbData = req.query;

	//console.log("usbData.vid :: " + usbData.vid + " usbData.pid :: " + usbData.pid);

	var isAuth = req.cookies.isAuth || 'N';
	var uri = req.url;
	
	if (uri.lastIndexOf('.') > -1 || uri == "/return_back" || uri.indexOf('/admin') > -1 || isAuth == 'Y') {
		next();
	} else {
		if (usbData.vid == undefined) {
			res.cookie("isAuth", isAuth);
			res.redirect('/return_back');
		}
		else {

			for (var i=0; i<usbData.vid.length; i++){
				var vid = usbData.vid[i];
				var pid = usbData.pid[i];

				var sql = "";

				sql += "SELECT	count(1) as cnt \n";
				sql += "FROM usb_number where vid = '" + vid + "' \n";
				sql += "and pid = '" + pid + "' \n";

				if (i == usbData.vid.length-1) {
					db.query(sql, function(error, results){

					if(results[0].cnt == "1"){
						isAuth = 'Y';
						res.cookie("isAuth", isAuth);
						next();
					} else {
						if ((isAuth == 'N')) {
							res.cookie("isAuth", isAuth);
							res.redirect('/return_back');
						}
					}
					});
				}
				else {
					db.query(sql, function(error, results){
						if(results[0].cnt == "1"){
							isAuth = 'Y';
							res.cookie("isAuth", isAuth);
							next();
						}
					});

				}
			}
		}
	}
});
*/

app.get("/fail", function(request, response){
	fail.listener(request, response);
});


//관리자web 부분 start
//사용자 index web_admin
app.get("/admin/web", function(request, response){
	if(request.session.admin_yn=='Y'){
		response.redirect('/admin/web/orgm_list');
	}else{
		fs.readFile('views/admin/web/index.html', "utf-8", function(error, data){
			response.send(layout.include("web_index", data));
		});
	}
});


// ---------------------------------------- admin Web --------------------------------//
var webUrl = "/admin/web";

app.get(webUrl+"/login", admin_login.listener);
app.post(webUrl+"/login", admin_login.listener);

app.get(webUrl+"/logout", admin_logout.listener);
app.post(webUrl+"/logout", admin_logout.listener);

app.get(webUrl+"/orgm_list", orgm_list.listener);
app.post(webUrl+"/orgm_list", orgm_list.listener);

app.get(webUrl+"/company_view", company_view.listener);
app.post(webUrl+"/company_view", company_view.listener);

app.get(webUrl+"/company_write", company_write.listener);
app.post(webUrl+"/company_write", company_write.listener);

app.get(webUrl+"/company_save", company_save.listener);
app.post(webUrl+"/company_save", company_save.listener);

app.get(webUrl+"/company_modify", company_modify.listener);
app.post(webUrl+"/company_modify", company_modify.listener);

app.post(webUrl+"/orgm_del", orgm_del.listener);
app.get(webUrl+"/orgm_del", orgm_del.listener);

app.get(webUrl+"/admin_exceldown", admin_exceldown.listener);
app.post(webUrl+"/admin_exceldown", admin_exceldown.listener);



var fail = require("./custom_module/fail.js");

// ---------------------------------------- user Web --------------------------------//



// ---------------------------------------- user Web --------------------------------//

var search = require("./custom_module/user/web/search.js");
var search_data = require("./custom_module/user/web/search_data.js");
var search_result = require("./custom_module/user/web/search_result.js");
var search_view = require("./custom_module/user/web/search_view.js");

app.get("/", function(request, response) {
	response.render("user/web/index.ejs")
})
app.get("/search", search.listener);
app.post("/search", search.listener);

app.get("/search_data", search_data.listener);
app.post("/search_data", search_data.listener);

app.get("/search_result", search_result.listener);
app.post("/search_result", search_result.listener);

app.get("/search_view/:id", search_view.listener);



//---------------------------------------- user 권한 오류 Web --------------------------------//
var return_back = require("./custom_module/user/web/return_back.js");

app.get("/return_back", return_back.listener);


/*
function keepalive() {
    db.query('select 1', [], function(err, result) {
		if(err) console.log(err);
	    else console.log("select 1");// Successul keepalive
    });
}	

setInterval(keepalive, 1000 * 60 * 60);	
*/

/*서버시작 & 포트*/
var server = http.createServer(app).listen(9080, function(){
	console.log("sangwon_search nodeJs SERVER START~~~!! ~~9080");
});


process.on
(
    'uncaughtException',
    function (err)
    {
        var stack = err.stack;
        var timeout = 1;

        console.log("#######################################################################################################");
        console.log("SERVER CRASHED!");
        console.log("#######################################################################################################");
        console.log(err, stack);
        console.log("#######################################################################################################");

    }
);
