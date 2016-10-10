var request = require("request");

function readHTML (url, callback) {
  request("http://www.example.com", function(err, response, body) {
  if (err) {
    throw err;
  }
		callback(body);
  });
}

function printHTML (htmlData) {
	//callback function
  console.log(htmlData)
}

//call read html with a url

readHTML("www.example.com", printHTML);
