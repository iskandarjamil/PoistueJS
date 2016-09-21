/*!
 * PoistueJS v0.0.1 (https://github.com/iskandarjamil/PoistueJS)
 * Copyright 2015-2016 Iskandar Jamil <iskandar.jam@gmail.com>
 * Licensed under MIT (https://github.com/iskandarjamil/PoistueJS/blob/master/LICENSE)
 */
if (typeof jQuery === 'undefined') { throw new Error('PoistueJS\'s JavaScript requires jQuery'); }

var PoistueJS = function(options){
  var t = this;

	t.defaults = {
		'title'		:	'PoistueJS',
		'author'	: 'Iskandar Jamil <iskandar.jamil@yahoo.com>',
		'website'	: 'http://jen-apps.iskandarjamil.com/',
		'responsive' : {
			'xxs-max' : '480px',
			'xs-min'  : '481px',
			'xs-max'  : '767px',
			'sm-min'  : '768px',
			'sm-max'  : '991px',
			'md-min'  : '992px',
			'md-max'  : '1023px',
			'lg-min'  : '1024px',
		},
    'bower_assets' : './assets',
		'autoinsert'   : false, //{lazyload,form_validator}
	};
	t.option = $.extend({}, t.defaults, options);

	t.init();
};

PoistueJS.prototype.init = function(){
	var t = this;
	var o = t.option;

  t.method();
  t.method.transition = t.method.transitionEnd();
	t.init_controller();
	t.lazyload();
  t.scroll_to_top();
  t.scroll_balloon();
	t.extend_view();
	t.form_validator();
	t.google_map();


  if(o.autoinsert !== false){
    $.each(o.autoinsert,function(key, entry) {
      switch(entry){
        case 'lazyload':
          t.lazyload.insert();
        break;
        case 'form_validator':
          t.form_validator.insert();
        break;
      }
    });
  }


  // http://blog.alexmaccaw.com/css-transitions
  // ==========================================
  $.fn.PoistueJS().emulateTransitionEnd = function (duration) {
    var called = false, $el = this;
    $(this).one($.support.transition.end, function () { called = true; });
    var callback = function () { if (!called) $($el).trigger(t.method.transition.end); };
    setTimeout(callback, duration);

    return this;
  };
};

PoistueJS.prototype.init_controller = function(e){
	var t = this;
	var o = t.option;
	

};

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

PoistueJS.prototype.form_validator = function(options){
	var t = this;
	var o = t.option;

  t.form_validator = {
    type     	: 'form_validator',
    options  	: '',
    defaults 	: {
      autoinsert : false,
      ajax       : false,
      action     : './',
      method     : 'POST',
      type       : 'json',
  	},
    $element  : null
  };
	t.form_validator.options = $.extend({}, t.form_validator.defaults, options);
  var $fv = t.form_validator;
	var eo = $fv.options;
  var $ts = t.method.transition;

  t.form_validator.insert = function(callback){
    var complete = function(){
      if(typeof callback !== typeof undefined){
        callback();
      }
    };
    t.load_external(o.bower_assets+'/bootstrap-validator/dist/validator.min.js', complete);
  };

	t.form_validator._init = function(element, options){
    $fv.$element = element;
    $fv.options = $.extend({}, $fv.defaults, options);

    var form = $($fv.$element);
    var eo   = $fv.options;

    var complete = function() {
      form.trigger('insert.pstjs.' + $fv.type);
    };

		$('input.numberonly').keypress(function(e) {
			if (e.which !== 8 && e.which !== 43 && e.which !== 0 && (e.which < 48 ||
				e.which > 57)) {
				return false;
			}
		});


		$.each(form.find('input.numberonly'), function(){
			var _this = $(this);
			var attr  = $(this).attr('pattern');
			if (typeof attr === typeof undefined) {
				$(_this).attr('pattern',t.method.pattern('phone'));
			}
		});

		$.each(form.find('input[type="email"]'), function(){
			var _this = $(this);
			var attr = $(this).attr('pattern');
			if (typeof attr === typeof undefined) {
				$(_this).attr('pattern',t.method.pattern('email'));
			}
		});


		form.validator().on('submit', function(e) {
			var _this = $(this);

			if (e.isDefaultPrevented()) {
				$(_this).find('.form-group.has-error').eq(0).find('.form-control').focus();
			}

      var method = _this.attr('method');
      if(typeof method !== typeof undefined){
        eo.method = method;
      }
      var action = _this.attr('action');
      if(typeof action !== typeof undefined){
        eo.action = action;
      }

      if(eo.ajax){
        $.ajax({
          url      : eo.action,
          type     : eo.method,
          dataType : eo.type,
          async    : false,
          data     : _this.serialize(),
          success: function(success) {
            _this.trigger('ajax-success.pstjs.' + $fv.type, success);
            _this[0].reset();
          },
          error: function(err) {
            _this.trigger('ajax-error.pstjs.' + $fv.type, err);
          }
        });
        return false;
      }
		});
    complete();
	};

  /**
  * Definition
  */
  $.fn.PoistueJS().form_validator = function(option) {
  	return this.each(function () {
  		var $this = $(this);
      var options = typeof option == 'object' && option;
  		if (typeof option == 'string') data[option]();

      $fv._init($this,options);
  	});
  };

	$(window).on('load', function () {
    $('[data-validate]').each(function () {
      var $this = $(this);
      var data = $this.data();

			$fv._init($this,data);
    });
  });
};

