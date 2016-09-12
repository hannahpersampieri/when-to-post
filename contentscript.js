//getting access
var successURL = 'https://www.facebook.com/connect/login_success.html';
function onFacebookLogin() {
                if (!localStorage.accessToken) {
                    chrome.tabs.getAllInWindow(null, function(tabs) {
                        for (var i = 0; i < tabs.length; i++) {
                            if (tabs[i].url.indexOf(successURL) == 0) {
                                var params = tabs[i].url.split('#')[1];
				access = params.split('&')[0]
                                console.log(access);
                                localStorage.accessToken = access;
                                chrome.tabs.onUpdated.removeListener(onFacebookLogin);
                                return;
                            }
                        }
                    });
                }
            }
            chrome.tabs.onUpdated.addListener(onFacebookLogin);
// scraping chat data...
var max = 0;
while(true){
	var onlineFriends = document.getElementsbyClassName("_55lr");
	//we need to check if the friend is actually online. if the element "_568" is blank, they are online
	var friendStatus = document.getElementsbyClassName("_568-");
	var numOnline = friendStatus.length;
	for(i = 0; i < friendStatus.length; i++){
		if(friendStatus[i] !== ""){ //if not empty
			numOnline--;
		}
	}
	//comparing to the max: not quite sure how to do this properly for a script running over a period of time
	if(numOnline > max){
		max = numOnline
		var x = new Date();
		hourToPost = x.getHours();
		minToPost = x.getMinutes();
		console.log(hourToPost, ":", minToPost);
	}
} //maybe set a timeout
