define('id', function(){
//is used to generate id for projects and tasks
	var id = {
		generate: function getHash () {
			var dictionary = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
			var hashId = "";
			for (var i = 0; i < 10; i++) {
				hashId+= dictionary[Math.floor(Math.random()*dictionary.length)];
			}
			return hashId;
		}
	};
	return id;
});


	