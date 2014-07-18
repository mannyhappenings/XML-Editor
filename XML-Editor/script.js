	var $ = function(params){
		return document.querySelector(params);
	}
	function getElement(nodename){
	  return document.createElement(nodename);
	}
	parser = window.parser? parser: (new DOMParser);
	document.querySelector("body").appendChild(parser.parseFromString('<div id="xml-document"></div>', 'text/html').querySelector("body").children[0]);

	$("#xml-file").onchange = function(){
	  	readFile(this.files[0], function(result){
		    var xmldoc = null;
		    try{
		    	xmldoc = parseXML(result);
		    } catch(e){
		    	console.error(e);
		    	$("div#xml-document").innerHTML = '<span style="color: red; padding: 10px 20px;"><b>&#10007;</b> Errornous xml file was provided.</span>';
		    }
		    if(xmldoc)
		    	showXMLDocument(xmldoc);
	/*	 	//    var lis = $("#xml-document").getElementsByTagName('LI')['@@iterator']();
			// var next = null;
			// while(!((next = lis.next()).done)){
			// 	// console.log(next.value);
			// 	if(next.value.querySelector('.nodeName'))
			// 		next.value.querySelector('.nodeName').onclick = handler;
			// 	else (next.value.querySelector('.textContent'))
			// 		next.value.querySelector('.textContent').onclick = handler;
			// 	next.done = true;
			// }

		    //console.log(xmldoc.children[0].children);
		    */
	  	}, 'text');
	}

	function parseXML(XMLString) {
	  	var parser = new DOMParser();
	  	var parsererrorNS = parser.parseFromString('INVALID', 'text/xml').getElementsByTagName("parsererror")[0].namespaceURI;
	    var dom = parser.parseFromString(XMLString, 'text/xml');
	    if(dom.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0) {
	        throw new Error('Error parsing XML');
	        return null;
	    } else {
	  		return dom;
	    }
	}
	function readFile(file_blob, callback, type){
	  	if(!(file_blob instanceof File || file_blob instanceof Blob)) return console.error("Invalid file inputs.");
	  	var typeReplace = {
		    text: "readAsText",
		    arrayBuffer: "readAsArrayBuffer",
		    binaryString: "readAsBinaryString",
		    dataURL: "readAsDataURL",
	  	};
			type = type? type: "text";
			var filereader = new FileReader();
			filereader.onload = function(event){
				callback(event.target.result);
			}
			filereader[typeReplace[type]](file_blob);
	}
	var handler = function(e) {
		if(e)
			e.stopPropagation();
		if(this.firstChild.nodeName=="#text"){
		    var input = getElement("input");
		    input.value = this.firstChild.textContent;
		    this.removeChild(this.firstChild);
		} else {
		    var input = getElement("input");
			input.value = "";
		}
		this.insertBefore(input, this.firstChild);
		input.focus();
		input.onchange = changeHandler;
		input.onblur = changeHandler;
		input.onkeydown = function(e){
			var key = e.keyCode | e.which;
			if(key==13){
				changeHandler.apply(this, e);
			}
		}
		this.onclick = function(e){
			if(e)
				e.stopPropagation();
		}
	}
	var changeHandler = function(e){
		if(e)
			e.stopPropagation();
		this.parentNode.insertBefore(document.createTextNode(this.value), this);
		this.parentNode.onclick = handler;
		this.parentNode.removeChild(this);
	};
	function insertNode(parent, nodeName, content){
		var ul = getElement('ul');
		var li = getElement('li');
		var span = getElement('span');
		span.classList.add('nodeName');
	    parent.appendChild(ul);
	    ul.appendChild(li);
	    li.appendChild(span);
		if(nodeName)
	    	span.innerHTML = child.nodeName;
	    else {
	    	var input = getElement("input");
		    input.value = "";
		    span.appendChild(input);
	    	input.focus();
		    input.onchange = changeHandler;
		    input.onblur = changeHandler;
	    }

	}
