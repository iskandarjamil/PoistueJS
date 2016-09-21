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
