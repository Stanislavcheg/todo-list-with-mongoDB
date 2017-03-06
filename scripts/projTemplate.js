define('projTemplate', function() {
//is used to render projects
	var template =  '<div class="ProjectCont panel panel-primary" id="{{id}}">' +
						'<div class="panel-heading projHeader">' +
							'<span class="glyphicon glyphicon-th-list"></span>' +
							'<h3 class="projName">{{name}}</h3>' +
							'<div class="editCont">' +
								'<span class="glyphicon glyphicon-pencil"></span>' +
								'<span class="glyphicon glyphicon-remove"></span>' +
							'</div>' +
						'</div>' +
	 					'<div class="panel-body addPanelCont">' +
							'<div class="plusCont">' +
								'<span class="glyphicon glyphicon-plus"></span>' +
							'</div>' +
							'<div class="addTaskCont">' +
								'<div class="input-group">' +
									'<input type="text" class="form-control taskInput">' + 
									'<span class="input-group-addon addTaskBtn">Add task</span>' +
								'</div>' +
							'</div>' +
	 					'</div>' +
	 					'<ul class="list-group taskCont">' + 
	 					'</ul>' +
					'</div>';
	return template;
	});




