require(['jquery', 'bootstrap', 'bootbox', 'view', 'projTemplate', 'taskTemplate', 'project', 'task', 'pageProjectElement'], function ( $, bootstrap, bootbox, view, projTemplate, taskTemplate, project, task, pageProjectElement) {

	var contentContainer = $('#ContentCont');
	var addProjBtn = $('#addProjBtn');

//Initiating projects
    $.ajax({
       url     : '/projects',
       type    : 'get',
       dataType: 'json',
       success : function (data) {
           project.items = [];
           for (var i = 0; i < data.length; i++) {
               var newProject = project.createProject(data[i].name, data[i].id, data[i].tasks); 
               project.items.push(newProject);
               view.prepend(contentContainer, projTemplate, newProject); 
               view.redraw($('#' + newProject.id).find('.taskCont'), taskTemplate, newProject);
           }
       }
    });

//Creating a project
	addProjBtn.on('click', function() {
		var newProject;
		bootbox.prompt("Enter project name", function(result) {
			if (result) {
                newProject = project.createProject(result);
                $.ajax({
                    url: '/projects',
                    type: 'post',
                    dataType: 'json',
                    success: function () {
                        project.items.unshift(newProject);
                        view.prepend(contentContainer, projTemplate, newProject);
                    },
                    error: function() {
                        location.reload();
                    },
                    data: {name: newProject.name, id:newProject.id, tasks: newProject.tasks}
                });
        	}
		});
	});

//Project editing
	contentContainer.on('click', '.projHeader .glyphicon-pencil', function(event) {
    	var proj = project.getProjectById(pageProjectElement.projectId(event.target));
    	bootbox.prompt({
		    title: "Edit project: ",
		    inputType: 'textarea',
		    value: proj.name,
		    callback: function (result) {
		        if (result === "") {
		        	bootbox.alert("Task can't be empty");
		        }
		        else if (result !== null) {
                    $.ajax({
                        url: '/projectEdit',
                        type: 'post',
                        dataType: 'json',
                        success: function () {
                            proj.name = result;
                            pageProjectElement.projectName(event.target).text(result);
                        },
                        error: function() {
                            location.reload();
                        },
                        data: {name: result, id: proj.id}
                    });
		        }
		    }
		});
    });	

//Removing a project
    contentContainer.on('click', '.projHeader .glyphicon-remove', function(event){
    	bootbox.confirm("Do you want to delete this project?", function(result){ 
    		if (result) {
                var projId = pageProjectElement.projectId(event.target);
                $.ajax({
                    url: '/projectRemove',
                    type: 'post',
                    dataType: 'json',
                    success: function () {
                        project.removeProjectById(projId);
                        view.redraw(contentContainer, "", "");
                        for (var i = 0; i < project.items.length; i++) {
                            view.prepend(contentContainer, projTemplate, project.items[i]);
                            view.redraw($('#' + project.items[i].id).find('.taskCont'), taskTemplate, project.items[i]);
                        }
                    },
                    error: function() {
                        location.reload();
                    },
                    data: {id: projId}
                });
    		} 
    	});

    });

//Creating a task
    contentContainer.on('click', '.addTaskBtn', function(event) {
    	var taskInput = $(event.target).prev();
    	var proj = project.getProjectById(pageProjectElement.projectId(event.target));
    	var newTask;
    	if (taskInput.val()) {
            newtask = task.createTask(taskInput.val());
            proj.tasks.unshift(newtask);
            $.ajax({
                url: '/tasks',
                type: 'post',
                dataType: 'json',
                success: function () {
                    view.redraw(pageProjectElement.taskCont(event.target), taskTemplate, proj);
                    taskInput.val("");
                },
                error: function() {
                    location.reload();
                },
                data: {id:proj.id, tasks: proj.tasks}
            });
    	}
    	else {
    		bootbox.alert("Task can't be empty");
    	}
    });

//Pushing task up
	contentContainer.on('click', '.editTaskCont .glyphicon-triangle-top', function(event) {
    	var proj = project.getProjectById(pageProjectElement.projectId(event.target));
    	var taskIndex = proj.getTaskIndexById(pageProjectElement.taskId(event.target));
        var bufTask;
    	if (taskIndex > 0 && taskIndex < proj.tasks.length) {
    		bufTask = proj.tasks.splice(taskIndex, 1)[0];
    		proj.tasks.splice(taskIndex -1, 0, bufTask);
            $.ajax({
                url: '/tasks',
                type: 'post',
                dataType: 'json',
                success: function () {
                    view.redraw(pageProjectElement.taskCont(event.target), taskTemplate, proj);
                },
                error: function() {
                    location.reload();
                },
                data: {id:proj.id, tasks: proj.tasks}
            });
    	} 
    });

//Pushing task down
	contentContainer.on('click', '.editTaskCont .glyphicon-triangle-bottom', function(event) {
        var proj = project.getProjectById(pageProjectElement.projectId(event.target));
        var taskIndex = proj.getTaskIndexById(pageProjectElement.taskId(event.target));
        var bufTask;
    	if (taskIndex < (proj.tasks.length - 1) && taskIndex > -1) {
    		bufTask = proj.tasks.splice(taskIndex, 1)[0];
    		proj.tasks.splice(taskIndex + 1, 0, bufTask);
    		$.ajax({
                url: '/tasks',
                type: 'post',
                dataType: 'json',
                success: function () {
                    view.redraw(pageProjectElement.taskCont(event.target), taskTemplate, proj);
                },
                error: function() {
                    location.reload();
                },
                data: {id:proj.id, tasks: proj.tasks}
            });
    	} 
    });

//Task done
	contentContainer.on('click', '.isDone', function(event) {
    	var proj = project.getProjectById(pageProjectElement.projectId(event.target));
    	var task = proj.getTaskById(pageProjectElement.taskId(event.target));
    	if ($(event.target).prop('checked')) {
    		task.isDone = true;
            $.ajax({
                url: '/tasks',
                type: 'post',
                dataType: 'json',
                success: function () {
                    view.redraw(pageProjectElement.taskCont(event.target), taskTemplate, proj);
                },
                error: function() {
                    location.reload();
                }, 
                data: {id:proj.id, tasks: proj.tasks}
            });
    	}
    	else {
    		task.isDone = false;
            $.ajax({
                url: '/tasks',
                type: 'post',
                dataType: 'json',
                success: function () {
                    view.redraw(pageProjectElement.taskCont(event.target), taskTemplate, proj);
                },
                error: function() {
                    location.reload();
                },
                data: {id:proj.id, tasks: proj.tasks}
            });
    	}
    });

//Task editing
	contentContainer.on('click', '.editTaskCont .glyphicon-pencil', function(event) {
    	var proj = project.getProjectById(pageProjectElement.projectId(event.target));
    	var task = proj.getTaskById(pageProjectElement.taskId(event.target));
    	bootbox.prompt({
		    title: "Edit task: ",
		    inputType: 'textarea',
		    value: task.name,
		    callback: function (result) {
		        if (result === "") {
		        	bootbox.alert("Task can't be empty");
		        }
		        else if (result !== null) {
		        	task.name = result;
                    $.ajax({
                        url: '/tasks',
                        type: 'post',
                        dataType: 'json',
                        success: function () {
                            pageProjectElement.taskName(event.target).text(result);
                        },
                        error: function() {
                            location.reload();
                        },
                        data: {id:proj.id, tasks: proj.tasks}
                    });
		        }
		    }
		});
    });

//Removing a task
    contentContainer.on('click', '.editTaskCont .glyphicon-remove', function(event){
    	var proj = project.getProjectById(pageProjectElement.projectId(event.target));
    	bootbox.confirm("Do you want to delete this task?", function(result){ 
    		if (result) {
    			proj.removeTaskById(pageProjectElement.taskId(event.target));
                $.ajax({
                    url: '/tasks',
                    type: 'post',
                    dataType: 'json',
                    success: function () {
                        view.redraw(pageProjectElement.taskCont(event.target), taskTemplate, proj);
                    },
                    error: function() {
                        location.reload();
                    },
                    data: {id:proj.id, tasks: proj.tasks}
                });
    		} 
    	});
    });

});

requirejs.config({
    paths: {
        jquery: '../node_modules/jquery/dist/jquery.min',
        mustache: '../node_modules/mustache/mustache.min',
        bootstrap: '../node_modules/bootstrap/dist/js/bootstrap.min',
        bootbox: '../node_modules/bootbox/bootbox.min'
        
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        'bootbox': {
            exports: 'bootbox',
        }
    }
});

