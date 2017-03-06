var express    = require('express');
var bodyParser = require('body-parser');
var db         = require('./server/utils/DbUtils');
var app        = express();

db.setUpConnection();
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res){
	res.sendfile('index.html');
});

app.get('/projects', function(req, res){
	db.getProjects().then(function(data){
		res.send(data);
 	})
});

app.post('/projects', function(req, res){
	db.createProject(req.body).then(function(data){
		res.send(data);
 	});
});

app.post('/projectEdit', function(req, res){
	db.editProjectTitle(req.body).then(function(data){
		res.send(data);
 	});
});

app.post('/projectRemove', function(req, res){
	db.deleteProject(req.body).then(function(data){
		res.send(data);
 	});
});

app.post('/tasks', function(req, res){
	db.updateTasks(req.body).then(function(data){
		res.send(data);
 	});
});


app.listen(80);

console.log('server started');