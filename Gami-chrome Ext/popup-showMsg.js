// We retrieve the tweets array from the background page.
	var msg = chrome.extension.getBackgroundPage().lastMsg;
		document.write('<div class="msg">');
			document.write('<div class="content">');
					document.write('<div class="text">');
						document.write(msg.msg);
					document.write('</div>');
				document.write('</div>');
		document.write('<div style="clear:left;"></div></div>');