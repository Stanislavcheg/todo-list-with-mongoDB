define('pageProjectElement',['jquery'], function(jquery){
// is used to get DOM elements
	var projectElem = {
        projectCont: function(pageElem) {
                         return $(pageElem).parents('.ProjectCont');
                     },
          projectId: function(pageElem) {
                         return this.projectCont(pageElem).attr('id');
                     },
        projectName: function(pageElem) {
                         return this.projectCont(pageElem).find('.projName');
                     },
           taskCont: function(pageElem) {
                         return this.projectCont(pageElem).find('.taskCont');
                     },
            taskItem: function(pageElem) {
                        return $(pageElem).parents('.taskItem');
                     },
             taskId: function(pageElem) {
                         return this.taskItem(pageElem).attr('id');
                     },
           taskName: function(pageElem) {
                         return this.taskItem(pageElem).find('.taskName');
                     },
    }
	return projectElem;
});


