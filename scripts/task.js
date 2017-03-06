define('task',['id'], function(id){
// task model

	function Task(name) {
		this.name = name;
		this.isDone = false;
	    this.id = id.generate();
	}	

	var task = {
			createTask: function(name) {
							return new Task(name);
						}
	};

	return task;
});




