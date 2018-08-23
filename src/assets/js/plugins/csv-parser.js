//basic csv parser
//handles multi-comma fields, removes quotes around those fields, strips leading and trailing spaces 
//optionally set json to true to return json, else false or empty to return object
klrn.parseCSV = function(csv, json) {
  var lines = csv.split(('\r\n' || '\r' || '\n'));
  var result = [];
  var headers = lines[0].split(',');
  var obj = {};
  var currentline;
  var quotes;
  var badBreaks = [];
  var fromToLength;
  var buildString = '';

  var leadingSpace = /^\s+/;
  var trailingSpace = /\s+$/;
  var doubleSmartQuote = /[\u201C\u201D]/g;
  var singleSmartQuote = /[\u2018\u2019]/g;
  var emDash = /[\u2013\u2014]/g;
  var ellipsesRegEx = /[\u2026]/g;

  for (var i = 1; i < lines.length - 1; i++) {
    obj = {};
    currentline = lines[i].split(',');

    for (var j = currentline.length - 1; j > -1; j--) {

      //find all unescaped quotes on each line
      quotes = currentline[j].match(/"/g);

      //if there are an odd number of quotes, push line index into badBreaks
      if ((quotes ? quotes.length : 0) % 2 == 1) badBreaks.push(j);

      //trim escaping quotes for quotes, added around quotes as well as line
      if (currentline[j].slice(0,1) === '"' && currentline[j].slice(-1) === '"'
          && (currentline[j].slice(0,2) !== '""' || currentline[j].slice(-2) !== '""')) {
        currentline[j] = currentline[j].slice(1,-1);
      }
      if (currentline[j].match(/""/)) {
        currentline[j] = currentline[j].replace(/""/g, '"');
      }
    }

    //starting at bottom, merge currentline back, skipping over every other badBreaks index
    for (var j = 0, length = badBreaks.length; j < length; j = j + 2) {

      //get index pairs with starting and end quotes, and everything inbetween, and merge all into string
      fromToLength = (badBreaks[j] - badBreaks[j + 1]);
      for (var k = fromToLength; k > -1; k--) {
        buildString += currentline[badBreaks[j] - k] + ',';
      }

      //now splice each set of merged indexes, each as one index, back into whole array  
      currentline.splice(badBreaks[j] - fromToLength, fromToLength + 1, buildString.slice(1, -2));
      buildString = '';
    }
    badBreaks = [];

    //line up headers with each data row
    //and trim leading and trailing white spaces, and replace smart quotes, emdashes and ellipses 
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j].replace(leadingSpace, '').replace(trailingSpace, '')] =
      currentline[j].replace(leadingSpace, '').replace(trailingSpace, '')
              .replace(doubleSmartQuote, '"').replace(singleSmartQuote, "'")
              .replace(emDash, '-').replace(ellipsesRegEx, '...');
    }
    result.push(obj);
  }

  //return result
  return json ? JSON.stringify(result) : result;
}