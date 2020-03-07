var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(express.static('./'));
var db_functions=require('./db_assets/db_intialize.js');
const port = 3001
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");
    next();
  
});
app.use(bodyParser.json({extended : true}));


app.get('/get',(req,res)=>{console.log("IN");res.end("o");});
app.post('/register',db_functions.createUser);
app.post('/login',db_functions.getUser) ;
app.post('/contactus',db_functions.contactUser);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))