var once = function(){
	const ACK = 1;
	const MESSAGE_TYPES = {
		All: 0,
		Condition: 1
	}

	function removeAria(message, sender, sendResponse){
		var keep = true;
		var num=0;
		while(keep){
			var docTree = document.createTreeWalker(
				document.body,
				NodeFilter.SHOW_ELEMENT,
			);
			var currentNode;
			let oldNum = num;
			while(currentNode = docTree.nextNode()){
				if(message.type == MESSAGE_TYPES.Condition){
					console.log("not supported yet!");
				}
				else if(message.type == MESSAGE_TYPES.All){
					for(let attr of currentNode.attributes){
						let normalizedAttr = attr.name.toLowerCase();
						if(normalizedAttr.startsWith("aria-") || normalizedAttr === "role"){
							console.log(normalizedAttr);
							currentNode.removeAttribute(normalizedAttr);
							num++;
						}
					}
				}
			}
			if(num === oldNum)
				keep = false;
		}
		return Promise.resolve({
			type: ACK,
			elementsProcessed: num
		});
	}
	browser.runtime.onMessage.addListener(removeAria);
}
//It is possible our code gets injected into the page again. Prevent double handlers or anything else double.
if(!window.inject_6b6af850f80944a38c02db1db5d2eb73){
	once();
	window.inject_6b6af850f80944a38c02db1db5d2eb73 = true;
}