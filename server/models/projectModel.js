var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var projectSchema = new Schema({
	name: {type: String, required: true},
	tasks: {type: [{
		name : {type: String, required: true},
		isDone: {type: Boolean},
		id    : {type: String, required: true}
	}]},
	id   : {type: String, required: true}
}); 
var projectModel = mongoose.model('projectModel', projectSchema);
module.exports = projectModel;



