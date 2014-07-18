var handler = function(e) {
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
  this.onclick = function(e){
    e.stopPropagation();
  }
}
var changeHandler = function(e){
  e.stopPropagation();
  this.parentNode.insertBefore(document.createTextNode(this.value), this);
  this.parentNode.onclick = handler;
  this.parentNode.removeChild(this);
};
var lis = $("#xml-document").getElementsByTagName('LI')['@@iterator']();
var next = null;
while(!((next = lis.next()).done)){
  next.value.querySelector('.nodeName').onclick = handler;
  next.done = true;
}