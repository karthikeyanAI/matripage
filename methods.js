var express = require('express');
var path=require('path');
const split = require('split-string');
var fs = require('fs');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
const db = require('./config.js');
var connection = db.connection;

module.exports.insertValues = function(pname, likedBy) 
{
	connection.query("SELECT * FROM rlikes where user = ?",[pname],function(err,results,fields)
	{
		if(err)
        {
           	console.log("error at query");
        }
        else
        {
          	if(results.length > 0)
           	{
           		console.log("db",likedBy,pname);
           		connection.query("UPDATE rlikes SET likedBy = ? where user=?",[likedBy,pname],function(err,results,fields)
           		{
           			if(err)
		            {
		            	console.log("error at query");
		            }
		            else
		            {
            			console.log("likedBy values "+pname+" "+likedBy);
           			}
           		});
           	}
           	else
           	{
           		console.log("dber",likedBy,pname);
           		connection.query("INSERT INTO rlikes values('"+pname+"','"+likedBy+"')",function(err,resultRows,fields)
				{
		            if(err)
		            {
		            	console.log("error at query");
		            }
		            else{
		            	console.log("likedBy values "+pname+" "+likedBy);
		            }
				});
           	}
   		}
   	});
}