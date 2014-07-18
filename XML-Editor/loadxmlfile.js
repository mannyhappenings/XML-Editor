$("#xml-file").onchange = function(){
  readFile(this.files[0], function(result){
    var xmldoc = null;
    console.log(xmldoc = parseXML(result));
    showXMLDocument(xmldoc);
    //console.log(xmldoc.children[0].children);
  }, 'text');
}