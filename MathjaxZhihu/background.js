
// this file aim to change the Content-Security-Policy in HTTP header,
// which inject Mathjax's url to allow running.

var bkg = chrome.extension.getBackgroundPage();
bkg.console.log("I'm in");

chrome.webRequest.onHeadersReceived.addListener(function (details)
{
	var toTrim = "'unsafe-eval'";
	var toAdd = " cdn.mathjax.org ";

	for (i = 0; i < details.responseHeaders.length; i++) {
		if (details.responseHeaders[i].name == "Content-Security-Policy") {
			// change CSP
      var originalCSP = String(details.responseHeaders[i].value).trim();
			var cspArray = originalCSP.split(";");
			cspArray = cspArray.map(function(string){
				var cspPart = string.trim();
				if (cspPart.endsWith(toTrim)) {
					cspPart = cspPart.substring(0,cspPart.length-toTrim.length);
					cspPart = cspPart + toAdd + toTrim;
				}
				return cspPart
			})

			var newCSP = cspArray.join(";")
			details.responseHeaders[i].value = newCSP;
		}
	}
	return {
		responseHeaders : details.responseHeaders
	};
}, {
	urls : ["*://*.zhihu.com/*"]
	// ,types : ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
},
	["blocking", "responseHeaders"]
);
