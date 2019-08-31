var org = true;

/*'http://www.planwallpaper.com/static/images/hexagon-prisms-28449-2560x1440_QnLmOkL-min.jpg', 'http://www.planwallpaper.com/static/images/6999064-indian-beach-wallpaper_XEK3Udy-min.jpg', 'http://www.planwallpaper.com/static/images/Seamless-Polygon-Backgrounds-Vol2-full-min.jpg', 'http://www.planwallpaper.com/static/images/colorful-triangles-background-min.jpg', 'http://www.planwallpaper.com/static/images/ZhGEqAP-min.jpg', 'http://www.planwallpaper.com/static/images/Live-Wallpaper-1.jpeg', 'http://www.planwallpaper.com/static/images/Wallpaper-HD-10-min.jpg', 'http://www.planwallpaper.com/static/images/butterfly-wallpaper.jpeg', 'http://www.planwallpaper.com/static/images/blue-abstract-glass-balls-min.jpg', 'http://www.planwallpaper.com/static/images/555837-min.jpg', 'http://www.planwallpaper.com/static/images/HD-Wallpapers1.jpeg', 'http://www.planwallpaper.com/static/images/Technology-Wallpaper-14-min.jpg', 'http://www.planwallpaper.com/static/images/11-sea-beach-sand-wallpaper_sf9i1b6-min.jpg', 'http://www.planwallpaper.com/static/images/kartandtinki1_photo-wallpapers_02-min.jpg', 'http://www.planwallpaper.com/static/images/black_hd_wallpaper_black_hd_wallpaper-min.jpg', 'http://www.planwallpaper.com/static/images/6944150-abstract-colors-wallpaper-min.jpg', 'http://www.planwallpaper.com/static/images/wallpaper-11628192-min.jpg', 'http://www.planwallpaper.com/static/images/wallpapers-7020-7277-hd-wallpapers-min.jpg', 'http://www.planwallpaper.com/static/images/i-should-buy-a-boat-min.jpg', 'http://www.planwallpaper.com/static/images/2022725-wallpaper_625864_Iz6NK8G-min.jpg', 'http://www.planwallpaper.com/static/images/79438-blue-world-map-min.jpg', 'http://www.planwallpaper.com/static/images/303836-min.jpg', 'http://www.planwallpaper.com/static/images/abstract_wallpaper_xVBXbWX-min.jpg', 'http://www.planwallpaper.com/static/images/general-night-golden-gate-bridge-hd-wallpapers-golden-gate-bridge-wallpaper-min.jpg', 'http://www.planwallpaper.com/static/images/black-and-blue-cubes-wallpaper1-min.jpg', 'http://www.planwallpaper.com/static/images/city_of_love-wallpaper-5120x3200-min.jpg', 'http://www.planwallpaper.com/static/images/b807c2282ab0a491bd5c5c1051c6d312_k4PiHxO-min.jpg',  */

var images = ['wallpaper/6.jpg','wallpaper/5.jpg','wallpaper/4.jpg','wallpaper/3.jpg','wallpaper/2.jpg','wallpaper/1.jpg'];


function toggleBG() {
    if (org) {

        document.body.style.backgroundImage = "url('" + images[Math.round(Math.random() * (images.length - 1))] + "')";
        document.body.style.backgroundSize = "100% 100%";
        org = false;
    } else {
        org = true;
        document.body.style.backgroundSize = "";
        document.body.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4AgbFB4l6ZLKSQAAAFZJREFUeNrt2jENgDAABMAHASyoYMZWpTDWWxcskBAUsGGhSbkz8D/8+AkAAAAAAAAAwNim3gVqe9YkKdty9cyfbQEAAAAAAAAARvX7f8Rx3nviH/F5AaflDQJlfwozAAAAAElFTkSuQmCC')";
        console.log(document.body.style.backgroundImage);
    }
    return false;
}
var eng = {},
    current = {},
    fadeDur = 200,
    titlePrefix = "Search ",

    idxWidth = 700,
    idxLogoFull = [225, 80],
    idxLogoSmall = [157, 56],
    idxMargin = 24,
    idxFadedOpacity = 0.3,

    idxHeight = 0;


$(function () {
    // Create Engine Index

    indexCreate();

    // Behavior

    $("#i").keyup(function (ev) {
        fetchSuggestions(ev.which);
    });
    $(document).click(function (ev) {
        closeSugBox(ev.srcElement)
    });

    $("#toggleInfo").click(function () {
        $("#infoBox").toggle(400);
    });

    // Set up first engine

    build(firstProp(eng), false);
});

