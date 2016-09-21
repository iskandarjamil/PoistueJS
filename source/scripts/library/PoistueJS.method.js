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
