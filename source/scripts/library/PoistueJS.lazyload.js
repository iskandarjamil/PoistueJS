PoistueJS.prototype.lazyload = function(options){
	var t = this;
	var o = t.option;

  t.lazyload = {
    type     	: 'lazyload',
    options  	: '',
    defaults 	: {
  		classname	  :	'lazy',
  		attr			  : 'src',
  		effect 		  : 'fadeIn',
  		placeholder :	'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
  		callback	  :	function(){}
  	},
    $element  : null
  };
	t.lazyload.options = $.extend({}, t.lazyload.defaults, options);
  var $lz = t.lazyload;
	var eo = $lz.options;
  var $ts = t.method.transition;

  t.lazyload.insert = function(callback){
    var complete = function(){
      if(typeof callback !== typeof undefined){
        callback();
      }
    };
    t.load_external(o.bower_assets+'/jquery.lazyload/jquery.lazyload.js', complete);
  };

	t.lazyload._init = function(element, options){
    $lz.$element = element;
    $lz.options  = $.extend({}, $lz.defaults, options);

    var target = $lz.$element;
    var eo     = $lz.options;

		if (typeof lazyload === typeof undefined) {
			throw new Error('PoistueJS\'s lazyload requires LazyLoad Plugin.');
		}

		$(target).lazyload({
			data_attribute 	: eo.attr,
			effect 					: eo.effect,
			placeholder 		: eo.placeholder,
			onFinishedAll	 	: eo.callback,
		}).removeClass(eo.classname);
	};

  /**
  * Definition
  */
  $.fn.PoistueJS().lazyload = function(option) {
  	return this.each(function () {
  		var $this = $(this);
      var options = typeof option == 'object' && option;
  		if (typeof option == 'string') data[option]();

      $lz._init($this,options);
  	});
  };

	$(window).on('load', function () {
    $('data-lazyload').each(function () {
      var $this = $(this);
      var data = $this.data();

			$lz._init($this,data);
    });

    $lz._init($('img.'+eo.classname));
  });
};
