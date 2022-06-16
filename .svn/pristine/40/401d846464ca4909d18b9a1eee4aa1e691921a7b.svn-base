/**
 * New node file
 */

var nodeExcel = require('excel-export');

var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	console.log("********************* admin_exceldown.js enter *********************");
//app.get('/Excel', function(req, res){

	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	var order_type = request.param("order_type")==undefined ? "no" : request.param("order_type");
	
	var sql = "";	

    var conf ={};

    conf.cols = [{
        caption:'번호',
        type:'number',
        width:8
    },{
        caption:'졸업기수',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:8          
    },{
        caption:'이름',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:15
    },{
        caption:'한자',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:15    
    },{
        caption:'졸업반',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:8    
    },{   
        caption:'회사명',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:20
    },{
        caption:'부서',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:15         
    },{
        caption:'직위',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:15
    },{
        caption:'자택주소',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:50
    },{
        caption:'회사주소',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:50
    },{
        caption:'회사번호',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:15
    },{
        caption:'집전화',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:15
    },{
        caption:'휴대폰',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:20
    },{
        caption:'이메일',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:30
    },{
        caption:'비고',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:30
    }
];

    
    sql = "select \n";
    sql += "@RNUM := @RNUM + 1 as num \n";
    sql += ", orgmem_no \n";
    sql += ", orgmem_seqNo \n";
    sql += ", orgmem_grdyear \n";
    sql += ", orgmem_name \n";
    sql += ", orgmem_name_han \n";
    sql += ", orgmem_class \n";
    sql += ", company_name \n";
    sql += ", company_position1 \n";
    sql += ", company_position2 \n";
    sql += ", orgmem_home_addr1 \n";
    sql += ", orgmem_office_addr1 \n";
    sql += ", company_tel1 \n";
    sql += ", company_tel2 \n";
    sql += ", company_tel3 \n";
    sql += ", orgmem_home_tel1 \n";
    sql += ", orgmem_home_tel2 \n";
    sql += ", orgmem_home_tel3 \n";
    sql += ", orgmem_phone1 \n";
    sql += ", orgmem_phone2 \n";
    sql += ", orgmem_phone3 \n";
    sql += ", orgmem_email \n";
    sql += ", remrk \n";
	sql += "from	orgmember a \n";
	sql += ", (SELECT @RNUM := 0 ) r \n";
	sql += "where 1 = 1";

	if(search_text != ''){
		sql += 'and (';
		sql += "orgmem_name like'%" + search_text  + "%' \n" ;
		sql += ')';
	}
	 
	if(order_type=='no'){
	    sql += " order by orgmem_seqNo desc, orgmem_class asc, orgmem_name ";
	}else if(order_type=='name'){
		sql += " order by orgmem_name asc ";
	}
	
	console.log("sql ::: " + sql);
	
	db.query(sql, function(error, results){
		 if(error){
			 //response.send(error);
		 }else{
			var arr = [];
			
			for(i=0; i<results.length; i++){
				var orgmem_seqNo = results[i].orgmem_seqNo;
                var orgmem_name = results[i].orgmem_name;                
                var orgmem_name_han = results[i].orgmem_name_han;
                var orgmem_class = results[i].orgmem_class;
                var company_name = results[i].company_name;                
                var company_position1 = results[i].company_position1;
                var company_position2 = results[i].company_position2;
                var orgmem_home_addr1 = results[i].orgmem_home_addr1;                
                var orgmem_office_addr1 = results[i].orgmem_office_addr1;
                var company_tel = "";
				if(results[i].company_tel1 !=null && results[i].company_tel1 !=''){
					company_tel = results[i].company_tel1 +"-"+ results[i].company_tel2 +"-"+ results[i].company_tel3;
                }else{
                	company_tel = "";
                }	
                var orgmem_home_tel = "";
				if(results[i].company_tel1 !=null && results[i].company_tel1 !=''){
					orgmem_home_tel = results[i].orgmem_home_tel1 +"-"+ results[i].orgmem_home_tel2 +"-"+ results[i].orgmem_home_tel3;
                }else{
                	company_tel = "";
                }	
                var orgmem_phone = "";
				if(results[i].company_tel1 !=null && results[i].company_tel1 !=''){
					orgmem_phone = results[i].orgmem_phone1 +"-"+ results[i].orgmem_phone2 +"-"+ results[i].orgmem_phone3;
                }else{
                	company_tel = "";
                }	
                var orgmem_email = results[i].orgmem_email;
                var remrk = results[i].remrk;                
                				
				a=[i+1, orgmem_seqNo,orgmem_name, orgmem_name_han,orgmem_class, company_name, company_position1,company_position2,orgmem_home_addr1,orgmem_office_addr1, company_tel,orgmem_home_tel,orgmem_phone,orgmem_email,remrk];
			
				arr.push(a);
			}
			
			conf.rows = arr;
			
			var result = nodeExcel.execute(conf);

		    response.setHeader('Content-Type', 'application/vnd.openxmlformats');

		    response.setHeader("Content-Disposition", "attachment; filename=" + "orgmember_export.xlsx");

		    response.end(result, 'binary');
		 }		 
		 
	});
}