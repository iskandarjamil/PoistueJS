PoistueJS.prototype.extend_view = function(elem){
	var t = this;
	var o = t.option;

  t.extend_view = {
    type     	: 'extend_view',
    class    	: 'extend-view',
    options  	: '',
    defaults 	: {
  		child_elem	:	'.item-ev',
  		cta					: '.btn-ev',
  		start				:	4,
  		limit				:	4,
      animation   : true,
  		effect			:	'zoom', // effect-zoom, effect-slide-up
      step        : false, // 500
  	},
    $element : null
  };
  var $ev = t.extend_view;
  var $ts = t.method.transition;

  t.extend_view._init = function(element, options){
		if(typeof element === null){
			return;
		}
    $ev.$element = element;
    $ev.options = $.extend({}, $ev.defaults, options);
		$ev.controller();
  };

  t.extend_view.checkLimit = function(element){
    var eo    = $ev.options;
    var limit = eo.limit;
    var _res  = t.option.responsive;
    var $el   = element;
    var limit_xs 	= $el.attr('data-limit-xs');
    var limit_sm 	= $el.attr('data-limit-sm');
    var limit_md 	= $el.attr('data-limit-md');
    var limit_lg 	= $el.attr('data-limit-lg');
    var winMat = window.matchMedia;

    if(typeof limit_sm !== typeof undefined && limit_sm !== ''){
      if(winMat('(min-width: '+ _res['sm-min'] +')').matches){
        limit = limit_sm;
      }
    }
    if(typeof limit_md !== typeof undefined && limit_md !== ''){
      if(winMat('(min-width: '+ _res['md-min'] +')').matches){
        limit = limit_md;
      }
    }
    if(typeof limit_lg !== typeof undefined && limit_lg !== ''){
      if(winMat('(min-width: '+ _res['lg-min'] +')').matches){
        limit = limit_lg;
      }
    }
    if(typeof limit_xs !== typeof undefined && limit_xs !== ''){
      if(winMat('(max-width: '+ _res['xs-max'] +')').matches){
        limit = limit_xs;
      }
    }
    limit = parseInt(limit);

    return limit;
  };

  t.extend_view.controller = function(){
    var eo    = $ev.options;
    var $el   = $ev.$element;

    var complete = function() {
      $el.trigger('insert.pstjs.' + $ev.type);
    };

    $el.addClass($ev.class);

    if(eo.animation){
      $el.addClass('effect-'+eo.effect);
    }

    for(i=0; i<eo.start; i++){
      $el.find(eo.child_elem).eq(i).addClass('in');
    }
    if($el.find(eo.child_elem+':not(.in)').length <= 0){
      $el.find(eo.cta).hide();
    }

    if($ts){
      $el.one($ts.end, complete).emulateTransitionEnd(100);
    }else{
      complete();
    }

    $el.on('click',eo.cta, function(){
      $ev.show($el,eo);
    });
  };

  t.extend_view.show = function(target, options){
    var eo    = options;
    var $el   = target;
    var start = $el.find(eo.child_elem+':not(.in)').index();
    var limit = $ev.checkLimit($el);
    var tView = 0;

    var complete = function() {
      $el.trigger('shown.pstjs.' + $ev.type);

      if(start < 1){
  			$el.find(eo.cta).hide();
  		}
  		if($el.find(eo.child_elem+':not(.in)').length <= 0){
  			$el.find(eo.cta).hide();
  		}

      setTimeout(function(){
  			$(window).trigger('scroll');
  		},100);
    };

		limit = limit + start;
    var temp_array = [];
		for(i=start; i<limit; i++){
      temp_array.push($el.find(eo.child_elem).eq(i));
		}
    if(eo.step > 1){
      tView = 100;
      $.each(temp_array, function(e,i){
        setTimeout(function(){
          $(i).addClass('in').trigger('show.pstjs.' + $ev.type);
        },tView*0.425);
        tView = ((e + 1) * eo.step);
      });
    } else {
      $.each(temp_array, function(e,i){
        $(i).addClass('in').trigger('show.pstjs.' + $ev.type);
      });
    }

    if($ts){
      setTimeout(function(){
        $el.one($ts.end, complete).emulateTransitionEnd(100);
      },tView*0.425);
    }else{
      complete();
    }
	};



  /**
  * Definition
  */
  $.fn.PoistueJS().extend_view = function(option) {
  	return this.each(function () {
  		var $this = $(this);
      var options = typeof option == 'object' && option;
  		if (typeof option == 'string') data[option]();

      $ev._init($this,options);
  	});
  };

	$(window).on('load', function () {
    $('[data-extend-view]').each(function () {
      var $this = $(this);
      var data = $this.data();

			$ev._init($this,data);
    });
  });
};
