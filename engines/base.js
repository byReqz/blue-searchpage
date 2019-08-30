var apiUrl = "http://go.infinise.com/api/2.5/";


/*	DUCKDUCKGO
	----------------------------------------------------- */

eng.google = {
	pageTitle: "DuckDuckGo",
	logo: "duckduckgo.png",
	places: {
		'Web'    : ["https://duckduckgo.com/?q=%query%&kp=-2&kae=t&kam=osm&kay=b&kau=-1&kap=-1&kaq=-1&kak=-1&kax=-1"],
		'Images' : ["https://duckduckgo.com/?q=%query%&kp=-2&kae=t&kam=osm&kay=b&kau=-1&kap=-1&kaq=-1&kak=-1&kax=-1&iax=images&ia=images"],
		'Maps'   : ["https://duckduckgo.com/?q=%query%&kp=-2&kae=t&kam=osm&kay=b&kau=-1&kap=-1&kaq=-1&kak=-1&kax=-1&iaxm=maps",			false]
	}
};


/*	WIKIPEDIA
	----------------------------------------------------- */

eng.wikipedia = {
	pageTitle: "Wikipedia",
	logo: "wikipedia.png",
	places: {
		'Search'        : ["http://%lang%.wikipedia.org/wiki/Special:Search?search=%query%&fulltext=Search",	apiUrl+"?eng=wikipedia&timestamp=%time%&q=%query%&hl=%lang%"],
		'Go to Article' : ["http://%lang%.wikipedia.org/wiki/Special:Search?search=%query%&go=Go",				apiUrl+"?eng=wikipedia&timestamp=%time%&q=%query%&hl=%lang%"],
	},
	languages: {
		'': 'en'

	}
};


/*	YOUTUBE
	----------------------------------------------------- */

eng.youtube = {
	pageTitle: "YouTube",
	logo: "youtube.png",
	places: {
		'Videos' : ["http://www.youtube.com/results?search_query=%query%", apiUrl+"?eng=youtube&timestamp=%time%&q=%query%"]
	},
};


/*	TWITTER
	----------------------------------------------------- */

eng.twitter = {
	pageTitle: "Twitter",
	logo: "twitter.png",
	places: {
		'Search Twitter' : ["http://twitter.com/search?q=%query%", false]
	}
};
