// Server configuration
var SERVER_HOST = 'localhost';
var SERVER_PORT = 3700;

// Socket.IO client creation and connection with Node server.
var socket = io.connect('http://localhost:3700');

var lastMsg;
//socket.connect();
// Listening to the 'message' event, it will be fired
// each time our Node server send us a new tweet.
socket.on('message', function(data){
data = JSON.parse(data);
	if(data.msg) {
           lastMsg = data;
        } 
        else {
            console.log("There is a problem:", data);
        }

	// Display the notification if the user allow it or update
	// the counter to alert the user.
	if(window.localStorage.noticationEnable == 'true')
	{
		if (!("Notification" in window)) 
		{
		    console.log("This browser does not support desktop notification");
	  	}

		  // Let's check if the user is okay to get some notification
	  	else if (Notification.permission === "granted") 
		  {
		    // If it's okay let's create a notification
		    var notification = new Notification(lastMsg.msg);
	        //setTimeout(function(){ notification.cancel(); tweet = null; }, NOTIFICATION_DISPLAY_TIME);
		  }

		  // Otherwise, we need to ask the user for permission
		  // Note, Chrome does not implement the permission static property
		  // So we have to check for NOT 'denied' instead of 'default'
	  	else if (Notification.permission !== 'denied')
	  	{
		    Notification.requestPermission(function (permission) 
		    {

		      // Whatever the user answers, we make sure we store the information
		      if(!('permission' in Notification)) 
		      {
		        Notification.permission = permission;
		      }

		      // If the user is okay, let's create a notification
		      if (permission === "granted") 
		      {
		        var notification = new Notification(lastMsg.msg);
		        //setTimeout(function(){ notification.cancel(); tweet = null; }, NOTIFICATION_DISPLAY_TIME);
	    	  }
		    });
  	
		}
	}
	else
	{
        // Set the text layered on the icon
		//chrome.browserAction.setBadgeText({ msg : ""});
	}
});

// Reset the badge counter when a user click on the browser action icon.
function resetBadgeText(){
	chrome.browserAction.setBadgeText({ msg : ""});
}