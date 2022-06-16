var mysql = require('mysql');

/*var mysqlConfig = {
	host : '1.255.226.229',
	port : '3306',
	user : 'sangwon_search',
	database : 'sangwon_search',
	password : 'flash21!@'
}

exports.connect = mysql.createConnection(mysqlConfig);
console.log("===========>>>>>>>>>>>>> mysql.createConnection!! \n");*/


// 커넥션 풀 사용 2019.08.09 CJH
var mysqlConfig = {
		host : '1.255.226.229',
		port : '3306',
		user : 'sangwon_search',
		database : 'sangwon_search',
		password : 'flash21!@'
}

exports.connect = mysql.createPool(mysqlConfig);
console.log("===========>>>>>>>>>>>>> mysql.createPool!! \n");

//밑에 코드는 백업용.
/*var mysql = require('mysql');

var mysqlConfig = {
	host : '1.255.226.229',
	port : '3306',
	user : 'sangwon_search',
	database : 'sangwon_search',
	password : 'flash21!@'
    //,connectionLimit : 50,
	//waitForConnection : false
}

exports.connect = mysql.createConnection(mysqlConfig);



 * 2019. 06. 12 아래 코드 추가 : 조창현
 * DB연결 실패시 다시 연결(2초)
 * *
function handleDisconnect() {
	connection = mysql.createConnection(mysqlConfig);
	
	connection.connect(function(err) {
	    if(err) {
	    	console.log('error when connecting to db:', err);
	    	setTimeout(handleDisconnect, 2000);
	    }
	});
	
	connection.on('error', function(err) {
	    console.log('db error', err);
	    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
	    	handleDisconnect();
	    } else {
	    	throw err;
	    }
  });
};

handleDisconnect();*/