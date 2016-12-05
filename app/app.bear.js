/**
 * 
 */

var mongoose = require('mongoose');

var codeSchema= new mongoose.Schema({
	questionId: String,
	  question: String
	  
	});

module.exports = mongoose.model('Bear', codeSchema);