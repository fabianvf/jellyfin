define(function() {
    "use strict";

    function isLoaded(url) {
        return -1 !== importedCss.indexOf(url)
    }

    function removeFromLoadHistory(url) {
        url = url.toLowerCase(), importedCss = importedCss.filter(function(c) {
            return -1 === url.indexOf(c.toLowerCase())
        })
    }
    var requireCss = {};
    requireCss.normalize = function(name, normalize) {
        return ".css" === name.substr(name.length - 4, 4) && (name = name.substr(0, name.length - 4)), normalize(name)
    };
    var importedCss = [];
    return requireCss.load = function(cssId, req, load, config) {
        var srch = "/emby-webcomponents/require/requirecss",
            index = cssId.indexOf(srch); - 1 !== index && (cssId = "css" + cssId.substring(index + srch.length));
        var url = cssId + ".css";
        if (-1 === url.indexOf("://") && (url = config.baseUrl + url), isLoaded(url)) load();
        else {
            importedCss.push(url);
            var link = document.createElement("link");
            link.setAttribute("rel", "stylesheet"), link.setAttribute("type", "text/css"), link.onload = load;
            var linkUrl = url;
            config.urlArgs && (linkUrl += config.urlArgs(cssId, url)), link.setAttribute("href", linkUrl), document.head.appendChild(link)
        }
    }, window.requireCss = {
        removeStylesheet: function(stylesheet) {
            stylesheet.parentNode.removeChild(stylesheet), removeFromLoadHistory(stylesheet.href)
        }
    }, requireCss
});