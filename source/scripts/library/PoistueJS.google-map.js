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
