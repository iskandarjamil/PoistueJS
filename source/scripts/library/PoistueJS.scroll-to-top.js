PoistueJS.prototype.scroll_to_top = function(options){
	var t = this;
	var o = t.option;

  t.scroll_to_top = {
    type     	: 'extend_view',
    class    	: 'extend-view',
    options  	: '',
    defaults 	: {
  		scrollSpeed : 'slow' // slow, fast, normal, integer
  	},
    $element  : null
  };
  var $stt = t.scroll_to_top;
  var $ts  = t.method.transition;

  t.scroll_to_top._init = function(element, options){
    $stt.$element = element;
    $stt.options  = $.extend({}, $stt.defaults, options);

    var target = $stt.$element;
    var eo     = $stt.options;

    target.on('click', function(e){
      var speedE = eo.scrollSpeed;
      if(t.method.isNumeric(speedE)){
        speedE = parseInt(speedE, 10);
      }
  		$('html,body').stop().animate({
  			'scrollTop' : 0
  		}, speedE);
  	});
  };

  t.scroll_to_top.destroy = function(target){
    target.off('click');
  };

  t.scroll_to_top.refresh = function(target){
    target.off('click');
    t.scroll_to_top._init(target);
  };


  /**
  * Definition
  */
  $.fn.PoistueJS().scroll_to_top = function(option) {
  	return this.each(function () {
  		var $this   = $(this);
  		var options = typeof option == 'object' && option;
  		if (typeof option == 'string') data[option]();

      t.scroll_to_top.options  = $.extend({}, t.scroll_to_top.defaults, options);
      t.scroll_to_top._init($this);
  	});
  };
  $(window).on('load', function () {
    $('[data-scrolltotop]').each(function () {
      var $this = $(this);
      var data = $this.data();

			$stt._init($this,data);
    });
  });
};