PoistueJS.prototype.google_map = function(options){
	var t = this;
	var o = t.option;

  t.google_map = {
    type     	: 'google_map',
    options  	: '',
    defaults 	: {
      title 			: o.title,
  		content			:	'Google Map',
  		contentHTML	:	false,
  		lat					: 3.167380,
  		lng					: 101.613270,
  		zoom				: 19,
  		marker			:	'',
  		autoshow		:	false,
  		apikey			:	false,
  		version			:	3,
  		library			:	'places',
  	},
    $element  : null
  };
  var $gm = t.google_map;
  var $ts = t.method.transition;

  t.google_map.insert = function(callback, eo){
    var complete = function(){
      if(typeof callback !== typeof undefined){
        callback();
      }
    };
    t.load_external('https://maps.googleapis.com/maps/api/js?v='+eo.version+'.exp&libraries='+eo.library+'&language=en&key='+eo.apikey, complete);
  };

  t.google_map._init = function(element, options){
    $gm.$element = element;
    $gm.options  = $.extend({}, $gm.defaults, options);

    var $el = $gm.$element;
    var eo  = $gm.options;

    var setup = function(){
      if($($el).length < 1){
  			return;
  		}

  		var lat_lng = {lat: eo.lat, lng: eo.lng};
  		var map = new google.maps.Map($el[0], {
  			zoom: eo.zoom,
  			center: lat_lng
  		});

  		var contentString =	'<div id="content" class="googlemap-infowindow"><div id="siteNotice"></div><h4 id="firstHeading" class="firstHeading">'+eo.title+'</h4><div id="bodyContent"><p>'+eo.content+'</p></div></div>';
  		if(eo.contentHTML){
  			contentString = eo.contentHTML;
  		}

  		var infowindow = new google.maps.InfoWindow({
  			content: contentString
  		});

  		marker = new google.maps.Marker({
  			map: map,
  			icon: eo.marker,
  			draggable: false,
  			animation: google.maps.Animation.DROP,
  			position: {lat: eo.lat, lng: eo.lng}
  		});

  		marker.addListener('click', function(){
  			map.setCenter(marker.getPosition());
  			infowindow.open(map, marker);
  		});

  		if(eo.autoshow){
  			infowindow.open(map, marker);
  			map.setCenter(marker.getPosition());
  		}
    };

    if (typeof google === typeof undefined) {
      t.google_map.insert(setup, eo);
    }else{
      setup();
    }
  };

  /**
  * Definition
  */
  $.fn.PoistueJS().google_map = function(option) {
  	return this.each(function () {
  		var $this = $(this);
      var options = typeof option == 'object' && option;
  		if (typeof option == 'string') data[option]();

      $gm._init($this,options);
  	});
  };
};

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

