const express = require('express');

const app = express();

app.listen(3000,() => {
	console.log("app is running on Port 3000")	
})

app.use(function(req,res,next)
{
	res.header("Access-control-Allow-Origin","*");
	res.header("Access-control-Allow-Headers","Origin,X-Requestsed-With,Content-Type,Accept");
	next();
})
app.get('/hello', function (req,res) {
 
 res.json({a:1,b:2});
 console.log("Request Active");

})

app.post('/signin',(req,res)=>{
	res.send("sigining")
})
/*

/ --> res = this is working 

/login --> POST = success / fail

/ --> POST = user

/profile/:userId --> GET = user



*/