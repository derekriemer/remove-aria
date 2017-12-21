const MESSAGE_TYPES = {
	"All": 0,
	"Condition": 1
}
var ACK = 1;

class Message {
	constructor(arg){
		this.contents = arg;
	}
	send(close){
		let contents = this.contents;
		browser.tabs.query({active: true, currentWindow: true})
		.then(function(tabs){
			return browser.tabs.sendMessage(tabs[0].id,
				contents);
		})
		.then((res) =>{
			if(res.type == ACK && close){
				alert(`Number of elements removed: ${res.elementsProcessed}`);
				window.close();
			}
		})
		.catch((e)=>{
			throw e;
			if(close)
				reportExecuteScriptError();
		});
	}
}

function onReady(){
	console.log("asoijoiasfdj");
	document.getElementById("doc-title").focus();
}

function nukeAria(){
	let message = new Message({
		type: MESSAGE_TYPES.All
	});
	message.send(true);
}

function reportExecuteScriptError(e){
	alert(e);
	alert("Sorry, something went wrong. Bye.");
	window.close();
}
browser.tabs.executeScript({
	file: "/content/inject.js",
	allFrames: true
	})
	.catch(reportExecuteScriptError);
document.getElementById("nuke").addEventListener("click", nukeAria);
document.body.addEventListener("load", onReady);