define('project',['id'], function(id){
// project model

	function Project(newName, newId, newTasks) {
		if (!newName) {return null};
	    this.name = newName;
	    this.id = newId ? newId : id.generate();
	    this.tasks = newTasks ? newTasks : [];
	    this.getTaskById = function(id) {
			var task;
			for (var i = 0; i < this.tasks.length; i++) {
				if (this.tasks[i].id === id) {
					task = this.tasks[i];
					break;
				}
			}
			return task;
 		};
		this.removeTaskById = function(id) {
			var task = this.getTaskById(id);
			var index = this.tasks.indexOf(task);
			if (index > -1) {
			    this.tasks.splice(index, 1);
			}
			return task;
		};
		this.getTaskIndexById = function(id) {
			return this.tasks.indexOf(this.getTaskById(id));
		};
	}

	var project = {
				items: [],
	   getProjectById: function(id) {
	   						var proj;
	   						for (var i = 0; i < this.items.length; i++) {
	   							if (this.items[i].id === id) {
	   								proj = this.items[i];
	   								break;
	   							}
	   						}
	   						return proj;
					   },
	removeProjectById: function(id) {
							var proj = this.getProjectById(id);
							var index = this.items.indexOf(proj);
							if (index > -1) {
							    this.items.splice(index, 1);
							}
							return proj;
					   },
		createProject: function(name, id, tasks) {
							return new Project(name, id, tasks);
					   }
	};

	return project;
});

