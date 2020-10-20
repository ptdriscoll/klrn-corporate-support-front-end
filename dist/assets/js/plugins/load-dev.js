//global function to load scripts while in development mode
(function() {
	window.require = function (src) {
		var currentScript = document.currentScript;
		var newScript = document.createElement('script');
		
		newScript.src = '/assets/js' + src.slice(1) + '.js';
		newScript.async = false;
		currentScript.parentNode.insertBefore(newScript, currentScript); 
	}
}()); 

// Works with elements that have klrn-include-html property.
// Pulls in html file using klrn-include-html value as file path.
// An example element: <div klrn-include-html="header.htm"></div>
// Adapted from https://www.w3schools.com/howto/howto_html_include.asp
(function() {
	//use only in npm environment
	if (location.port !== '8080' && location.port !== '8088') return;
	
    var elems, elem, i, file, xhttp;
    var fragment = document.createDocumentFragment();

    // loop through collection of klrn-include-htm elements
    elems = document.querySelectorAll('[klrn-include-html]');
    for (i = 0; i < elems.length; i++) {
        elem = elems[i];
        file = elem.getAttribute("klrn-include-html");

        // make http request using attribute value as file name
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elem.innerHTML = this.responseText;
                        while (elem.firstChild) {
                            fragment.appendChild(elem.firstChild);
                        }
                        elem.parentNode.replaceChild(fragment, elem);
                    } else if (this.status == 404) {
                        elem.innerHTML = "HTML file not found.";
                    }
                }
            }

            xhttp.open("GET", file, false);
            xhttp.send();
        }
    }
}());