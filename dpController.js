var bodyParser=require('body-parser');
var mysql=require('mysql');
var multer=require('multer');
var fileUpload=require('express-fileupload');
var dialog=require('dialog');
var underscore=require('underscore');
var fs = require('fs');

var urlencodedParser = bodyParser.urlencoded({ extended: false});


var obj={
           imageRecords: []
        }
module.exports=function(app)
{
	app.post('/dpUpload',urlencodedParser,function(req,res){
		  if(req.session.user&&req.session)
		  {
		  	//console.log("called",req.session.user);
		  var uname=req.session.user.pname;
		  

		  var storage = multer.diskStorage({
							  destination: function (req, file, cb) {
							    cb(null, './Public/userImages')
							  },
							  filename: function (req, file, cb) {
							    cb(null, uname + '.jpg')
							  }
							});
          var upload = multer({ storage: storage }).single('image');
          upload(req,res,function(err){
              if(err)
              {
              	return res.send("error in uploading file");
              }
              else
              {
              	var connection = mysql.createConnection ({
				host : 'localhost',
				database : 'matrimony',//'DBMSproject',
				user : 'root',
				password : ''//'root',
			    });

                var imageName=uname+'.jpg';
                console.log(imageName);
                console.log(uname);
		
			    connection.query("UPDATE users SET image=? WHERE pname = ? ",[imageName,uname],function(err,results,fields){
                        if(err)
                        {
                        	console.log(err);
                        	return console.log("Not able to upload to db");
                        }
                        
			    });
                connection.query("SELECT pname,image FROM users",function(err,results,fields){
                        for(let i=0;i<results.length;i++)
                        {
                        	if(results[i]['image']!=null)
                        	{
                        		let object={name:results[i]['pname'],
                                        src:results[i]['image']}
                        		if(underscore.findWhere(obj.imageRecords,object)==null)
                        		{
                        			obj.imageRecords.push(object);
                        		}
                        		
                        	}
                        }
                        jsonstr=JSON.stringify(obj);
                        fs.readFile('images.json',function(err,data){

                               fs.writeFile('images.json',jsonstr,'utf-8',function(err){
								if(err)
								     	return console.log(err);
								     console.log("data added again!!");
								});
                        });
						
                });

              }
          });

          res.redirect('/dashboard');
		  }
		  
		  
	});
}