function doSearch() {
    var url = eng[current.engine].places[current.place][0];
    url = url.replace("%query%", encodeURIComponent($("#i").val()));
    if (typeof eng[current.engine].languages == "object")
        url = url.replace("%lang%", eng[current.engine].languages[current.language]);

    window.location.href = url;
    return false;
}


/*	ENGINE INDEX
	-----------------------------------------------------  */

function indexCreate() {
    var row = 0,
        i = 0, // Reset every row
        j = 0, // Total
        offset = 0,
        cols = Math.floor(idxWidth / idxLogoSmall[0]);

    for (e in eng) {
        // If the offset hasn't been set yet
        // And the number of engines left to draw is <= items in the final row
        if (
            offset == 0 &&
            (numKeys(eng) - j) <= (numKeys(eng) % cols)
        ) {
            offset = cols - numKeys(eng) % cols;
            offset = offset * (idxLogoSmall[0] + idxMargin) / 2;
        }

        $("#engines").prepend("<a id='" + e + "_logo' ref='" + e + "'><img src='engines/" + eng[e].logo + "'></a>");

        if (i == cols) {
            i = 0;
            row++;
        };
        eng[e].idxPos = [
            (idxLogoSmall[0] + idxMargin) * i - idxWidth / 2 + offset,
            (idxLogoSmall[1] + idxMargin) * row
		];
        i++;
        j++;
    }
    idxHeight = (row + 1) * (idxLogoSmall[1] + idxMargin) - idxMargin;
    idxHeight = Math.max(idxHeight, idxLogoFull[1]);

    $("#engines a").click(function () {
        build($(this).attr("ref"), true);
    })

    $("#engines a").css({
        "left": "50%",
        "bottom": "0",
        "marginLeft": -idxLogoFull[0] / 2 + "px"
    });

    $("#engines").mouseenter(function () {
        indexOpen();
    });
    $("#engines").mouseleave(function () {
        indexClose();
    });
}

var idxState = false,
    idxClear = undefined;

function indexOpen() {
    idxState = true;
    clearTimeout(idxClear);

    $("#engines").css({
        "height": idxHeight
    });

    for (e in eng) {
        var op = $("#" + e + "_logo").hasClass("active");
        $("#" + e + "_logo").stop().queue("fx", []).animate({
            "marginLeft": eng[e].idxPos[0] + "px",
            "marginBottom": eng[e].idxPos[1] + "px",
            "opacity": (op) ? 1 : idxFadedOpacity,
            "width": idxLogoSmall[0],
            "height": idxLogoSmall[1],
        }, fadeDur);
    }
}

function indexClose() {
    idxState = false;

    $("#engines").css({
        "height": idxLogoFull[1]
    });

    $("#engines a").each(function () {
        var op = $(this).hasClass("active");
        $(this).stop().queue("fx", []).animate({
            "marginLeft": -idxLogoFull[0] / 2 + "px",
            "marginBottom": 0,
            "opacity": (op) ? 1 : 0,
            "width": idxLogoFull[0],
            "height": idxLogoFull[1]
        }, fadeDur);
    });

    // Because jQuery doesn't like me
    idxClear = setTimeout(function () {
        $("#engines a:not(.active)").css("opacity", 0)
    }, fadeDur);
}



/*	GENERATING THE SEARCH ENGINE PAGE
	-----------------------------------------------------  */

function build(e, animate) {
    var methodFade = (animate) ? fadeDur : 0;

    current.engine = e; // Just the engine's ID for reference
    e = eng[e]; // Engine object

    $("#title").html(titlePrefix + e.pageTitle);

    $("#method").stop().queue("fx", []).animate({
        "opacity": 0
    }, methodFade);

    op = (idxState) ? idxFadedOpacity : 0;
    $("#engines a").stop().queue("fx", []).removeClass("active");
    $("#" + current.engine + "_logo").addClass("active").animate({
        "opacity": 1
    }, fadeDur);
    $("#engines a:not(.active)").animate({
        "opacity": op
    }, fadeDur);

    if (typeof e.languages == "object") setLang(firstProp(e.languages));
    else $("#lang").fadeOut(fadeDur);

    closeSugBox(false);

    $("#i").attr("autosave", "com.infinise.go." + current.engine);
    $("#input input").focus();

    setTimeout(function () {
        $("#method").html("");
        for (place in e.places) $("#method").append("<a onclick='setPlace(this)'>" + place + "</a>");

        setPlace("#method a:first");

        $("#method").animate({
            "opacity": 1
        }, fadeDur);
    }, methodFade);
}

function setPlace(place) {
    current.place = $(place).html();

    $("#method a").removeClass("active");
    $(place).addClass("active");
    $("#input input").focus();

    if (eng[current.engine].places[current.place][1] !== false) {
        fetchSuggestions();
        $("#i").attr("autocomplete", "off");
    } else {
        closeSugBox(false);
        $("#i").attr("autocomplete", "on");
    }
}