PoistueJS.prototype.method = function(){
	var t = this;
	var o = t.option;

  t.method = {};

  t.method.isNumeric = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  t.method.pattern = function(n){
    var result;
    switch(n){
      case 'email':
        result = "^[_A-z0-9._%+-]+@[_A-z0-9.-]+\\.[_A-z]{1,}$";
      break;
      case 'phone':
        result = "\\d*";
      break;
    }
    return result;
  };

  t.method.transitionEnd = function() {
    // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
    // ============================================================

    var el = document.createElement(t.defaults.title);

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'OTransition'      : 'oTransitionEnd otransitionend',
      'transition'       : 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] };
      }
    }

    return false; // explicit for ie8 (  ._.)
  };

  t.method.transition = function(){
    return null;
  };
};

PoistueJS.prototype.scroll_balloon = function(options){
	var t = this;
	var o = t.option;

	t.scroll_balloon = {
    type 	    : 'scroll_balloon',
    class 	  : 'scroll-balloon',
    options 	: '',
    defaults 	: {
      animation   : true,
      placement   : 'bottom-right',
      offset      : 500,
      template    : '<i class="fa fa-angle-up"></i>',
      delay       : 300,
      scrollSpeed : 'slow'
  	},
    $element	    : null,
		disabled	    : false,
		timeoutScroll	: null
  };
  var $sb = t.scroll_balloon;
  var $ts = t.method.transition;

  t.scroll_balloon._init = function(element, options){
    if (!t.scroll_to_top) throw new Error('Scroll Balloon requires PoistueJS\'s scroll_to_top');

		if(typeof element === null){
			$sb.$element = document.createElement('div');
		}
		if($sb.$element === null){
			$sb.$element = element;
		}

    $sb.options = $.extend({}, $sb.defaults, options);

		$sb.bindInsert();
  };

  t.scroll_balloon.bindInsert = function(){
		var e = $.Event('insert.pstjs.' + $sb.type), template;
		var eo = $sb.options;
    var $el = $sb.$element;

		var complete = function() {
      $el.trigger('insert.pstjs.' + $sb.type);
    };

		template = eo.template;

		$el[0].setAttribute("data-placement", eo.placement);
		$el[0].setAttribute("data-scrolltotop" , '');
		$el[0].setAttribute("data-scroll-speed", eo.scrollSpeed);
		$el[0].className += " " + $sb.class;
    if(eo.animation){
  		$el[0].className += " animation";
    }
		$el[0].innerHTML = template;
		document.getElementsByTagName('body')[0].appendChild($el[0]);

		t.scroll_to_top._init($el,$el.data());

		complete();
		$sb.controller();
  };

  t.scroll_balloon.status = function(){
    var $el = $sb.$element;

    var status = true;
    if($el === null){
      status = false;
    }

    return status;
  };

  t.scroll_balloon.notDefined = function(){
    throw new Error('Scroll Balloon: No element found, please create one and run again.');
  };

  t.scroll_balloon.show = function(){
    var e = $.Event('show.pstjs.' + $sb.type);
		var eo = $sb.options;
    var $el = $sb.$element;

    if($sb.status() === false){
      $sb.notDefined();
    }
    if($sb.disabled === true){
      $sb.disabled = false;
    }
    if($el.hasClass('isShown')){
      return false;
    }
    $el.trigger(e);
    var complete = function() {
      $el.trigger('shown.pstjs.' + $sb.type);
    };

    $el.removeClass('isHidden').addClass('isShown');
    $el.addClass('in');

    if($ts){
      $el.one($ts.end, complete).emulateTransitionEnd(1000);
    }else{
      complete();
    }
  };

	t.scroll_balloon.hide = function(){
		var e = $.Event('hide.pstjs.' + $sb.type);
		var eo = $sb.options;
    var $el = $sb.$element;

    if($sb.status() === false){
      $sb.notDefined();
    }
    if($el.hasClass('isHidden')){
      return false;
    }
    $el.trigger(e);
    var complete = function() {
      $el.trigger('hidden.pstjs.' + $sb.type);
    };

    $el.removeClass('isShown').addClass('isHidden');
    $el.removeClass('in');

    if($ts){
      $el.one($ts.end, complete).emulateTransitionEnd(1000);
    }else{
      complete();
    }
	};

	t.scroll_balloon.disable = function(){
		var e = $.Event('disable.pstjs.' + $sb.type);
		var eo = $sb.options;
    var $el = $sb.$element;

    if($sb.status() === false){
      $sb.notDefined();
    }
    $el.trigger(e);
    var complete = function() {
      $el.trigger('disabled.pstjs.' + $sb.type);
    };

		$sb.hide();
    $sb.disabled = true;
    complete();
	};

  t.scroll_balloon.destroy = function(target){
    var e = $.Event('destroy.pstjs.' + $sb.type);
		var eo = $sb.options;
    var $el = $sb.$element;

    if($sb.status() === false){
      $sb.notDefined();
    }
    $el.trigger(e);
    var complete = function() {
      $el.trigger('destroyed.pstjs.' + $sb.type);
    };

    $el.on('hidden.pstjs.' + $sb.type, function(){
      complete();
      $sb.remove();
    });
    $sb.hide();
  };

  t.scroll_balloon.remove = function(callback){
    var $el = $sb.$element;
    var eo = $sb.options;

    if($sb.status() === false){
      $sb.notDefined();
    }
    t.scroll_to_top.destroy($el);
    $el.removeClass('isHidden isShown scroll-to-top');
    $el.removeClass($sb.class);
    $el.off('.' + $sb.type);
    $el[0].innerHTML = '';
    $el[0].style = '';
    $el = null;
  };

	t.scroll_balloon.controller = function(){
    var $el = $sb.$element;
		var eo = $sb.options, winPos;

		$(window).on('scroll', function(){
			clearTimeout($sb.timeoutScroll);
      if($sb.disabled === true){
        return;
      }
      if($sb.status() === false){
        $sb.notDefined();
      }
      if($el.hasClass('isAnimate')){
        return;
      }
			$sb.timeoutScroll = setTimeout(function(){
				winPos = $(window).scrollTop();
				if(winPos < eo.offset){
          if($el.hasClass('isHidden')){
            return false;
          }
					$sb.hide();
				}
				if(winPos > eo.offset){
          if($el.hasClass('isShown')){
            return false;
          }
					$sb.show();
				}
			},eo.delay);
		});
	};


  /**
  * Definition
  */
  $.fn.PoistueJS().scroll_balloon = function(action, option) {
  	return this.each(function () {
      if(typeof option === typeof undefined){
        if(typeof action === typeof undefined){
          action = 'init';
        }else{
          option = action;
        }
      }

  		var $this = $(this);
      var data  = $this.data();

      switch(action){
        case 'init':
          $sb._init($this,data);
          $sb.show();
        break;

        case 'show':
          $sb.show();
        break;
        case 'hide':
          $sb.hide();
        break;
        case 'disable':
          $sb.disable();
        break;
        case 'destroy':
          $sb.destroy();
        break;
      }
  	});
  };

	$(window).on('load', function () {
    $('[data-scroll-balloon]').each(function () {
      var $this = $(this);
      var data = $this.data();

			$sb._init($this,data);
    });
  });
};

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

var old = $.fn.PoistueJS;

$.fn.PoistueJS = function (option) {
	return this.each(function () {
		var $this   = $(this);
		var options = typeof option == 'object' && option;
		if (typeof option == 'string') data[option]();
	});
};

$.fn.PoistueJS.Constructor = PoistueJS;

$.fn.PoistueJS.noConflict = function () {
	$.fn.PoistueJS = old;
	return this;
};
