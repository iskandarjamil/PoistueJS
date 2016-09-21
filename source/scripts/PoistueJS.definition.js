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
