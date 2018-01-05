var DOMAIN_LIST = ["i.redd.it", "i.imgur.com", "gfycat.com"]
var POSTS = []
var window_height = $(window).height();
var index = 0;
var slider_delay = 4000;
var global_slider_timeout = null;

$(document).ready(function(){
	getPosts();
	$( document ).click( debug_advance );
});

function getPosts(){
	//[data][children][#][data][domain] = domain name
	//[data][children][#][data][url] = post url
	$.get("https://www.reddit.com/r/wallpaper.json?limit=100&after=101", function(data, status){

		console.log(data["data"]["children"].length);

		for ( var i = 0; i < data["data"]["children"].length; ++i ) {
			for ( var j = 0; j < DOMAIN_LIST.length; ++j ) {
				//console.log(data["data"]["children"][i]["data"]["domain"]);
				if ( data["data"]["children"][i]["data"]["domain"] == DOMAIN_LIST[j] ) {
					if ( j == 2 ) {
						POSTS.push( gyfcatConversion(data["data"]["children"][i]["data"]["url"]) );
					} 
					else {
						POSTS.push( data["data"]["children"][i]["data"]["url"] );
					}
					break;
				}
			}
		}

		//if ( data["data"]["children"][#]["data"]["domain"] )

        $("#slideshow_image").attr("src", POSTS[0]);

        if ( $("#slideshow_image").height() > window_height ) {
        	$("#slideshow_image").css('height', window_height)
        }
        
       global_slider_timeout = setTimeout(debug_advance, slider_delay);

    }); 
}

function debug_advance() {

	clearTimeout(global_slider_timeout);

	++index;

	if ( index >= POSTS.length ) {
		index = 0;
	}

	$("#slideshow_image").attr("src", POSTS[index]);

	if ( $("#slideshow_image").height() > window_height ) {
    	$("#slideshow_image").css('height', window_height)
    }

    global_slider_timeout = setTimeout(debug_advance, slider_delay);
}

function gyfcatConversion( url ) {
	var trimmed_url = url.substring(8);
	var new_substring = "https://giant."
	console.log(new_substring + trimmed_url + ".webm");
}