function readHTML (url, callback) {
  // Your code here
	var http = require("http");

	var requestOptions = {
  host: url,
  path: "/"
	};

	var text = "";

	http.get(requestOptions, function(response) {

		response.setEncoding("utf8");

		response.on("data", function(data) {  
	  text += data;  // text = text + data;

		console.log("Read Email.");

		console.log(text)
		});


		response.on("end", function() { 
		
 		});


		callback(text);

	})

}

function printHTML (htmlData) {
  // Your code here
  console.log(htmlData)

}


//call read html with a url

readHTML("www.example.com", printHTML);
