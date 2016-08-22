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
var onlineFriends = document.getElementsbyClassName("_55lr");
//we need to check if the friend is actually online. if the element "_568" is blank, they are online
var friendStatus = document.getElementsbyClassName("_568-");
var numOnline = friendStatus.length;
for(i = 0; i < friendStatus.length; i++){
	if(friendStatus[i]){ //if empty
		numOnline--;
	}
}

