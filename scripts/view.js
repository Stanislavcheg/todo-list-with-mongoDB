define('view',['mustache', 'jquery'], function(mustache, jquery){
// is used to render elements to html
	var view = {
		//paste element to the top part of the container
		prepend: function(element, template, data) {
					$(element).prepend(mustache.render(template, data));
				},
		//erase container's content and paste element to the container
		redraw: function(element, template, data) {
					$(element).html(mustache.render(template, data));
				}
	};
	return view;
});
