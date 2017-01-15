if(typeof jcmp !== 'undefined') { jcmp.HideCursor(); } /* Currently no cursor handling - it's buggy with jquery keyup/keydown events. Fuckin' Jquery... >_< */

var tpKeyPressed = false;
var tpKeyOverride = false;

var teleport = [
    {location: 'statue', label: 'Statue', icon:'fa fa-child', type:'default'},
    {location: 'boomisland', label: 'Boom Island', icon:'fa fa-bomb', type:'default'},
    {location: 'airfield', label: 'Airfield', icon:'fa fa-fighter-jet', type:'default'},
    {location: 'military', label: 'Military Base', icon:'fa fa-fort-awesome', type:'default'},
    {location: 'volcano', label: 'Volcano',  icon:'glyphicon glyphicon-fire text-danger', type:'default'},
    {location: 'mountain', label: 'Mt. Freefall',  icon:'fa fa-grav', type:'default'},
    {location: 'city', label: 'City',  icon:'fa fa-building', type:'default'},
    {location: 'docks', label: 'The Docks',  icon:'fa fa-ship', type:'default'},
];

build_teleport_menu(teleport);

function build_teleport_menu(e) {
	var icon;
	for(var t in e) {
		if(e[t]['icon'].length < 1) { icon = '<i class="fa fa-cog"></i>'; } else { icon = icon = '<i class="'+e[t]['icon']+'"></i>'; }
		$('.tp-list').append(''
		+ '<span class="tp-item" data-default="true" data-id="'+e[t]['location']+'">'
		+ '	<span class="tp-label btn-block">'+e[t]['label']+'</span>'
		+ '	<span class="tp-label-img">'+icon+'</span>'
		+ '</span>');
	}
}

$(document).on('click', '.tp-item', function() {
	var tpm = $('#tp-menu');
	if (typeof jcmp !== 'undefined') {
		var locid = $(this).data('id').toString();
		jcmp.CallEvent('xonos-teleport', locid);
	}
	tpKeyOverride = true;
	console.log("Setting teleport lockout for 2 secs...");
	tpm.addClass("animated bounceOut");
	setTimeout(function() { /* Prevent TP Spam */
		tpKeyOverride = false;
		console.log("Override complete.");
	}, 2000);
});


$(document).on('keydown', function(e) {
	var tpMenu = $('#tp-menu');
	if(e.which == '66') { // "b" key
		if(!tpKeyOverride) {
			if(!tpMenu.hasClass("bounceOut")) {
				if(tpMenu.hasClass("hidden")) { tpMenu.removeClass("hidden"); }
				tpKeyPressed = true;
				tpMenu.addClass("animated bounceIn");
			}
		} else {
			tpKeyPressed = false;
		}
	}
});

$(document).on('keyup', function(e) {
	var tpMenu = $('#tp-menu');
	if(e.which == '66') { // "b" key.
		if(tpKeyPressed) {
			tpKeyPressed = false;
			tpMenu.addClass("animated bounceOut");
		}
	}
});

$(document).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', '#tp-menu', function() {
	var tpm = $(this);
	if(tpKeyPressed) {
		if(tpm.hasClass("bounceOut")) {
			tpm.removeClass("bounceOut");
		}
		
		if(!tpm.hasClass("bounceIn")) {
			tpm.removeClass("animated bounceIn");
		}
	} else {
		if(tpm.hasClass("bounceOut")) {
			tpm.removeClass("animated bounceOut");
			if(!tpm.hasClass("hidden")) { tpm.addClass("hidden"); }

		}
	}
});


// so we can actually test in a browser..
if (typeof jcmp !== 'undefined') {
	// wait for load first
	jcmp.CallEvent('xonos/ready');
}