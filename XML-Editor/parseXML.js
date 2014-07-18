function parseXML(XMLString) {
  var parser = new DOMParser();
  return parser.parseFromString(XMLString, 'text/xml');
}