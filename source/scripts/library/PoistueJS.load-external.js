PoistueJS.prototype.load_external = function(url, callback){
	var t = this;
	var o = t.option;

  var complete = function(){
    if(typeof callback !== typeof undefined){
      callback();
    }
  };

	var script = document.createElement("script");
	script.type = "text/javascript";

	if (script.readyState){  //IE
		script.onreadystatechange = function(){
			if (script.readyState === "loaded" || script.readyState === "complete"){
				script.onreadystatechange = null;
				complete();
			}
		};
	} else {  //Others
		script.onload = function(){
			complete();
		};
	}

	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
};
