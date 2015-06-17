// create TCP server
chrome.sockets.tcpSever.create({}, function(info){
	chrome.sockets.tcpSever.listen(info.socketId, '127.0.0.1', 54545, function(result) {
		console.log(result);
	});
});

// create a variable to hold onto the socket id number
var socket_id;

// connect socket to TCP server
chrome.sockets.tcp.create({}, function(createInfo){
	chrome.sockets.tcp.connect(creatInfo.socketId, '127.0.0.1', 54545,

// on Message, send message through socket to TCP server
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
	    if( request.host && request.sender && request.message){
		    // need to transform data to arrayBuffer
		  data: { "host" : request.host,
			  "sender" : request.sender,
			  "message" : request.message
		  },
		  // send data call here
		    	chrome.sockets.tcp.send(socket_id, arrayBuffer, onSentCallback)
);
