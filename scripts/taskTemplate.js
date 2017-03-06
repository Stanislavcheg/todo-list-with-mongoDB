define('taskTemplate', function() {
//is used to render tasks
	var template =   '{{#tasks}}<li class="list-group-item taskItem" id="{{id}}">'+
		 							'<div class="task{{#isDone}} taskDone{{/isDone}}">'+
		 								'<div class="isDoneCont">'+
		 									'<input type="checkbox" class="isDone"{{#isDone}} checked {{/isDone}}>'+ 
		 								'</div>'+
		 								'<p class="taskName">{{name}}</p>'+
			 							'<div class="editTaskCont">'+
			 								'<span class="glyphicon glyphicon-triangle-top"></span>'+
			 								'<span class="glyphicon glyphicon-triangle-bottom"></span>'+
			 								'<span class="glyphicon glyphicon-pencil"></span>'+
			 								'<span class="glyphicon glyphicon-remove"></span>'+
			 							'</div>'+
		 							'</div>'+
 								'</li>{{/tasks}}';
	return template;
	});




