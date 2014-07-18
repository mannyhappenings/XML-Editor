function showChildren(child, parent){
  if(!child.children.length){
    var li = getElement('li');
    li.innerHTML = '<span class="nodeName">'+child.nodeName+'</span>';
    parent.appendChild(li);
    if(child.textContent){
      console.log(child.textContent);
      var ul = getElement('ul');
      li.appendChild(ul);
      var li = getElement('li');
      li.innerHTML = child.textContent.replace(RegExp(" |\n", 'g'), function(str){ return (str==" ")? "&nbsp;":((str=="\n")? "<br />": str);});
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
  if(!child.children.length){
    var li = getElement('li');
    li.innerHTML = child.nodeName;
    parent.appendChild(li);
    if(child.textContent){
      var ul = getElement('ul');
      li = getElement('li');
      li.innerHTML = child.textContent;
      ul.appendChild(li);
      parent.appendChild(ul);
    }
  } else {
    var children = child.children;
    var ul = getElement('ul');
    var li = getElement('li');
    li.innerHTML = child.nodeName;
    parent.appendChild(li);
    parent.appendChild(ul)
    var length = children.length;
    for(var i=0; i<length; i++) {
      var li = getElement('li');
      li.innerHTML = child.nodeName;
      parent.appendChild(li);
    }
  }
}


function showXMLDocument(xmldoc){
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
  showChildren(root, ul);
}