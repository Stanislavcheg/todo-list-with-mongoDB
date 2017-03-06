var mongoose = require('mongoose');
var ProjectModel = require('./../models/projectModel');
var db = {};

db.setUpConnection = function() {
	mongoose.connect('mongodb://admin:admin@ds031571.mlab.com:31571/todolists');
}


db.getProjects = function () {
	return ProjectModel.find();
}

db.createProject = function (data) {
	var proj = new ProjectModel({
	name : data.name,
	tasks: data.tasks,
	id: data.id
	});
	return proj.save();
}

db.deleteProject = function (data) {
	return ProjectModel.find({id: data.id}).remove();
}

db.editProjectTitle = function(data) {
	return ProjectModel.findOneAndUpdate({id: data.id}, {name: data.name});
}

db.getTasks = function (projectId) {
	return ProjectModel.find({id: projectId}).tasks;
}

db.updateTasks = function (data) {
	return ProjectModel.findOneAndUpdate({id: data.id}, {tasks: data.tasks});
}

module.exports = db;