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
