function processLiveCodingLogElement($e, port){
	console.log($e.text());
	
	var sender = $e.find("a").text().trim();
	var $c = $e.clone();
	$c.find("a").remove();
	$c.find("img").replaceWith(function() { return $.trim(this.alt); });
	var comment = $c.text().trim();
	port.postMessage({"host": window.location.hostname, "sender": sender, "message": message});
}

function processYouTubeLogElement($e, port){
	try{
		var sender = $e.find(".author").text().trim();
		var comment = $e.find(".comment-text").text().trim();
		console.log(sender);
		console.log(comment);
		port.postMessage({"host": window.location.hostname, "sender": sender, "message": message});
	}catch(e){
		console.log(e);
	}
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
	
			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading
			// ----------------------------------------------------------
			
				var currLCSib = false;
				var currYTSib = false;
				var currTWSib = false;
				var port = chrome.runtime.connect()
				setInterval(function() {
					// livecoding.tv
					if(!currLCSib){
						currLCSib = $("ul.message-pane li:first");
						if(currLCSib.length){
							processLiveCodingLogElement(currLCSib, port);
						}else{
							currLCSib = false;
						}
					}else if(currLCSib.next().length){
						currLCSib = currLCSib.next();
						processLiveCodingLogElement(currLCSib, port);
					}

					// youtube
					if(!currYTSib){
						currYTSib = $("ul#all-comments li:first");
						if(currYTSib.length){
							processYouTubeLogElement(currYTSib, port);
						}else{
							currYTSib = false;
						}
					}else if(currYTSib.next().length){
						currYTSib = currYTSib.next();
						processYouTubeLogElement(currYTSib, port);
					}
					
				}, 100);
		}
	}, 10);
});
