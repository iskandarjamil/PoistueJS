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