/***********  ContextMenu definition ***********************/
	function ContextMenu(menu){
		this.contextMenu = getElement("ul");
		console.log(this.contextMenu);
		this.contextMenu.classList.add("contextMenu");
		console.log(menu);
		var context = this;
		var $contextMenu = this.contextMenu;
		$contextMenu.onclick = function(e){
			e.stopPropagation();
			context.hide();
		}
		menu.forEach(function(menuItem) {
			var li = getElement("li");
			li.innerHTML = menuItem.text;
			li.onclick = menuItem.clickHandler;
			$contextMenu.appendChild(li);
		});
		return this;
	}
	ContextMenu.prototype = {
	  visible: false,
	  contextElement: null,
	  show: function(el){
	    el.appendChild(this.contextMenu);
	    this.contextElement = el;
	    this.visible = true;
	  },
	  hide: function(){
	  	try {
		    this.contextMenu.parentNode.removeChild(this.contextMenu);
		    this.visible = false;
	  	} catch(e){
	  		console.error(e);
	  		console.trace(e);
	  	}
	  }
	}
	window.context = new ContextMenu(
		[{
		    text: "Edit", 
		    clickHandler: function(e){
		        handler.apply(this.parentNode.parentNode, e);
		    }
		}, {
		    text: "delete", 
		    clickHandler: function(e){
		        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
		    }
		}, {
		    text: "Insert a new Node",
		    clickHandler: function(e){
		        insertNode(this.parentNode.parentNode.parentNode);
		    }
		}]
	);
	window.addEventListener('click', function(){ 
		if(context.visible)context.hide();
	});
/******* showXMLDoc *************/
	function showChildren(child, parent){
	  if(!child.children.length){
	    var li = getElement('li');
	    li.innerHTML = '<span class="nodeName">'+child.nodeName+'</span>';
	    parent.appendChild(li);
	    if(child.textContent){
	      // console.log(child.textContent);
	      var ul = getElement('ul');
	      li.appendChild(ul);
	      var li = getElement('li');
	      li.innerHTML = '<span class="textContent">'+child.textContent.replace(RegExp(" |\n", 'g'), function(str){ return (str==" ")? "&nbsp;":((str=="\n")? "<br />": str);})+'</span>';
	      ul.appendChild(li);
	    }
	  } else {
	    var children = child.children;
	    var ul = getElement('ul');
	    var li = getElement('li');
	    li.innerHTML = '<span class="nodeName">'+child.nodeName+'</span>';
	    parent.appendChild(li);
	    li.appendChild(ul)
	    var length = (children.length)?children.length: 5;
	    for(var i=0; i<length; i++) {
	      showChildren(children[i], ul);
	    }
	  }
	}

	function showChildrenOneLevel(child, parent){
		console.log(child, parent);
	  if(!child.children.length){
	    var li = getElement('li');
	    li.innerHTML = '<span class="nodeName">'+child.nodeName+'</span>';
	    parent.appendChild(li);
	    if(child.textContent){
	      var ul = getElement('ul');
	      li = getElement('li');
	      li.innerHTML = li.innerHTML = '<span class="textContent">'+child.textContent.replace(RegExp(" |\n", 'g'), function(str){ return (str==" ")? "&nbsp;":((str=="\n")? "<br />": str);})+'</span>';
	      ul.appendChild(li);
	      parent.appendChild(ul);
	    }
	  } else {
	    var children = child.children;
	    var ul = getElement('ul');
	    var li = getElement('li');
	    li.innerHTML = '<span class="nodeName">'+child.nodeName+'</span>';
	    parent.appendChild(li);
	    parent.appendChild(ul)
	    var length = children.length;
	    for(var i=0; i<length; i++) {
	      li = getElement('li');
	      li.innerHTML = '<span class="nodeName">'+children[i].nodeName+'</span>';
	      ul.appendChild(li);
	    }
	  }
	}


	function showXMLDocument(xmldoc){
		console.log(xmldoc);
		window.xmldoc = xmldoc;
		var $ = function(text){
			return document.querySelector(text);
		}
		// Set the root node
		if(xmldoc.nodeName=='#document')
			var root = xmldoc.children[0];
		else
			root = xmldoc;
		var span = getElement('span');
		span.innerHTML = root.nodeName;
		$("#xml-document").innerHTML = "";
		//$("#xml-document").appendChild(span);
		var ul = getElement('UL')
		$("#xml-document").appendChild(ul);
		showChildrenOneLevel(root, ul);
		var iterator = $("#xml-document").getElementsByClassName('nodeName')['@@iterator']();
		var temp = null;
		while(!(temp=iterator.next()).done) {
			(function(){
				var span = temp.value;
				temp.value.oncontextmenu = function(e){
	  				e.preventDefault();
		  			console.log("context menu on '"+span.innerHTML+"'");
				  	context.show(span);
				}
				temp.value.ondblclick = handler;
			})();
			temp.done = true;
		}
	}