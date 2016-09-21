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