function setLang(language) {
    current.language = language;

    $("#lang").fadeIn(fadeDur).html(language);
    $("#input input").focus();
}


/*	KEYBOARD SHORTCUTS
	-----------------------------------------------------  */

var isCtrl = false;
var isCmd = false;

$(document).keyup(function (e) {
    if (e.which == 17) isCtrl = false;
    if (e.which == 91) isCmd = false;
}).keydown(function (e) {
    if (e.which == 17) isCtrl = true;
    if (e.which == 91) isCmd = true;

    if (e.which == 49 && isCtrl == true) { /* Key "1" */
        nextEngine();
        return false;
    }
    if (e.which == 50 && isCtrl == true) { /* Key "2" */
        nextPlace();
        return false;
    }
    if (e.which == 51 && isCtrl == true) { /* Key "3" */
        nextLanguage();
        return false;
    }

    if (e.which == 38) { /* Arrow Up */
        prevSugResult();
    }
    if (e.which == 40) { /* Arrow Down */
        nextSugResult();
    }
    if (e.which == 27) { /* ESC */
        closeSugBox(false);
    }
    if (e.which == 13) { /* Enter */
        applySugResult();
    }
});

function nextEngine() {
    build(findNext(eng, current.engine), true);
}

function nextPlace() {
    var nextPlace = findNext(eng[current.engine].places, current.place);
    $("#method a").each(function () {
        if ($(this).html() == nextPlace) setPlace($(this));
    })
}

function nextLanguage() {
    setLang(findNext(eng[current.engine].languages, current.language));
}


/*	SUGGESTIONS
	-----------------------------------------------------  */

function fetchSuggestions(key)  {
    if (key == undefined || (!inArray(key, new Array(13, 16, 20, 27, 37, 38, 39, 40)) && !isCtrl && !isCmd)) {
        if ($("#i").val() != "" && eng[current.engine].places[current.place][1] !== false) {
            current.suggestionsTimestamp = new Date().getTime();

            var url = eng[current.engine].places[current.place][1];
            url = url.replace("%query%", encodeURIComponent($("#i").val()));
            url = url.replace("%time%", current.suggestionsTimestamp);
            if (typeof eng[current.engine].languages == "object")
                url = url.replace("%lang%", eng[current.engine].languages[current.language]);

            $.getJSON(url, function (data) {
                buildSuggestions(data);
            })
        } else closeSugBox(false);
    }
}

function buildSuggestions(list) {
    if (list.empty) {
        if (console) console.log("(1) Suggestions for '" + list.query + "' empty.");
        closeSugBox(false);
    } else if (
        list.engine == current.engine &&
        list.timestamp == current.suggestionsTimestamp &&
        list.query == $("#i").val()
    ) {
        if (console) console.log("(2) Suggestions for '" + list.query + "' accepted.");

        $("#sugs").html("");
        for (sug in list.results) {
            sug = list.results[sug];
            $("#sugs").append("<li><a href='" + sug[1] + "'>" + sug[0] + "</a></li>");
        }

        $("#sugs").css({
            "display": "block"
        });
        $("#sugs li").mousemove(function () {
            $("#sugs .active").removeClass("active");
            $(this).addClass("active");
        }).click(function () {
            applySugResult();
        });
    } else {
        if (console) console.log("(3) Suggestions for '" + list.query + "' discarded.");
    }
}

function prevSugResult() {
    if ($("#sugs").css("display") == "none") return;
    if ($("#sugs .active").length == 0) {
        $("#sugs li:last-child").addClass("active");
    } else {
        $("#sugs .active").removeClass("active").prev().addClass("active");
    }
    backupQuery();
}

function nextSugResult() {
    if ($("#sugs").css("display") == "none") return;
    if ($("#sugs .active").length == 0) {
        $("#sugs li:first-child").addClass("active");
    } else {
        $("#sugs .active").removeClass("active").next().addClass("active");
    }
    backupQuery();
}

var originalQuery = false;

function backupQuery() {
    if ($("#sugs .active").length > 0) {
        if (!originalQuery) originalQuery = $("#i").val();
        $("#i").val($("#sugs .active a").html());
    } else {
        $("#i").val(originalQuery);
        originalQuery = false;
    }
}

function closeSugBox(src) {
    if (src == false || src == undefined || (src.id != "i" && src.id != "sugs"))
        $("#sugs").html("").css({
            "display": "none"
        });
}

function applySugResult() {
    if ($("#sugs .active").length > 0) {
        $("#i").val($("#sugs .active a").html());
        closeSugBox(false);
    }
}
