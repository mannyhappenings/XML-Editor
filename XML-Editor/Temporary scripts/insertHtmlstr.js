parser = window.parser? parser: (new DOMParser);
document.querySelector("body").appendChild(parser.parseFromString('<div id="xml-document"></div>', 'text/html').querySelector("body").children[0]);