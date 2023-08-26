var express = require('express');
var path=require('path');
var fs = require('fs');
var app = express();
var session = require('express-session');
var moment = require('moment');
var bodyParser = require('body-parser');
var mysql = require('mysql');
const split = require('split-string');
const querystring = require('querystring'); 
const db = require('./config.js');
var connection = db.connection;
/*
  APIs

  get /
  get /login
  get /register
  get /dashboard
  get /dashboard/preference
  get /dashboard/userprofile/shortlist
  get /dashboard/userprofile/yourLikes
  get /dashboard/userprofile/likedBy
  post /shortlist/like
  post /shortlist/delete
  post /love
  post /like
  post /dashboard/like
  post /login
  post /register
  post /dashboard/Userprofile
  get /dashboard/userNameError
  post /dashboard/delete
  get /dashboard/friendname
  post /feedback
  get /logout

*/
var dpController=require('./dpController.js');
var likedByMethod=require('./methods.js');

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration:  10 * 1000,
  activeDuration: 10 * 1000,
  resave: true,
  saveUninitialized: true
}));

app.use(express.static(require('path').join(__dirname + '/Public')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

users = [];
connections = [];

var urlencodedParser = bodyParser.urlencoded({ extended: false})

app.get('/',function(req,res) {
	res.render( 'start', {
		username: 'hi',
		passwordIncorrect: ' ',
		userNotRegistered: ' '
	});
})
app.get('/login',function(req,res) {
	console.log(req.session.user);
	res.render( 'login', {
		passwordIncorrect: ' ',
		userNotRegistered: ' ',
		loginAgain:' '
	});
})

app.get('/register',function(req,res) {
	res.render( 'register', {
		pnameTaken:' ',
		emailTaken:' '
	});
})
var members=[[]],others=[[]];
app.get('/dashboard',function(req,res) {
	if(req.session.user&&req.session){
		var otherUsers=[[]];
					connection.query('SELECT * FROM users WHERE email != ?',[req.session.user.email],function(err,resultRows,fields){
                              res.render( 'welcome', {
								user: req.session.user,
					            members:resultRows

							});
					});
		
	}
	else{
		console.log('Login again!!');
		res.render('login',{
			passwordIncorrect: ' ',
			userNotRegistered: ' ',
			loginAgain:'Session expired, Login Again!! '
		});
	}
});
app.get('/dashboard/preference', function(req,res){
	if(req.session && req.session.user)
	{
		var gender=req.query.gender;
		var fromAge=req.query.fromAge;
		var toAge=req.query.toAge;
		var religion=req.query.religion;
		var motherTongue=req.query.motherTongue;
		var pname=req.session.user.pname;
		//var dob=req.session.user.DOB;
		//var shortList;
		connection.query('select shortlisted from shortlist where user = ?',[pname],function(err,loved,fields)
		{
			if(err)
			{
				console.log("error at query");
					res.send({
						"code":400,
						"failed":"Error ocurred"
					});
			}
			if(loved.length > 0)
			{	
				loved=loved[0].shortlisted;
				loved=JSON.stringify(loved);
				console.log(" shortlist string is : "+loved);
				var shortList=split(loved);
				console.log("inside "+shortList);
			}
			else
			{
				var shortList=' ';
			}
			if(req.query.gender)
			{
				req.session.user.p.gender = req.query.gender;
				req.session.user.p.toAge = req.query.toAge;
				req.session.user.p.fromAge = req.query.fromAge;
				req.session.user.p.religion = req.query.religion;
				req.session.user.p.motherTongue = req.query.motherTongue;
				console.log(req.session.user.p);
			}
			var sql1='SELECT liked from likes where user=?';
			connection.query(sql1,[pname],function(err,likes,fields){
				if(err){
					console.log("error at query");
					res.send({
						"code":400,
						"failed":"Error ocurred"
					});

				}
				if(likes.length==0)
				{
					var sql='SELECT * from users WHERE gender=? and year(curdate())-year(DOB) >= ? and year(curdate())-year(DOB) <= ? and religion=? and motherTongue=?';
					connection.query(sql,[gender,fromAge,toAge,religion,motherTongue],function(err,results,fields){
						if(err){
							console.log("error at query");
							res.send({
								"code":400,
								"failed":"Error ocurred"
							});
						}
						else{
							console.log(results);
							res.render('preference',{
								user:req.session.user,
								members:results,
								loved:shortList
							});
						}
					});
				}
				else
				{
					likes=likes[0].liked;
					likes=JSON.stringify(likes);
					console.log("string is : "+likes);
					var likeList=split(likes);
					//var likeList=JSON.parse(likeList);
					console.log(likeList);
					var sql='SELECT * from users WHERE gender=? and year(curdate())-year(DOB) >= ? and year(curdate())-year(DOB) <= ? and religion=? and motherTongue=? and pname not in ( ?)';
					connection.query(sql,[gender,fromAge,toAge,religion,motherTongue,likeList],function(err,results,fields){
						if(err){
							console.log("error at query");
							res.send({
								"code":400,
								"failed":"Error ocurred"
							});
						}
						else{
							console.log(results);
							res.render('preference',{
								user:req.session.user,
								members:results,
								loved:shortList
							});
						}
					});
				}
			});
		});
	}
	else{
		console.log('Login again!!');
		res.render('login',{
			passwordIncorrect: ' ',
			userNotRegistered: ' ',
			loginAgain:'Session expired, Login Again!! '
		});
	}
});
app.get('/dashboard/userProfile/shortList', function(req,res){
	if(req.session && req.session.user)
	{
		var pname=req.query.pname;
		//var dob=req.session.user.DOB;
		var shortList;
		var likeList;
		connection.query('select shortlisted from shortlist where user = ?',[pname],function(err,loved,fields)
		{
			if(err)
			{
				console.log("error at query");
					res.send({
						"code":400,
						"failed":"Error ocurred"
					});
			}
			if(loved.length > 0)
			{	
				loved=loved[0].shortlisted;
				loved=JSON.stringify(loved);
				console.log(" shortlist string is : "+loved);
				shortList=split(loved);
				console.log("inside "+shortList);
			}
			else
			{
				shortList=' ';
			}
			connection.query('SELECT liked from likes where user = ?',[pname],function(err,liked,fields){
				if(err)
				{
					console.log("error at query");
						res.send({
							"code":400,
							"failed":"Error ocurred"
						});
				}
				if(liked.length > 0)
				{	
					liked=liked[0].liked;
					liked=JSON.stringify(liked);
					console.log(" shortlist string is : "+liked);
					var likeList=split(liked);
					console.log("inside "+likeList);
				}
				else{
					likeList=' ';
				}
				var sql1='SELECT * from users where pname in (?) and pname not in (?)';
				connection.query(sql1,[shortList,likeList],function(err,results,fields)
				{
					if(err)
					{
						console.log("error at query");
						res.send({
							"code":400,
							"failed":"Error ocurred"
						});
					}
					else
					{
						console.log(results);
						res.render('shortlist',{
							user:req.session.user,
							members:results
						});
					}
				});
			});
		});
	}
	else{
		console.log('Login again!!');
		res.render('login',{
			passwordIncorrect: ' ',
			userNotRegistered: ' ',
			loginAgain:'Session expired, Login Again!! '
		});
	}
});
app.get('/dashboard/userProfile/yourLikes', function(req,res){
	if(req.session && req.session.user)
	{
		var pname=req.query.pname;
		console.log(pname+" session is "+req.session.user);
		//var dob=req.session.user.DOB;
		var shortList;
		var likeList;
		connection.query('SELECT liked from likes where user = ?',[pname],function(err,liked,fields)
		{
			if(err)
			{
				console.log("error at query");
					res.send({
						"code":400,
						"failed":"Error ocurred"
					});
					res.end();
			}
			if(liked.length > 0)
			{	
				liked=liked[0].liked;
				liked=JSON.stringify(liked);
				console.log(" shortlist string is : "+liked);
				var likeList=split(liked);
				console.log("inside "+likeList);
			}
			else{
				likeList=' ';
			}
			var sql1='SELECT * from users where pname in (?)';
			connection.query(sql1,[likeList],function(err,results,fields)
			{
				if(err)
				{
					console.log("error at query");
					res.send({
						"code":400,
						"failed":"Error ocurred"
					});
					res.end();
				}
				else
				{
					console.log(results);
					res.render('likes',{
						user:req.session.user,
						members:results,
						flag:1,
						friendFlag:0

					});
					res.end();
				}
			});
		});
	}
	else{
		console.log('Login again!!');
		res.render('login',{
			passwordIncorrect: ' ',
			userNotRegistered: ' ',
			loginAgain:'Session expired, Login Again!! '
		});
		res.end();
	}
});
app.get('/dashboard/userProfile/likedBy', function(req,res){
	if(req.session && req.session.user)
	{
		var pname=req.query.pname;
		//var dob=req.session.user.DOB;
		var likeList;
		connection.query('SELECT likedBy from rlikes where user = ?',[pname],function(err,liked,fields)
		{
			if(err)
			{
				console.log("error at query");
					res.send({
						"code":400,
						"failed":"Error ocurred"
					});
			}
			if(liked.length > 0)
			{	
				liked=liked[0].likedBy;
				liked=JSON.stringify(liked);
				console.log(" likelist string is : "+liked);
				likeList=split(liked);
				console.log("inside "+likeList);
			}
			else{
				likeList=' ';
			}
			var sql1='SELECT * from users where pname in (?)';
			connection.query(sql1,[likeList],function(err,results,fields)
			{
				if(err)
				{
					console.log("error at query");
					res.send({
						"code":400,
						"failed":"Error ocurred"
					});
				}
				else
				{
					console.log(results);
					res.render('likes',{
						user:req.session.user,
						members:results,
						flag:0,
						friendFlag:0
					});
				}
			});
		});
	}
	else{
		console.log('Login again!!');
		res.render('login',{
			passwordIncorrect: ' ',
			userNotRegistered: ' ',
			loginAgain:'Session expired, Login Again!! '
		});
	}
});
app.post('/shortList/like',urlencodedParser,function(req,res){
	{
		if(req.session.user&&req.session)
		{

			var userName=req.session.user.pname;
			var liked=req.body.like;
			likedByMethod.insertValues(liked,userName);
			connection.query("SELECT * FROM likes where user = ?",[userName],function(err,results,fields){
				if(err)
	            {
	            	console.log("error at query");
					res.send({
					"code":400,
					"failed":"Error ocurred"
					});
	            }
	            else
	            {
	            	if(results.length > 0)
	            	{
	            		connection.query("UPDATE likes SET liked = ? where user=?",[liked,userName],function(err,results,fields){
	            			if(err)
				            {
				            	console.log("error at query");
								res.send({
								"code":400,
								"failed":"Error ocurred"
								});
				            }
				            else
				            {
		            			console.log(userName+" "+liked);
	            				res.redirect('/dashboard/userProfile/shortList');
	            			}
	            		});
	            	}
	            	else
	            	{
	            		connection.query("INSERT INTO likes values('"+userName+"','"+liked+"')",function(err,resultRows,fields)
						{
				            if(err)
				            {
				            	console.log("error at query");
								res.send({
								"code":400,
								"failed":"Error ocurred"
								});
				            }
				            else{
				            	console.log(userName+" "+liked);
				            	res.redirect('/dashboard/userProfile/shortList');
				            }
						});
	            	}
	            }
			});	
		} 
		else{
		console.log('Login again!!');
			res.render('login',{
				passwordIncorrect: ' ',
				userNotRegistered: ' ',
				loginAgain:'Session expired, Login Again!! '
			});
		}
	}
});
app.post('/shortList/delete',urlencodedParser,function(req,res){
	{
		if(req.session.user&&req.session)
		{

			var userName=req.session.user.pname;
			connection.query("DELETE FROM shortlist where user = ?",[userName],function(err,results,fields){
				if(err)
	            {
	            	console.log("error at query");
					res.send({
					"code":400,
					"failed":"Error ocurred"
					});
	            }
	            else
	            {
	            	console.log(results.affectedRows);
	            	res.redirect('/dashboard/userProfile/shortList');
	            }
			});	
		} 
		else{
		console.log('Login again!!');
			res.render('login',{
				passwordIncorrect: ' ',
				userNotRegistered: ' ',
				loginAgain:'Session expired, Login Again!! '
			});
		}
	}
});
app.post('/dashboard/userProfile/delete',urlencodedParser,function(req,res){
	{
		if(req.session.user&&req.session)
		{

			var userName=req.body.del;
			connection.query("DELETE FROM users where pname = ?",[userName],function(err,results,fields){
				if(err)
	            {
	            	console.log("error at query");
					res.send({
					"code":400,
					"failed":"Error ocurred"
					});
	            }
	            else
	            {
	            	console.log(results.affectedRows);
	            	res.redirect('/');
	            }
			});	
		} 
		else{
		console.log('Login again!!');
			res.render('login',{
				passwordIncorrect: ' ',
				userNotRegistered: ' ',
				loginAgain:'Session expired, Login Again!! '
			});
		}
	}
});
app.post('/love',urlencodedParser,function(req,res){
	{
		if(req.session.user&&req.session)
		{
			var userName=req.session.user.pname;
			var shortlisted=req.body.love;
			connection.query("SELECT * FROM shortlist where user = ?",[userName],function(err,results,fields){
				if(err)
	            {
	            	console.log("error at query");
					res.send({
					"code":400,
					"failed":"Error ocurred"
					});
	            }
	            else
	            {

	            	if(results.length > 0)
	            	{
	            		connection.query("UPDATE shortlist SET shortlisted = ? where user=?",[shortlisted,userName],function(err,results,fields){
	            			if(err)
				            {
				            	console.log("error at query");
								res.send({
								"code":400,
								"failed":"Error ocurred"
								});
				            }
				            else
				            {
		            			console.log(userName+" "+shortlisted);
		            			const query = querystring.stringify({
						          "gender": req.session.user.p.gender,
						          "toAge": req.session.user.p.toAge,
						          "fromAge":req.session.user.p.fromAge,
						          "religion":req.session.user.p.religion,
						          "motherTongue":req.session.user.p.motherTongue
					      		});
	            			res.redirect('/dashboard/preference?' + query);
	            			}
	            		});
	            	}
	            	else
	            	{
	            		connection.query("INSERT INTO shortlist values('"+userName+"','"+shortlisted+"')",function(err,resultRows,fields)
						{
				            if(err)
				            {
				            	console.log("error at query");
								res.send({
								"code":400,
								"failed":"Error ocurred"
								});
				            }
				            else{
				            	console.log(userName+" "+shortlisted);
				            	const query = querystring.stringify({
							          "gender": req.session.user.p.gender,
							          "toAge": req.session.user.p.toAge,
							          "fromAge":req.session.user.p.fromAge,
							          "religion":req.session.user.p.religion,
							          "motherTongue":req.session.user.p.motherTongue
						      	});
				            	res.redirect('/dashboard/preference?' + query);
				            }
						});
	            	}
	            }
			});	
		} 
		else{
		console.log('Login again!!');
			res.render('login',{
				passwordIncorrect: ' ',
				userNotRegistered: ' ',
				loginAgain:'Session expired, Login Again!! '
			});
		}
	}
});

/*
likes(user,liked);
SQL Triggers MUST
1)
create trigger firstInsert before insert on likes for each row 
begin set NEW.liked=concat(".",NEW.liked,"."); 
end//
Query OK, 0 rows affected (0.08 sec)
2)
create trigger likes before update on likes for each row  begin 
set NEW.liked=concat(".",NEW.liked,".",OLD.liked,"."); 
end//
*/
app.post('/like',urlencodedParser,function(req,res){
	{
		if(req.session.user&&req.session)
		{

			var userName=req.session.user.pname;
			var liked=req.body.like;
			likedByMethod.insertValues(liked,userName);
			connection.query("SELECT * FROM likes where user = ?",[userName],function(err,results,fields){
				if(err)
	            {
	            	console.log("error at query");
					res.send({
					"code":400,
					"failed":"Error ocurred"
					});
	            }
	            else
	            {
	            	if(results.length > 0)
	            	{
	            		connection.query("UPDATE likes SET liked = ? where user=?",[liked,userName],function(err,results,fields){
	            			if(err)
				            {
				            	console.log("error at query");
								res.send({
								"code":400,
								"failed":"Error ocurred"
								});
				            }
				            else
				            {
		            			console.log(userName+" "+liked);
		            			const query = querystring.stringify({
						          "gender": req.session.user.p.gender,
						          "toAge": req.session.user.p.toAge,
						          "fromAge":req.session.user.p.fromAge,
						          "religion":req.session.user.p.religion,
						          "motherTongue":req.session.user.p.motherTongue
					      		});
	            			res.redirect('/dashboard/preference?' + query);
	            			}
	            		});
	            	}
	            	else
	            	{
	            		connection.query("INSERT INTO likes values('"+userName+"','"+liked+"')",function(err,resultRows,fields)
						{
				            if(err)
				            {
				            	console.log("error at query");
								res.send({
								"code":400,
								"failed":"Error ocurred"
								});
				            }
				            else{
				            	console.log(userName+" "+liked);
				            	const query = querystring.stringify({
							          "gender": req.session.user.p.gender,
							          "toAge": req.session.user.p.toAge,
							          "fromAge":req.session.user.p.fromAge,
							          "religion":req.session.user.p.religion,
							          "motherTongue":req.session.user.p.motherTongue
						      	});
				            	res.redirect('/dashboard/preference?' + query);
				            }
						});
	            	}
	            }
			});	
		} 
		else{
		console.log('Login again!!');
			res.render('login',{
				passwordIncorrect: ' ',
				userNotRegistered: ' ',
				loginAgain:'Session expired, Login Again!! '
			});
		}
	}
});
app.post('/dashboard/like',urlencodedParser,function(req,res){
	if(req.session.user&&req.session)
		{
			var userName=req.session.user.pname;
			var liked=req.body.like;
			likedByMethod.insertValues(liked,userName);
			connection.query("SELECT * FROM likes where user = ?",[userName],function(err,results,fields){
				if(err)
	            {
	            	console.log("error at query");
					res.send({
					"code":400,
					"failed":"Error ocurred"
					});
	            }
	            else
	            {
	            	if(results.length > 0)
	            	{
	            		connection.query("UPDATE likes SET liked = ? where user=?",[liked,userName],function(err,results,fields){
	            			if(err)
				            {
				            	console.log("error at query");
								res.send({
								"code":400,
								"failed":"Error ocurred"
								});
				            }
				            else
				            {
		            			console.log(userName+" "+liked);
		            		    const query = querystring.stringify({
							          "partner": liked
						      	});
				            	res.redirect('/dashboard/userProfile?' + query);
	            			}
	            		});
	            	}
	            	else
	            	{
	            		connection.query("INSERT INTO likes values('"+userName+"','"+liked+"')",function(err,resultRows,fields)
						{
				            if(err)
				            {
				            	console.log("error at query");
								res.send({
								"code":400,
								"failed":"Error ocurred"
								});
				            }
				            else{
				            	console.log(userName+" "+liked);
				            	const query = querystring.stringify({
							          "partner": liked
						      	});
				            	res.redirect('/dashboard/userProfile?' + query);
				            }
						});
	            	}
	            }
			});	
		} 
		else{
		console.log('Login again!!');
			res.render('login',{
				passwordIncorrect: ' ',
				userNotRegistered: ' ',
				loginAgain:'Session expired, Login Again!! '
			});
		}
	});
       
app.post('/login',urlencodedParser,function(req,res){
	var	email = req.body.userEmail;
	var	password = req.body.userPassword;
	
	connection.query('SELECT * FROM users WHERE email = ?',[email],function(error, results, fields){
		if(error){
			console.log("error");
			res.redirect('/login');
		}
		if(email.length == 0 || password.length == 0)
		{
		    res.render( 'login', {
			passwordIncorrect: 'Insufficient Credentials',
			userNotRegistered: ' ',
			loginAgain: ' '
			});	
		}
        else{
			if(results.length > 0){
				if(results[0].pass==password){
					var preference={
						gender:' ',
						toAge:' ',
						fromAge:' ',
						religion:' ',
						motherTongue:' '
					};
			
					
					var newUser = {
						fname:results[0].fname, 
						lname:results[0].lname, 
						pname:results[0].pname,
						gender:results[0].gender,
						description:results[0].about,
						DOB:results[0].dob,
						religion:results[0].religion,
						motherTongue:results[0].motherTongue,
						userHeight:results[0].height,
						mStatus:results[0].mStatus,
						privacy:results[0].privacy,
						qualification:results[0].qualification,
						college:results[0].college,
						occupation:results[0].occupation,
						country:results[0].country,
						salary:results[0].salary,
						email: req.body.userEmail, 
						password: req.body.userPassword,
						p:preference,
						friend:''
					};
					req.session.user=newUser;
					console.log("Login Successful");
					res.redirect('/dashboard');
				}
				else{
					console.log("Password Incorrect");
					res.render( 'login', {
						passwordIncorrect: 'password Incorrect',
						userNotRegistered: ' ',
						loginAgain: ' '
					});
				}
			}
			else{
				console.log("Email Doesn't exist");
				res.render( 'login', {
					userNotRegistered: 'User Not Registered!! Click the Register button',
					passwordIncorrect: ' ',
					loginAgain: ' '
				});
			}
		}
	});
});



app.post('/register',urlencodedParser,function(req,res){
	var fname = req.body.fname;
	var lname = req.body.lname;
	var pname = req.body.pname; 
	var gender = req.body.gender;
	var email = req.body.email;
	var password = req.body.password;
	var description = req.body.description;
	var DOB = req.body.DOB;
	var religion = req.body.religion;
	var motherTongue = req.body.motherTongue;
	var userHeight = req.body.userHeight;
	var mStatus = req.body.mStatus;
	var privacy = req.body.privacy;
	var qualification = req.body.qualification;
	var college = req.body.college;
	var occupation = req.body.occupation;
	var country = req.body.country;
	var salary = req.body.salary;
	connection.query('SELECT * FROM users WHERE pname = ?',[pname],function(error, results, fields)
	{
		if(error){
			console.log("error at query");
			res.send({
				"code":400,
				"failed":"Error ocurred"
			});
		}
		else{
			if(results.length > 0)
			{
				console.log("USER EXISTS");
				res.render('register', {
					pnameTaken: 'Profile name taken.. choose other Profile Name!!',
					emailTaken: ' '
				});
			}
			else{
 
				connection.query("INSERT INTO users (fname,lname,pname,gender,email,pass,about,dob,religion,motherTongue,height,mStatus,privacy,qualification,college,occupation,country,salary) values ('"+fname+"','"+lname+"','"+pname+"','"+gender+"','"+email+"','"+password+"','"+description+"','"+DOB+"','"+religion+"','"+motherTongue+"','"+userHeight+"','"+mStatus+"','"+privacy+"','"+qualification+"','"+college+"','"+occupation+"','"+country+"','"+salary+"')",function(error, results, fields)
				{
					            if(error)
								{
									console.log("error at inserting values");
									res.send({
										"code":400,
										"failed":"Error ocurred"
									});
								}
								else
								{
									console.log("Register Successful");
									console.log(pname+" "+email+" "+password);
									//res.sendFile(__dirname+"/login.html");
									res.redirect('/login');
	
								}
				});
			}
		}
	});
});

app.get('/dashboard/userProfile',function(req,res){
	 if(req.session && req.session.user)
	 {
	 var user=req.session.user.pname;
	 var likedUser=req.query.partner;

     connection.query("SELECT * FROM users WHERE pname = ? ",[likedUser],function(err,result,fields){
             if(err)
             {
             	       console.log("error at retriving data values");
						res.send({
							"code":400,
							"failed":"Error ocurred"
						});
             }
             else
             {
             	console.log("u:",user,"likedUser:",likedUser);
             	if(result.length>0)
             	{
             		 connection.query("SELECT * FROM likes WHERE user = ? LIMIT 1",[user],function(err,resRow,fields){
                            if(err){
									console.log("error at query");
									res.send({
										"code":400,
										"failed":"Error ocurred"
									});

								}
						    var likes='';
							var likeList='';
						    if(resRow.length==1)
						    {
						    	likes=resRow[0].liked;
						    	console.log(likes);
						    	likes=JSON.stringify(likes);
						    	console.log(likes);
								console.log("string is : "+likes);
								likeList=split(likes);
								//var likeList=JSON.parse(likeList);
								console.log("ll:",likeList);
						    }
						    	

								var User = {
								fname:result[0].fname, 
								lname:result[0].lname, 
								pname:result[0].pname,
								gender:result[0].gender,
								description:result[0].about,
								DOB:result[0].dob,
								religion:result[0].religion,
								motherTongue:result[0].motherTongue,
								userHeight:result[0].height,
								mStatus:result[0].mStatus,
								privacy:result[0].privacy,
								qualification:result[0].qualification,
								college:result[0].college,
								occupation:result[0].occupation,
								country:result[0].country,
								salary:result[0].salary,
								email: result[0].email,
								image:result[0].image
							    };

			                    res.render('profile',{
			                    	likedUsers:likeList,
			                    	user:User,
			                    	calledUser: req.session.user
			                    })
							
             		 });
                     
             	}
             	else
             	{
             		var u=req.query.partner;
             		res.redirect('/dashboard/UserNameError/?nam='+u);
             	}
             }
     });
     }
});
app.get('/dashboard/UserNameError',function(req,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	console.log(req.query.nam);
	res.write("OOPS ! "+req.query.nam+"  User Name doesn't exist !!");
});
app.get('/dashboard/friendname',function(req,res) {
	if(req.session&&req.session.user)
	{
         req.session.user.friend=req.query.frndname;
         var Friendname=req.query.frndname;
         var pname=req.session.user.pname;
         console.log("FrName",Friendname);
         connection.query("SELECT * FROM chats WHERE (username = ? AND friendname = ?) OR (username = ? AND friendname = ?) ",[pname,Friendname,Friendname,pname],
         	                       function(err,results,fields){
         	            if(err)
			 	        {
				           	console.log("error at query");
								res.send({
								"code":400,
								"failed":"Error ocurred"
								});
				        }
				        else
				        {
				   
							var shortList;
							var likeList;
							connection.query('SELECT liked from likes where user = ?',[pname],function(err,liked,fields)
							{
								if(err)
								{
									console.log("error at query");
										res.send({
											"code":400,
											"failed":"Error ocurred"
										});
										res.end();
								}
								if(liked.length > 0)
								{	
									liked=liked[0].liked;
									liked=JSON.stringify(liked);
									console.log(" shortlist string is : "+liked);
									var likeList=split(liked);
									console.log("inside "+likeList);
								}
								else{
									likeList=' ';
								}
								var sql1='SELECT * from users where pname in (?)';
								connection.query(sql1,[likeList],function(err,Results,fields)
								{
									if(err)
									{
										console.log("error at query");
										res.send({
											"code":400,
											"failed":"Error ocurred"
										});
										res.end();
									}
									else
									{
										/*console.log(Results);
										console.log(results);*/
										res.render('likes',{
											user:req.session.user,
											members:Results,
											flag:1,
											friendFlag:1,
											friendname:Friendname,
                                            chats:results,
                                            moment:moment
                                         
										});

										res.end();
									}

								});
							});

				        }

         });
	}
});
app.post('/dashboard/chatlog',urlencodedParser,function(req,res){
	if(req.session&&req.session.user)
	{
		var pname=req.session.user.pname;
		var frndname=req.body.frndname;
		var msg=req.body.message;
		connection.query("INSERT INTO chats (username,friendname,userchat) VALUES ('"+pname+"','"+frndname+"','"+msg+"')",function(err,results,fiedls){
                           if(err)
			 	            {
				            	console.log("error at query");
								res.send({
								"code":400,
								"failed":"Error ocurred"
								});
				            }
				            else
				            {
				            	res.redirect('/dashboard/friendname?frndname='+frndname);
				            }
		});
	}
    
});
app.post('/feedback',urlencodedParser,function(req,res){
	if(req.session&&req.session.user)
	{
		var username=req.session.user.pname;
		var rating=req.body.star;
		connection.query("UPDATE users SET feedback = ?  WHERE pname = ? ",[rating,username],function(err,results,fields){
                            if(err)
			 	            {
				            	console.log("error at query");
								res.send({
								"code":400,
								"failed":"Error ocurred"
								});
				            }
				            else{
				            	console.log("rating updated");
				            	res.redirect('/dashboard');
				            }
		});
	}
   
});
app.get('/logout', function(req, res) {
  	req.session.destroy(function(err){
  		if(err){
  			console.log(err);
  		}
  		else {
  			res.redirect('/login');
  		}
  	});
});

dpController(app);
var server = app.listen(8081, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log(host+" "+port);
})