// Checking the box according to the localStorage.
if(window.localStorage){
	if(window.localStorage.noticationEnable == 'true'){
		window.document.getElementById('chkbox').checked = false;;
	}else{
		window.document.getElementById('chkbox').checked = true;
	}
}

window.document.getElementById('chkbox').setAttribute("onchange", switchNotification(this));

// Change notification display preference.
// User preference is stored in localStorage.
function switchNotification(checkbox){
	if(window.localStorage){
		if(checkbox.checked){
			window.localStorage.noticationEnable = 'false';

		}else{
			window.localStorage.noticationEnable = 'true';
			chrome.extension.getBackgroundPage().resetBadgeText();
		}
	}
}