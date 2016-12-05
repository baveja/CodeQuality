/**
 * Connect through mongoDb
 */



var express = require('express');
var bodyParser= require('body-parser');
var app= express();
console.log("Hello");
var port = process.env.PORT || 8080;        // set our port
console.log(port);


app.use(bodyParser.json()); 



var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://127.0.0.1:27017/test');
var codeSchema= new mongoose.Schema({
	questionId: String,
	  question: String
	  
	});

var Bear = mongoose.model('Bear', codeSchema);
console.log(db);




app.get('/questions', function(req, res) {
	return Bear.find().limit(5).exec(function(err,questions){
		if (!err) {
			  console.log("DOne");
			  res.header('Access-Control-Allow-Origin', '*');
			  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
			  
		      return res.send(questions);
		    } else {
		      return console.log(err);
		    }
	});
    //res.json({ message: 'hooray! welcome to our api!' });   
});



// create a bear (accessed at POST http://localhost:8080/api/bears)
app.post('/questions',function(req, res) {
	
	for(var i=0;i<req.body.length;i++){
		var bear = new Bear();      // create a new instance of the Bear model
		bear.question = req.body[i].question;
	    bear.questionId = req.body[i].questionId;// set the bears name (comes from the request)
	    
	    //Save it in databse
	    bear.save(function(err) {
	    	if (!err) {
	    	      return console.log("created");
	    	    } else {
	    	      return console.log(err);
	    	    }

	    });
	}
	
});

app.options('/questions', function(req,res){
	
})


var server = app.listen(8081, function () {

	  var host = server.address().address
	  var port = server.address().port

	  console.log("Example app listening at http://%s:%s", host, port)

	})

/*// Load mongoose package
var mongoose = require('mongoose');
// Connect to MongoDB and create/use database called todoAppTest
mongoose.connect('mongodb://127.0.0.1/codeQualityTest');

var codeSchema= new mongoose.Schema({
	  dname: String,
	  rname: String,
	  apiName: String,
	  apiNumber: Integer,
	  updated_at: { type: Date, default: Date.now },
	});

//Create a model based on the schema
var Todo = mongoose.model('Todo', codeSchema);*/